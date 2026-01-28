// ============================================
// CHALLENGES MANAGEMENT FUNCTIONS
// ============================================

const user = getUser();
const token = getToken();

// Load all challenges
async function loadChallenges() {
    const container = document.getElementById('challengesList');
    
    try {
        console.log('Loading challenges from:', `${API_URL}/challenges`);
        
        const response = await fetch(`${API_URL}/challenges`);
        
        console.log('Challenges response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Challenges error response:', errorText);
            throw new Error(`Failed to load challenges: ${response.status} - ${errorText}`);
        }
        
        const challenges = await response.json();
        console.log('Challenges loaded successfully:', challenges);
        displayChallenges(challenges);
    } catch (error) {
        console.error('Error loading challenges:', error);
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: var(--dusty-rose); margin-bottom: 15px;">Error Loading Challenges</h3>
                <p style="color: var(--charcoal); margin-bottom: 20px; line-height: 1.6;">
                    ${error.message}
                </p>
                <button class="btn btn-primary" onclick="loadChallenges()">
                    🔄 Try Again
                </button>
                <div style="margin-top: 20px; padding: 15px; background: var(--soft-cream); border-radius: 12px;">
                    <p style="color: var(--charcoal); font-size: 14px; margin-bottom: 10px;">
                        <strong>Troubleshooting Tips:</strong>
                    </p>
                    <ul style="text-align: left; color: var(--charcoal); font-size: 13px; line-height: 1.8;">
                        <li>Make sure backend server is running on port 3000</li>
                        <li>Check browser console (F12) for detailed error</li>
                        <li>Verify CORS is enabled on backend</li>
                        <li>Try refreshing the page</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Display challenges
function displayChallenges(challenges) {
    const container = document.getElementById('challengesList');
    
    if (!Array.isArray(challenges) || challenges.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 60px; margin-bottom: 20px;">🎯</div>
                <h3 style="color: var(--charcoal);">No challenges available yet!</h3>
                <p style="color: var(--light-sage); margin: 10px 0;">Create the first challenge to get started!</p>
                <button class="btn btn-success" onclick="showCreateForm()" style="margin-top: 20px;">
                    + Create First Challenge
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = '<div class="challenge-list"></div>';
    const list = container.querySelector('.challenge-list');

    challenges.forEach(challenge => {
        const challengeCard = createChallengeCard(challenge);
        list.appendChild(challengeCard);
    });
}

// Create challenge card element
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-item';
    
    const isCreator = user && challenge.creator_id === user.user_id;
    
    card.innerHTML = `
        <div class="challenge-info">
            <div class="challenge-description">${challenge.description}</div>
            <div class="challenge-points">🌟 ${challenge.points} points</div>
            ${isCreator ? '<span style="font-size: 12px; color: var(--sage-green);">✓ Created by you</span>' : ''}
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-success btn-sm" onclick="completeChallenge(${challenge.challenge_id}, '${challenge.description.replace(/'/g, "\\'")}')">
                ✓ Complete
            </button>
            ${isCreator ? `
                <button class="btn btn-warning btn-sm" onclick="editChallenge(${challenge.challenge_id})">
                    ✏️ Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteChallenge(${challenge.challenge_id})">
                    🗑️ Delete
                </button>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Show create challenge form
function showCreateForm() {
    document.getElementById('createForm').classList.remove('hidden');
}

// Hide create challenge form
function hideCreateForm() {
    document.getElementById('createForm').classList.add('hidden');
    document.getElementById('description').value = '';
    document.getElementById('points').value = '';
}

// Create new challenge
async function createChallenge() {
    const description = document.getElementById('description').value.trim();
    const points = parseInt(document.getElementById('points').value);
    
    if (!description || !points || points < 1) {
        showToast('Please provide a valid description and points (minimum 1)', 'error');
        return;
    }

    try {
        console.log('Creating challenge:', { description, points, user_id: user.user_id });
        
        const response = await fetch(`${API_URL}/challenges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description,
                user_id: user.user_id,
                points
            })
        });

        const data = await response.json();
        console.log('Create challenge response:', data);

        if (response.ok) {
            showToast('Challenge created successfully!', 'success');
            hideCreateForm();
            loadChallenges(); // Reload challenges
        } else {
            showToast(data.message || 'Failed to create challenge', 'error');
        }
    } catch (error) {
        console.error('Error creating challenge:', error);
        showToast(`An error occurred: ${error.message}`, 'error');
    }
}

// Complete a challenge
async function completeChallenge(challengeId, description) {
    const details = prompt(`You're completing: "${description}"\n\nShare your experience (optional):`);
    
    if (details === null) return; // User clicked cancel
    
    try {
        console.log('Completing challenge:', { challengeId, user_id: user.user_id, details });
        
        const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: user.user_id,
                details: details || 'Challenge completed!'
            })
        });

        const data = await response.json();
        console.log('Complete challenge response:', data);

        if (response.ok) {
            showToast(`Challenge completed! You earned ${data.points || 0} points!`, 'success');
            
            // Reload page after a short delay to show the toast
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            showToast(data.message || 'Failed to complete challenge', 'error');
        }
    } catch (error) {
        console.error('Error completing challenge:', error);
        showToast(`An error occurred: ${error.message}`, 'error');
    }
}

// Delete a challenge
async function deleteChallenge(challengeId) {
    if (!confirm('Are you sure you want to delete this challenge? This cannot be undone!')) {
        return;
    }

    try {
        console.log('Deleting challenge:', challengeId);
        
        const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Delete challenge response status:', response.status);

        if (response.status === 204 || response.ok) {
            showToast('🗑️ Challenge deleted successfully!', 'success');
            loadChallenges(); // Reload challenges
        } else {
            const data = await response.json();
            showToast(data.message || 'Failed to delete challenge', 'error');
        }
    } catch (error) {
        console.error('Error deleting challenge:', error);
        showToast(`An error occurred: ${error.message}`, 'error');
    }
}

// ============================================
// EDIT CHALLENGE FUNCTION
// ============================================

async function editChallenge(challengeId) {
    // Get current challenge data
    const currentChallenge = await getChallengeById(challengeId);
    
    if (!currentChallenge) {
        showToast('Challenge not found', 'error');
        return;
    }
    
    // Prompt user for new values
    const newDescription = prompt('Edit description:', currentChallenge.description);
    if (!newDescription) return; // User cancelled
    
    const newPoints = prompt('Edit points:', currentChallenge.points);
    if (!newPoints) return; // User cancelled
    
    const pointsNum = parseInt(newPoints);
    if (isNaN(pointsNum) || pointsNum <= 0) {
        showToast('Points must be a positive number', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/challenges/${challengeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description: newDescription,
                points: pointsNum,
                user_id: currentChallenge.creator_id || currentChallenge.user_id
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast('Challenge updated successfully!', 'success');
            loadChallenges(); // Reload the challenges list
        } else {
            showToast(data.message || 'Failed to update challenge', 'error');
        }
    } catch (error) {
        console.error('Error editing challenge:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}

// Helper function to get challenge by ID
async function getChallengeById(challengeId) {
    try {
        const response = await fetch(`${API_URL}/challenges`);
        
        if (!response.ok) return null;
        
        const challenges = await response.json();
        return challenges.find(c => c.challenge_id === challengeId);
    } catch (error) {
        console.error('Error fetching challenge:', error);
        return null;
    }
}

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('toast-show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}