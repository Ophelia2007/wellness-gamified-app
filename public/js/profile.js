// ============================================
// PROFILE MANAGEMENT FUNCTIONS
// ============================================

let selectedAvatarEmoji = '👤'; // Default avatar

// ============================================
// LOAD USER PROFILE
// ============================================

async function loadUserProfile() {
    const user = getUser();
    if (!user) return;
    
    try {
        const response = await fetch(`${API_URL}/users/${user.user_id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        
        if (!response.ok) {
            console.error('Failed to load user profile');
            return;
        }
        
        const userData = await response.json();
        
        // Update profile display
        const profileUsername = document.getElementById('profileUsername');
        const profileEmail = document.getElementById('profileEmail');
        
        if (profileUsername) profileUsername.textContent = userData.username;
        if (profileEmail) profileEmail.textContent = userData.email;
        
        // Load avatar from localStorage or use default
        const savedAvatar = localStorage.getItem('userAvatar') || '👤';
        const avatarElement = document.querySelector('.avatar-emoji');
        if (avatarElement) avatarElement.textContent = savedAvatar;
        selectedAvatarEmoji = savedAvatar;
        
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

// ============================================
// AVATAR SELECTION
// ============================================

function selectAvatar(emoji) {
    selectedAvatarEmoji = emoji;
    
    // Remove selected class from all options
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`[data-avatar="${emoji}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Update hidden input
    const selectedInput = document.getElementById('selectedAvatar');
    if (selectedInput) selectedInput.value = emoji;
}

// ============================================
// OPEN/CLOSE EDIT PROFILE MODAL
// ============================================

async function openEditProfileModal() {
    const user = getUser();
    if (!user) {
        showToast('Please log in to edit your profile', 'error');
        return;
    }
    
    try {
        // Load current user data
        const response = await fetch(`${API_URL}/users/${user.user_id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to load profile');
        
        const userData = await response.json();
        
        // Populate form
        document.getElementById('editUsername').value = userData.username;
        document.getElementById('editEmail').value = userData.email;
        
        // Set current avatar as selected
        const currentAvatar = localStorage.getItem('userAvatar') || '👤';
        selectedAvatarEmoji = currentAvatar;
        document.getElementById('selectedAvatar').value = currentAvatar;
        
        // Highlight current avatar
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        const currentOption = document.querySelector(`[data-avatar="${currentAvatar}"]`);
        if (currentOption) {
            currentOption.classList.add('selected');
        }
        
        // Show modal
        document.getElementById('editProfileModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading profile:', error);
        showToast('Failed to load profile data', 'error');
    }
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.style.display = 'none';
    
    const form = document.getElementById('editProfileForm');
    if (form) form.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editProfileModal');
    if (event.target === modal) {
        closeEditProfileModal();
    }
}

// ============================================
// SUBMIT PROFILE EDIT WITH ERROR HANDLING
// ============================================

async function submitEditProfile(event) {
    event.preventDefault();
    
    const user = getUser();
    const token = getToken();
    
    if (!user || !token) {
        showToast('❌ Please log in to update your profile', 'error');
        return;
    }
    
    const newUsername = document.getElementById('editUsername').value.trim();
    const newAvatar = selectedAvatarEmoji;
    const currentUsername = user.username;
    
    // Validation
    if (!newUsername) {
        showToast('❌ Username cannot be empty', 'error');
        return;
    }
    
    if (newUsername.length < 3) {
        showToast('❌ Username must be at least 3 characters', 'error');
        return;
    }
    
    if (newUsername.length > 50) {
        showToast('❌ Username must be less than 50 characters', 'error');
        return;
    }
    
    // Check if anything changed
    const avatarChanged = newAvatar !== (localStorage.getItem('userAvatar') || '👤');
    const usernameChanged = newUsername !== currentUsername;
    
    if (!usernameChanged && !avatarChanged) {
        showToast('ℹ️ No changes made', 'info');
        closeEditProfileModal();
        return;
    }
    
    try {
        console.log('Updating profile:', {
            username: newUsername,
            avatar: newAvatar,
            user_id: user.user_id
        });
        
        // Disable submit button to prevent double submission
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '💾 Saving...';
        
        // Add timeout to prevent hanging
        const timeoutId = setTimeout(() => {
            console.error('Request timeout');
            showToast('❌ Request timeout. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 10000); // 10 second timeout
        
        const response = await fetch(`${API_URL}/users/${user.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: newUsername,
                points: user.points // Keep existing points
            })
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        // Check if response has content
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.log('Non-JSON response:', text);
            data = { message: text };
        }
        
        console.log('Update profile response:', data);
        
        if (response.ok) {
            // Success! Clear timeout
            clearTimeout(timeoutId);
            
            // Update localStorage with new username
            const updatedUser = {
                ...user,
                username: newUsername
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Save avatar to localStorage
            localStorage.setItem('userAvatar', newAvatar);
            
            // Update UI elements
            const usernameElements = [
                document.getElementById('username'),        // Dashboard header
                document.getElementById('profileUsername')  // Profile card
            ];
            
            usernameElements.forEach(el => {
                if (el) el.textContent = newUsername;
            });
            
            // Update avatar
            const avatarElement = document.querySelector('.avatar-emoji');
            if (avatarElement) avatarElement.textContent = newAvatar;
            
            // Show success message based on what changed
            let successMessage = '';
            if (usernameChanged && avatarChanged) {
                successMessage = 'Profile updated successfully! Username and avatar changed.';
            } else if (usernameChanged) {
                successMessage = 'Username updated successfully!';
            } else if (avatarChanged) {
                successMessage = 'Avatar updated successfully!';
            }
            
            showToast(successMessage, 'success');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            closeEditProfileModal();
            
        } else {
            // Clear timeout
            clearTimeout(timeoutId);
            // Handle different error types
            const errorMessage = data.message || 'Failed to update profile';
            
            if (response.status === 409) {
                // Conflict - Username already exists
                showToast('Username already exists. Please choose a different one.', 'error');
            } else if (response.status === 400) {
                // Bad request - usually validation error
                if (errorMessage.toLowerCase().includes('username') && 
                    errorMessage.toLowerCase().includes('taken')) {
                    showToast(' Username already exists. Please choose a different one.', 'error');
                } else if (errorMessage.toLowerCase().includes('duplicate')) {
                    showToast(' Username already exists. Please choose a different one.', 'error');
                } else {
                    showToast(`❌ ${errorMessage}`, 'error');
                }
            } else if (response.status === 401 || response.status === 403) {
                // Unauthorized
                showToast('❌ Session expired. Please log in again.', 'error');
                setTimeout(() => {
                    logout();
                }, 2000);
            } else if (response.status === 404) {
                // User not found
                showToast('❌ User not found. Please log in again.', 'error');
                setTimeout(() => {
                    logout();
                }, 2000);
            } else {
                // Generic error
                showToast(`❌ ${errorMessage}`, 'error');
            }
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        
        // Clear timeout if it exists
        if (typeof timeoutId !== 'undefined') {
            clearTimeout(timeoutId);
        }
        
        // Network or other error
        if (error.message.includes('fetch')) {
            showToast('❌ Network error. Please check your connection.', 'error');
        } else {
            showToast('❌ An error occurred. Please try again.', 'error');
        }
        
        // Re-enable button
        const submitBtn = event.target.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '💾 Save Changes';
        }
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

// Auto-load profile when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadUserProfile();
    });
} else {
    loadUserProfile();
}