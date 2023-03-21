const pool = require('../../functions/pool')
const joi = require('joi');

exports.patchToDo = function patchToDo(req, res) {
    const schema = joi.object({
        todoID: joi.number().required(),
        todoTask: joi.string().max(50).required(),
        todoText: joi.string().max(250)
    })
    const {value, error} = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 
    
    let { todoID, todoTask, todoText } = value
    if(!todoText) todoText = null

    pool.execute('UPDATE todos SET task=?, text=? WHERE id = ?', [todoTask, todoText, todoID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(result)
        }
    })
}