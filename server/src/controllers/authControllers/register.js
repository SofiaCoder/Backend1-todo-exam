const pool = require("../../functions/pool");
const joi = require('joi');
const bcrypt = require('bcrypt');

exports.register = function register (req, res) {
    const schema = joi.object({
        username: joi.string().min(3).max(25).required(),
        password: joi.string().min(3).max(25).required()
    })

    const {value, error} = schema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { username, password } = value

    const hashPassword = bcrypt.hashSync(password, 10);

    pool.execute('INSERT INTO users (username, password) value (?, ?)',[username, hashPassword], (error, result) => {
        if (error) {
            res.status(500).send(error.sqlMessage)
        } else {
            res.status(201).send(`Added ${username} to database`)
        }
    })
}