const express = require('express')
const { login } = require('../controllers/authControllers/login')
const { register } = require('../controllers/authControllers/register')
const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/register', register)

exports.authRouter = authRouter