const pool = require('../../functions/pool');
const joi = require('joi');

exports.deleteToDo = function deleteToDo (req, res) {
    const schema = joi.object({
        todoID: joi.number().required()
    })
    const {value, error} = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 

    const { todoID } = value;

    pool.execute('DELETE FROM todos WHERE id=?', [todoID], (error, result) => {
        if (result.affectedRows < 1) {
            res.status(400).send("This todo does not excist in database")
        } else if (error){
            res.status(500).send(error)
        } else {
            res.status(200).send("Todo deleted")
        }
    })
}