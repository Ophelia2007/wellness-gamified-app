const usersModel = require("../models/usersModel");

module.exports.checkDuplicate = (req, res, next) => {
  if (req.body.username == undefined)
   {
    res.status(400).send({
      message: "Missing required data."
    });
    return;
  }
    const data = {
      userName: req.body.username
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }else {
            if(results.length > 0) {
        return res.status(409).json({
          message: "Username already exists."
        });
      }
      next();
        }
}
    usersModel.findByUsername(data, callback);

}

module.exports.createNewUser = (req, res, next) => {
  if (req.body.username == undefined)
   {
    res.status(400).send({
      message: "Missing required data."
    });
    return;
  }
    const data = {
      userName: req.body.username
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }else {
          req.insertId = results.insertId;
            next();
        }
}
    usersModel.insertSingle(data, callback);

}
module.exports.printNewUser = (req, res, next) =>
{
  const data = {
    userId: req.insertId
  }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error printNewUser:", error);
            res.status(500).json(error);
        } 
        else res.status(201).json(results[0]);
    }
    usersModel.printNewUser(data, callback);
}
module.exports.readAllUsers = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }
    usersModel.selectAll(callback);
}
module.exports.readUserById = (req, res, next) =>
{
    const data = {
        userId: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Not found"
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }

    usersModel.selectById(data, callback);
}
module.exports.checkIdexist= (req, res, next) =>
{
    const data = {
        userId: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Not found"
                });
            }
            else {
                next();
            }
        }
    }
    usersModel.selectById(data, callback);
}
module.exports.checkDuplicateusername = (req, res, next) => {
  if (req.body.username == undefined)
   {
    res.status(400).send({
      message: "Missing required data."
    });
    return;
  }
    const data = {
      userId: req.params.user_id,
      userName: req.body.username
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }else {
            if(results.length > 0) {
        return res.status(409).json({
          message: "Username already exists."
        });
      }
      next();
        }
}
    usersModel.findByUsername2(data, callback);

}

module.exports.updateUserbyId = (req, res, next) => {
    const data = {
      userId: req.params.user_id,
    userName: req.body.username,
    points: req.body.points
    }
     const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        }else {
          next()
        }
}
    usersModel.updateUser(data, callback);

}
module.exports.printupdatedUser = (req, res, next) =>
{
  const data = {
    userId: req.params.user_id
  }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error printupdatedUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results[0]);
    }
    usersModel.printupdatedUser(data, callback);
}
