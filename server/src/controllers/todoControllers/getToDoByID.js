const pool = require('../../functions/pool')

exports.getToDoByID = function getToDoByID(req, res) {
  
    const userID = req.userID

    const query = 
    `SELECT T.id, T.task, T.text, T.value FROM todos T WHERE T.userID = ?`

    pool.execute(query, [userID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else if (result.length === 0){
             res.status(404).send("This user has no todos yet")
        } else {
            res.status(200).json(result)
        }
    })
}