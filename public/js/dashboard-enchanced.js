// ============================================
// ENHANCED DASHBOARD FEATURES
// ============================================

checkAuth();

const user = getUser();
const token = getToken();

// Sample activity data (you can later fetch from backend)
let activities = [];
let streak = 0;

// Load dashboard data
async function loadDashboard() {
  if (!user || !token) {
    console.error('No user or token found');
    return;
  }

  console.log('📊 Loading enhanced dashboard for user:', user.user_id);

  // Display username
  document.getElementById("username").textContent = user.username;

  // Fetch fresh user data
  try {
    console.log('🔄 Fetching fresh user data...');
    const userResponse = await fetch(`${API_URL}/users/${user.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (userResponse.ok) {
      const freshUserData = await userResponse.json();
      console.log('✅ Fresh user data received:', freshUserData);
      
      const currentPoints = freshUserData.points || 0;
      document.getElementById("totalPoints").textContent = currentPoints;
      
      // Update localStorage
      saveUser(freshUserData);
      
      // Calculate and display tier progress
      updateTierProgress(currentPoints);
      
      // Update badges based on points
      updateBadges(currentPoints);
      
      // Calculate streak (simplified - you can enhance this)
      calculateStreak();
      
    } else {
      console.error('❌ Failed to fetch fresh user data');
      document.getElementById("totalPoints").textContent = user.points || 0;
      updateTierProgress(user.points || 0);
    }
  } catch (error) {
    console.error('❌ Error fetching user data:', error);
    document.getElementById("totalPoints").textContent = user.points || 0;
  }

  // Load garden stats and preview
  await loadGardenStats();
  
  // Load recent activity
  loadRecentActivity();
  
  // Calculate garden health
  calculateGardenHealth();
}

// Update tier progress ring
function updateTierProgress(points) {
  let currentTier = 'Common';
  let nextTier = 'Rare';
  let requiredPoints = 500;
  let progress = 0;
  
  if (points >= 3000) {
    currentTier = 'Legendary';
    nextTier = 'MAX';
    requiredPoints = 3000;
    progress = 100;
  } else if (points >= 1500) {
    currentTier = 'Epic';
    nextTier = 'Legendary';
    requiredPoints = 3000;
    progress = ((points - 1500) / 1500) * 100;
  } else if (points >= 500) {
    currentTier = 'Rare';
    nextTier = 'Epic';
    requiredPoints = 1500;
    progress = ((points - 500) / 1000) * 100;
  } else {
    currentTier = 'Common';
    nextTier = 'Rare';
    requiredPoints = 500;
    progress = (points / 500) * 100;
  }
  
  // Update UI
  document.getElementById("currentTier").textContent = `${currentTier} Tier`;
  
  if (nextTier === 'MAX') {
    document.getElementById("tierProgress").textContent = 'Max Tier Reached! 🎉';
  } else {
    const pointsNeeded = requiredPoints - points;
    document.getElementById("tierProgress").textContent = `${pointsNeeded} more points to ${nextTier}`;
  }
  
  // Update progress circle
  const circle = document.getElementById("progressCircle");
  const circumference = 2 * Math.PI * 52; // radius = 52
  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  
  // Update tier count
  let tierCount = 1;
  if (points >= 500) tierCount = 2;
  if (points >= 1500) tierCount = 3;
  if (points >= 3000) tierCount = 4;
  document.getElementById("unlockedTiers").textContent = tierCount;
}

// Update achievement badges
function updateBadges(points) {
  // Badge: First Challenge (always unlocked if points > 0)
  if (points > 0) {
    document.getElementById('badge-first-challenge').classList.remove('locked');
  }
  
  // Badge: 100 Points
  if (points >= 100) {
    document.getElementById('badge-100-points').classList.remove('locked');
  }
  
  // Badge: Rare Tier
  if (points >= 500) {
    document.getElementById('badge-rare-tier').classList.remove('locked');
  }
  
  // Other badges will be unlocked based on garden stats
}

// Calculate streak (simplified version)
function calculateStreak() {
  // In a real app, you'd fetch this from backend
  // For now, we'll calculate based on localStorage or set a default
  const lastActivity = localStorage.getItem('lastActivityDate');
  const today = new Date().toDateString();
  
  if (lastActivity === today) {
    streak = parseInt(localStorage.getItem('currentStreak') || '1');
  } else {
    // Reset or increment based on consecutive days
    // This is simplified - you'd want proper backend tracking
    streak = 1;
    localStorage.setItem('currentStreak', '1');
    localStorage.setItem('lastActivityDate', today);
  }
  
  document.getElementById('streakNumber').textContent = streak;
  
  // Badge: 7-day streak
  if (streak >= 7) {
    document.getElementById('badge-7-streak').classList.remove('locked');
  }
}

// Load garden stats and preview
async function loadGardenStats() {
  try {
    console.log('🔄 Fetching garden stats...');
    const response = await fetch(`${API_URL}/garden/${user.user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const plants = await response.json();
      console.log('✅ Garden stats received:', plants.length, 'plants');

      // Total plants
      document.getElementById("totalPlants").textContent = plants.length;

      // Bloomed plants
      const bloomedCount = plants.filter(p => p.growth_stage === "bloomed").length;
      document.getElementById("bloomedPlants").textContent = bloomedCount;
      
      // Badge: First Bloom
      if (bloomedCount > 0) {
        document.getElementById('badge-first-bloom').classList.remove('locked');
      }
      
      // Badge: 5 Plants
      if (plants.length >= 5) {
        document.getElementById('badge-5-plants').classList.remove('locked');
      }
      
      // Display garden preview (last 3 plants)
      displayGardenPreview(plants.slice(0, 3));
      
      // Add plants to activity feed
      if (plants.length > 0) {
        plants.slice(0, 2).forEach(plant => {
          activities.push({
            icon: getPlantEmoji(plant.plant_name),
            title: `Planted ${plant.plant_nickname}`,
            time: formatTimeAgo(plant.planted_at),
            type: 'plant'
          });
        });
      }
    }
  } catch (error) {
    console.error('❌ Error loading garden stats:', error);
  }
}

// Display garden preview
function displayGardenPreview(plants) {
  const container = document.getElementById('gardenPreview');
  
  if (!plants || plants.length === 0) {
    container.innerHTML = `
      <div style="color: var(--light-sage); text-align: center; padding: 40px;">
        No plants yet. Start growing your garden! 🌱
      </div>
    `;
    return;
  }
  
  container.innerHTML = plants.map(plant => `
    <div class="preview-plant" onclick="window.location.href='garden.html'">
      <div class="preview-plant-emoji">${getPlantEmoji(plant.plant_name)}</div>
      <div class="preview-plant-name">${plant.plant_nickname}</div>
    </div>
  `).join('');
}

// Calculate garden health
function calculateGardenHealth() {
  // Simplified health calculation
  // In real app, check when plants were last watered
  const totalPlants = parseInt(document.getElementById("totalPlants").textContent);
  const bloomedPlants = parseInt(document.getElementById("bloomedPlants").textContent);
  
  let healthScore = 5; // Default perfect health
  let message = "Your garden is thriving!";
  
  if (totalPlants === 0) {
    healthScore = 3;
    message = "Plant your first seed to start!";
  } else if (bloomedPlants === 0 && totalPlants > 0) {
    healthScore = 4;
    message = "Your plants are growing nicely!";
  } else if (bloomedPlants === totalPlants) {
    healthScore = 5;
    message = "Perfect! All plants blooming!";
  }
  
  // Display stars
  const stars = '⭐'.repeat(healthScore) + '☆'.repeat(5 - healthScore);
  document.getElementById('healthStars').textContent = stars;
  document.getElementById('healthMessage').textContent = message;
}

// Load recent activity
function loadRecentActivity() {
  // Add some sample activities (in real app, fetch from backend)
  const points = parseInt(document.getElementById("totalPoints").textContent);
  
  if (points > 0) {
    activities.unshift({
      icon: '🎉',
      title: 'Earned points from challenges',
      time: 'Today',
      type: 'points'
    });
  }
  
  // Display activities
  const container = document.getElementById('activityFeed');
  
  if (activities.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--light-sage);">
        No recent activity yet. Start by completing a challenge!
      </div>
    `;
    return;
  }
  
  container.innerHTML = activities.slice(0, 5).map(activity => `
    <div class="activity-item">
      <div class="activity-icon">${activity.icon}</div>
      <div class="activity-content">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    </div>
  `).join('');
}

// Helper function: Get plant emoji
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

// Helper function: Format time ago
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateString);
}

// Load dashboard on page load
loadDashboard();