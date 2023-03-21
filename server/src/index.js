const express = require('express');
const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { myMiddleware } = require('./middlewares/jsonParser');
const { authRouter } = require('./routers/authRouter');
const { toDoRouter } = require('./routers/toDoRouter');
const pool = require('./functions/pool');
const { friendRouter } = require('./routers/friendRouter');
server.use(myMiddleware);
server.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
server.use(cookieParser());


server.use('/todo', toDoRouter)

server.use('/auth', authRouter)

server.use('/friends', friendRouter)

server.listen(5050)