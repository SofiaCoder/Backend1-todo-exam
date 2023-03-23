const pool = require('../../functions/pool')
const joi = require('joi');

exports.patchCheckBox = function patchCheckBox(req, res) {
    const schema = joi.object({
        todoID: joi.number().required(),
        boxValue: joi.number().required()
    })

    const {value, error} = schema.validate(req.body) 

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 

    const { boxValue, todoID } = value

    if(boxValue !== 1 && boxValue !== 0) {
        res.status(400).send("boxValue must be 0 or 1")
        return;
    }

    pool.execute('UPDATE todos SET value = ? WHERE id = ?', [boxValue, todoID], (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else if (result.affectedRows < 1){
            res.status(500).send('Somethong went wrong. Value didn´t get updated')
        } else {
            res.status(200).send("Updated value")
        }
    })
}