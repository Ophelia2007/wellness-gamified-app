// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Register new user
async function register(username, email, password) {
    try {
        console.log('Attempting registration to:', `${API_URL}/auth/register`);
        
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Registration successful! Check your email for a welcome message. Redirecting to login...', 'success');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Show error message
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage(`Connection error: ${error.message}. Make sure the backend server is running on port 3000.`, 'error');
    }
}

// Login user
async function login(username, password) {
    try {
        console.log('Attempting login to:', `${API_URL}/auth/login`);
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token and user info
            saveToken(data.token);
            saveUser(data.user);
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Show error message
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage(`Connection error: ${error.message}. Make sure the backend server is running on port 3000.`, 'error');
    }
}

// Check if already logged in (redirect to dashboard)
function checkIfLoggedIn() {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
}
