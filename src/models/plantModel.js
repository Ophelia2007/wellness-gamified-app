// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// GET ALL PLANT TYPES
// ##############################################################
module.exports.selectAllPlants = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM plant_types
    ORDER BY unlock_points ASC, plant_name ASC;
  `;
  pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// GET UNLOCKED PLANTS FOR USER
// ##############################################################
module.exports.selectUnlockedPlants = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT 
      plant_type_id,
      plant_name,
      rarity,
      unlock_points,
      image_url,
      description
    FROM plant_types
    WHERE (SELECT points FROM user WHERE user_id = ?) >= unlock_points = 1
    ORDER BY unlock_points ASC;
  `;
  const VALUES = [data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
