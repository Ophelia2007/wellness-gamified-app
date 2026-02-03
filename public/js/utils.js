// ============================================
// UTILITY FUNCTIONS
// ============================================

// Auto-detect API URL based on environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : `${window.location.protocol}//${window.location.hostname}:3000`;

// Show message to user
function showMessage(message, type = 'success') {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    
    messageDiv.className = type === 'success' ? 'alert alert-success' : 'alert alert-error';
    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Get user from localStorage
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Save token to localStorage
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Save user to localStorage
function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Clear auth data
function clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// Check if user is authenticated
function isAuthenticated() {
    return getToken() !== null && getUser() !== null;
}

// Redirect to login if not authenticated
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    clearAuth();
    window.location.href = 'index.html';
}

// Handle expired token with user notification
function handleExpiredToken(returnPage = '') {
    clearAuth();
    
    // Show toast notification
    showToast('⏰ Your session has expired. Please login again.', 'warning');
    
    // Redirect to login after short delay
    setTimeout(() => {
        // Store the page user was trying to access (optional for future "return to" feature)
        if (returnPage) {
            sessionStorage.setItem('returnTo', returnPage);
        }
        window.location.href = 'login.html';
    }, 2000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get plant emoji
function getPlantEmoji(name) {
    const emojis = {
        'Sunflower': '🌻',
        'Daisy': '🌼',
        'Rose': '🌹',
        'Tulip': '🌷',
        'Cherry Blossom': '🌸',
        'Orchid': '🌺',
        'Moon Flower': '🌙',
        'Dragon Tree': '🐉'
    };
    return emojis[name] || '🌱';
}

// Get growth stage emoji
function getGrowthEmoji(stage) {
    const emojis = {
        'seed': '🌰',
        'sprout': '🌱',
        'growing': '🌿',
        'bloomed': '🌸'
    };
    return emojis[stage] || '🌱';
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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