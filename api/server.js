const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-routes')
const ipSourceRouter = require('../routes/ipsource-routes');
const userRouter = require('../routes/user-routes');

const { logger } = require('./logger/logger');
const { verifyToken } = require('./auth/auth-middleware');

const server = express();
server.use(helmet() );
server.use(express.json() );
server.use(cors() );

server.use(logger);

server.use("/api/auth", authRouter);
server.use("/api/ipsource", verifyToken, ipSourceRouter);
server.use("/api/users", [verifyToken], userRouter);

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})



module.exports = server;