const challengesModel = require("../models/challengesModel");

module.exports.createNewChallenge = (req, res, next) => {
  if (req.body.description == undefined || req.body.user_id == undefined ||
    req.body.points == undefined
  )
   {
    res.status(400).send({
      message: "Missing required data."
    });
    return;
  }
    const data = {
      description: req.body.description,
      userId: req.body.user_id,
      points: req.body.points
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewChallenge:", error);
            res.status(500).json(error);
        }else {
          req.insertId = results.insertId;
            next();
        }
}
    challengesModel.insertSingle(data, callback);

}
module.exports.printNewChallenge = (req, res, next) =>
{
  const data = {
    challengeId: req.insertId,
  }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error printNewChallenge:", error);
            res.status(500).json(error);
        } 
        else res.status(201).json(results[0]);
    }
   challengesModel.printNewChallenge(data, callback);
}
module.exports.readAllChallanges = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChallenges:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }
    challengesModel.selectAll(callback);
}
module.exports.deleteChallengeById = (req, res, next) =>
{
    const data = {
        challengeId: req.params.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChallengeById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Challenge not found"
                });
            }
            else res.status(204).send();          
        }
    }

    challengesModel.deleteById(data, callback);
}
module.exports.checkIdexist= (req, res, next) =>
{
    const data = {
        challengeId: req.params.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkIdexist:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Challenge Not found"
                });
            }
            else {
req.creator_id = results[0].creator_id; 
        next();
            }
        }
    }
    challengesModel.selectById(data, callback);
}
module.exports.checkCorrectOwner = (req, res, next) => {

  if (
    req.body.description == undefined ||
    req.body.user_id == undefined ||
    req.body.points == undefined
  ) {
    return res.status(400).json({
      message: "Missing required data."
    });
  }
  if (req.creator_id != req.body.user_id) {
    return res.status(403).json({
      message: "Forbidden: Not correct owner."
    });
  }

  next();
}

module.exports.updateChallengebyId = (req, res, next) => {
    const data = {
  challengeId: req.params.challenge_id,
  description: req.body.description,
  points: req.body.points
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateChallengebyId:", error);
            res.status(500).json(error);
        }else {
          next()
        }
}
   challengesModel.updateChallenge(data, callback);
}

module.exports.printupdatedChallenge = (req, res, next) =>
{
  const data = {
    challengeId: req.params.challenge_id
  }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error printupdatedChallenge:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);
    }
    challengesModel.printupdatedChallenge(data, callback);
}
