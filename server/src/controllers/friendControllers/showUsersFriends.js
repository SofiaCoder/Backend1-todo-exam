const pool = require('../../functions/pool');

exports.showUsersFriends = function showUsersFriends(req, res) {
    const userID = req.userID;

    const query = 
    `SELECT DISTINCT U.id, U.username FROM users U
    INNER JOIN relations R ON U.id = R.friendID
    WHERE U.id IN (SELECT friendID from relations WHERE R.userID = ?)`

    pool.execute(query, [userID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else if (result.length == 0){
            res.status(404).send("This user has no friends yet")
        } else {
            res.status(200).json(result)
        }
    })
}