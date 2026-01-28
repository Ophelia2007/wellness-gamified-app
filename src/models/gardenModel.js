// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// GET USER'S GARDEN
// ##############################################################
module.exports.selectUserGarden = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT 
      ug.garden_id,
      ug.user_id,
      ug.plant_type_id,
      ug.plant_nickname,
      ug.health,
      ug.growth_stage,
      ug.completion_count,
      ug.planted_at,
      ug.last_watered,
      pt.plant_name,
      pt.rarity,
      pt.image_url
    FROM user_garden ug
    JOIN plant_types pt ON ug.plant_type_id = pt.plant_type_id
    WHERE ug.user_id = ?
    ORDER BY ug.planted_at DESC;
  `;
  const VALUES = [data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// PLANT A NEW SEED
// ##############################################################
module.exports.insertPlant = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO user_garden (user_id, plant_type_id, plant_nickname)
    VALUES (?, ?, ?);
  `;
  const VALUES = [data.userId, data.plantTypeId, data.plantNickname];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// CHECK IF PLANT IS UNLOCKED
// ##############################################################
module.exports.checkPlantUnlocked = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT 
      (SELECT points FROM user WHERE user_id = ?) as user_points,
      unlock_points,
      (SELECT points FROM user WHERE user_id = ?) >= unlock_points as is_unlocked
    FROM plant_types
    WHERE plant_type_id = ?;
  `;
  const VALUES = [data.userId, data.userId, data.plantTypeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
// ##############################################################
// DELETE PLANT FROM GARDEN
// ##############################################################
module.exports.deletePlant = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM user_garden
    WHERE garden_id = ?;
  `;
  const VALUES = [data.gardenId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// WATER PLANT (UPDATE GROWTH)
// ##############################################################
module.exports.waterPlant = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE user_garden
    SET completion_count = completion_count + 1,
        last_watered = CURRENT_TIMESTAMP,
        growth_stage = CASE
          WHEN completion_count >= 5 THEN 'bloomed'
          WHEN completion_count >= 3 THEN 'growing'
          WHEN completion_count >= 1 THEN 'sprout'
          ELSE 'seed'
        END
    WHERE garden_id = ?;
  `;
  const VALUES = [data.gardenId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// GET PLANT BY GARDEN_ID (for ownership check)
// ##############################################################
module.exports.getPlantById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT garden_id, user_id, plant_type_id, plant_nickname, growth_stage
        FROM user_garden
        WHERE garden_id = ?;
    `;
    const VALUES = [data.gardenId];
    pool.query(SQLSTATEMENT, VALUES, callback);
};