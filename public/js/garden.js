// ============================================
// GARDEN MANAGEMENT FUNCTIONS
// ============================================

const user = getUser();
const token = getToken();

// Load user's garden
async function loadGarden() {
    const container = document.getElementById('gardenContainer');
    
    if (!user || !token) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Please log in to view your garden.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/garden/${user.user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
        // ✅ Token expired or invalid - show notification
        console.log('🔒 Token expired while loading garden');
        handleExpiredToken('garden.html');
        return;
    }
}

        const plants = await response.json();
        displayGarden(plants);
    } catch (error) {
        console.error('Error loading garden:', error);
        container.innerHTML = `
            <p style="text-align: center; color: #f44336;">
                Error loading garden. Please try again.
            </p>
        `;
    }
}

// Display garden
function displayGarden(plants) {
    const container = document.getElementById('gardenContainer');
    
    if (!Array.isArray(plants) || plants.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 60px; margin-bottom: 20px;">🌱</div>
                <h3 style="color: #666;">Your garden is empty!</h3>
                <p style="color: #999; margin: 10px 0;">Start by planting your first seed.</p>
                <a href="plants.html" class="btn btn-success" style="margin-top: 20px;">
                    Browse Plant Catalog 🌸
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = '<div class="garden-grid"></div>';
    const grid = container.querySelector('.garden-grid');

    plants.forEach(plant => {
        const plantCard = createPlantCard(plant);
        grid.appendChild(plantCard);
    });
}

// Create plant card element
function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    
    const emoji = getPlantEmoji(plant.plant_name);
    const stageEmoji = getGrowthEmoji(plant.growth_stage);
    
    card.innerHTML = `
        <div class="plant-emoji">${emoji}</div>
        <h3 class="plant-name">${plant.plant_name}</h3>
        <p class="plant-nickname">"${plant.plant_nickname}"</p>
        
        <div class="growth-stage">${stageEmoji} ${capitalize(plant.growth_stage)}</div>
        
        <div style="margin: 15px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Growth Progress</p>
            <div class="health-bar">
                <div class="health-fill" style="width: ${getGrowthPercentage(plant.growth_stage)}%"></div>
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
                Watered ${plant.completion_count || 0} times
            </p>
        </div>

        <div style="margin: 15px 0;">
            <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Health</p>
            <div class="health-bar">
                <div class="health-fill" style="width: ${plant.health}%"></div>
            </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="btn btn-success btn-sm" onclick="waterPlant(${plant.garden_id})" style="flex: 1;">
                💧 Water
            </button>
            <button class="btn btn-danger btn-sm" onclick="removePlant(${plant.garden_id}, '${plant.plant_nickname}')" style="flex: 1;">
                🗑️ Remove
            </button>
        </div>

        <p style="font-size: 11px; color: #999; margin-top: 10px;">
            Planted on ${formatDate(plant.planted_at)}
        </p>
    `;
    
    return card;
}

// Get growth percentage for progress bar
function getGrowthPercentage(stage) {
    const percentages = {
        'seed': 0,
        'sprout': 25,
        'growing': 50,
        'bloomed': 100
    };
    return percentages[stage] || 0;
}

// Water a plant
async function waterPlant(gardenId) {
    if (!confirm('Water this plant? This will help it grow!')) return;

    try {
        const response = await fetch(`${API_URL}/garden/${gardenId}/water`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            showToast('💧 Plant watered successfully! ' + data.message, 'success');
            loadGarden(); // Reload garden to show updated growth
        } else if (response.status === 401 || response.status === 403) {
    // ✅ Token expired
    handleExpiredToken('garden.html');
    return;
}
    } catch (error) {
        console.error('Error watering plant:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}

// Remove a plant
async function removePlant(gardenId, nickname) {
    if (!confirm(`Are you sure you want to remove "${nickname}" from your garden? This cannot be undone!`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/garden/${gardenId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204 || response.ok) {
            showToast(`🗑️ "${nickname}" has been removed from your garden.`, 'success');
            loadGarden(); // Reload garden
        } else if (response.status === 401 || response.status === 403) {
    // ✅ Token expired
    handleExpiredToken('garden.html');
    return;
}
    } catch (error) {
        console.error('Error removing plant:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}