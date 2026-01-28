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
      pt.plant_type_id,
      pt.plant_name,
      pt.rarity,
      pt.unlock_points,
      pt.image_url,
      pt.description,
      CASE 
        WHEN u.points >= pt.unlock_points THEN 1 
        ELSE 0 
      END as is_unlocked
    FROM plant_types pt
    CROSS JOIN User u
    WHERE u.user_id = ?
    ORDER BY pt.unlock_points ASC;
  `;
  const VALUES = [data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};