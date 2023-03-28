const pool = require("../../functions/pool");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const joi = require('joi')

const {AUTH_SECRET} = process.env;

exports.login = function login (req, res) {
    const schema = joi.object({
        username: joi.string().min(3).max(25).required(),
        password: joi.string().min(3).max(25).required()
    })

    const {value, error} = schema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    } 

    const { username, password } = value;

    pool.execute('SELECT password, id FROM users WHERE username=?',[username], (error, result) => {
        if (error) {
            res.status(500).send(error.sqlMessage)
        } else if (result.length === 0) {
            res.status(500).send('Wrong username')
        } else {
            const savedPassword = result[0].password;
            
            const authorisation = bcrypt.compareSync(password, savedPassword)

            if (authorisation) {
                const userID = result[0].id
                const authToken = jwt.sign({userID}, AUTH_SECRET, {expiresIn: '1h'})
                res.cookie('authKey', authToken, {
                    maxAge: 60 * 60 *1000,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true
                })
                res.status(200).send(username)
            } else {
                res.status(401).send('Wrong password')
            }
        }
    })
}