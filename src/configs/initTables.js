const pool = require('../services/db');

const SQLSTATEMENT = `
-- Drop tables in reverse order
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS user_garden;
DROP TABLE IF EXISTS plant_types;
DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS WellnessChallenge;
DROP TABLE IF EXISTS User;

-- Create User table with email and password
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create WellnessChallenge table
CREATE TABLE WellnessChallenge (
    challenge_id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id INT NOT NULL,
    description TEXT NOT NULL,
    points INT NOT NULL
);

-- Create UserCompletion table
CREATE TABLE UserCompletion (
    completion_id INT AUTO_INCREMENT PRIMARY KEY,
    challenge_id INT NOT NULL,
    user_id INT NOT NULL,
    details TEXT,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create plant_types table
CREATE TABLE plant_types (
    plant_type_id INT PRIMARY KEY AUTO_INCREMENT,
    plant_name VARCHAR(100) NOT NULL,
    rarity VARCHAR(20) NOT NULL,
    unlock_points INT DEFAULT 0,
    growth_time_hours INT,
    image_url VARCHAR(255),
    description TEXT
);

-- Create user_garden table
CREATE TABLE user_garden (
    garden_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    plant_type_id INT NOT NULL,
    plant_nickname VARCHAR(100),
    health INT DEFAULT 100,
    growth_stage VARCHAR(20) DEFAULT 'seed',
    completion_count INT DEFAULT 0,
    planted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_watered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (plant_type_id) REFERENCES plant_types(plant_type_id)
);

-- Insert sample plants
INSERT INTO plant_types (plant_name, rarity, unlock_points, growth_time_hours, image_url, description) VALUES
('Sunflower', 'common', 0, 24, 'sunflower.png', 'A bright and cheerful common flower'),
('Daisy', 'common', 0, 20, 'daisy.png', 'Simple and beautiful starter plant'),
('Rose', 'rare', 500, 48, 'rose.png', 'Classic elegant flower for dedicated users'),
('Tulip', 'rare', 500, 40, 'tulip.png', 'Colorful spring flower'),
('Cherry Blossom', 'epic', 1500, 72, 'cherry.png', 'Beautiful Japanese sakura tree'),
('Orchid', 'epic', 1500, 60, 'orchid.png', 'Exotic tropical flower'),
('Moon Flower', 'legendary', 3000, 96, 'moonflower.png', 'Mystical glowing night bloom'),
('Dragon Tree', 'legendary', 3000, 100, 'dragontree.png', 'Ancient legendary plant');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully!");
    }
    process.exit();
});