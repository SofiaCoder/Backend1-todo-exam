const express = require('express')
const { addFriends } = require('../controllers/friendControllers/addFriends')
const { getAllUsers } = require('../controllers/friendControllers/getAllUsers')
const { getFriendsTodos } = require('../controllers/friendControllers/getFriendsTodos')
const { showUsersFriends } = require('../controllers/friendControllers/showUsersFriends')
const { checkAutentication } = require('../middlewares/checkAuthentication')
const friendRouter = express.Router()

friendRouter.use(checkAutentication);

friendRouter.get('/', getAllUsers)
friendRouter.post('/todos', getFriendsTodos)
friendRouter.post('/add', addFriends)
friendRouter.get('/show', showUsersFriends)

exports.friendRouter = friendRouter