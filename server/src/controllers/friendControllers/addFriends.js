const pool = require('../../functions/pool');
const joi = require('joi');

exports.addFriends = function addFriends(req, res) {
    const userID = req.userID;
    const schema = joi.object({
        friendsID: joi.number().required()
    })
    const {value, error} = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 

    const { friendsID } = value;
    
    if( friendsID === userID ) {
        res.status(400).send('Sorry, you can´t add yourself as a friend')
        return;
    }

    const mySQLquery = "INSERT INTO relations (userID, friendID) VALUE (?, ?)"
    pool.execute(mySQLquery, [userID, friendsID], (error, result) => {
        if(error || result.affectedRows === 0) {
            res.status(500).send(error)
        } else {
            res.status(200).send('Friend added')
        }
    })
}