const pool = require('../../functions/pool')

exports.getAllUsers = function getAllUsers(req, res) {
    
    pool.execute('SELECT id, username FROM users', (error, result) => {
        if (error) {
            res.status(500).send(error)    
        } else if (result.length === 0) {
            res.status(500).send('There are no users registered')
        } else {
            res.status(200).json(result)
        }
    })
}