const joi = require('joi');
const pool = require('../../functions/pool')

exports.postToDo = function postToDo(req, res) {
    const schema = joi.object({
        task: joi.string().max(50).required(),
        text: joi.string().max(250).allow('')
    })
    const { value, error } = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    
    let { task, text } = value;
    if(!text) text = null;
    const userID = req.userID;

    pool.execute('INSERT INTO todos (task, text, userID) VALUE (?, ?, ?)', [task, text, userID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send("Todo added")
        }
    })
}