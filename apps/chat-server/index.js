const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const srvr = express();
const http = require('http').createServer(srvr);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

const CONFIGS = require("./configs");

// const mongoDBURI = process.env.MONGO_URI || 'mongodb://localhost/chat-server';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// apply ratelimit to all requests
srvr.use(limiter);

// use bodyparser to parse the request's body. 
srvr.use(bodyParser.json());

/* srvr.use((req, res, next) => {
    const authorizationHeader =
        req.headers && req.headers.authorization
            ? req.headers.authorization.split(" ")
            : null;

    if (authorizationHeader && authorizationHeader[0] === "Bearer") {
        const validToken = jwt.verify(authorizationHeader[1], CONFIGS.JWT_SECRET);
    }
    next();
}); */

// setting CORS headers
/* srvr.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}); */

// status check endpoint
srvr.use("/status", (req, res, next) => {
    res.send('<h1>Chat server is Up and Running</h1>');
});

srvr.get('/ui', (req, res) => {
    res.sendFile(__dirname + '/files/index.html');
});

// socket io connection event handler
io.on('connection', (socket) => {
    console.log('a user connected');

    io.emit('chat-message', {
        body: 'user connected -> ' + socket.id,
        senderId: socket.id
    });

    // disconnect event handler
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat-message', {
            body: 'user disconnected -> ' + socket.id,
            senderId: socket.id
        });
    });

    // chat-message event handler
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg);
    });
});

// global error handler
srvr.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

http.listen(CONFIGS.PORT, () =>
    console.log(`listening on port :: >> ${CONFIGS.PORT}`)
);

// connecting to mongodb with mongoose ODM.
// once connection is established we start the server.

/* mongoose
    .connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        http.listen(CONFIGS.PORT, () =>
            console.log(`listening on port :: >> ${CONFIGS.PORT}`)
        );
    })
    .catch(err => {
        console.log("err :", err);
    }); */
