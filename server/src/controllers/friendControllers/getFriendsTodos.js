const pool = require('../../functions/pool')
const joi = require('joi');

exports.getFriendsTodos = function getFriendsTodos(req, res) {
    const schema = joi.object({
        userID: joi.number().required()
    })
    const {value, error} = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 
    
  //Friends userID from frontend
    const { userID } = value;

    if (!userID) {
        throw new Error('Missing friends ID')
    }

    const query = 
    `SELECT U.username, T.id, T.task, T.text, T.value FROM todos T
    INNER JOIN users U
    ON T.userID = U.id
    WHERE T.userID = ?`

    pool.execute(query, [userID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else if (result.length === 0){
            res.status(404).send("This user has no todos")
        } else {
            res.status(200).json(result)
        }
    })
}