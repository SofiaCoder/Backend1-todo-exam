const express = require('express');
const { deleteToDo } = require('../controllers/todoControllers/deleteToDo');
const { getToDoByID } = require('../controllers/todoControllers/getToDoByID');
const { patchToDo } = require('../controllers/todoControllers/patchToDo');
const { postToDo } = require('../controllers/todoControllers/postToDo');
const { checkAutentication } = require('../middlewares/checkAuthentication');
const { patchCheckBox } = require('../controllers/todoControllers/patchCheckboxValue');
const toDoRouter = express.Router();

toDoRouter.use(checkAutentication);

toDoRouter.post('/', postToDo);
toDoRouter.patch('/', patchToDo);
toDoRouter.delete('/', deleteToDo);
toDoRouter.get('/id', getToDoByID);
toDoRouter.patch('/val', patchCheckBox)

exports.toDoRouter = toDoRouter;
