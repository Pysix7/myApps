const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

// routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const Chat = require("./model/chat");
const CONFIGS = require("./configs");

const srvr = express();
const http = require('http').createServer(srvr);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

// apply ratelimit to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

srvr.use(limiter);

// use bodyparser to parse the request's body. 
srvr.use(bodyParser.json());

// status check endpoint
srvr.use("/status", (req, res, next) => {
    res.send('<h1>Chat server is Up and Running</h1>');
});

// node-chat ui endpoint
srvr.get('/ui', (req, res) => {
    res.sendFile(__dirname + '/files/index.html');
});

// middleware to check for jwt token
srvr.use((req, res, next) => {
    const authorizationHeader =
        req.headers && req.headers.authorization
            ? req.headers.authorization.split(" ")
            : null;

    if (authorizationHeader && authorizationHeader[0] === "Bearer") {
        const validToken = jwt.verify(authorizationHeader[1], CONFIGS.JWT_SECRET);
        req.tokenData = {
            ...validToken
        }
    }
    next();
});

// setting CORS headers
srvr.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// auth routes
srvr.use("/auth", authRoutes);
// data routes
srvr.use("/users", usersRoutes);

// socket.io chat handler
(() => {
    try {
        // socket io connection event handler
        io.on('connection', async (socket) => {
            const { participants, username } = socket.handshake.query;
            /**
             * if participants exists are passed as query when connecting to socket
             * use the participants and create / use existing room & join to it
             */

            if (participants) {
                const partcpts = JSON.parse(participants);

                // checking if the room exists for the participants
                const [chatRoomExists] = await Chat.find().all('participants', partcpts).select('roomId participants');

                let roomId = uuidv4();
                // if room doesn;t exists create new roomId and join a room
                if (!chatRoomExists) {
                    const chatRoom = new Chat({
                        roomId,
                        participants: partcpts
                    });

                    // save the chat room history
                    chatRoom.save();
                } else {
                    // if room already exists use the roomId and join a room
                    roomId = chatRoomExists.roomId;
                }
                // join room 
                socket.join(roomId);
                console.log('a user connected to room =>>', roomId);

                // // new events specific to room

                /* io.to(roomId).emit('chat-message', {
                    body: 'user connected -> ' + socket.id,
                    senderId: socket.id
                }); */

                // chat-message event handler
                socket.on('chat-message', (msg) => {
                    io.to(roomId).emit('chat-message', msg);
                });
            } else if (username) {
                /**
                 * else all connections will join and communicate in global channel
                 */
                const userName = username || socket.id;
                io.emit('chat-message', {
                    body: 'user joined -> ' + userName,
                    senderId: userName
                });

                // disconnect event handler
                socket.on('disconnect', () => {
                    io.emit('chat-message', {
                        body: 'user left -> ' + userName,
                        senderId: userName
                    });
                });

                // chat-message event handler
                socket.on('chat-message', (msg) => {
                    io.emit('chat-message', msg);
                });
            }
        });
    } catch (err) {
        console.log('err', err)
    }
})()

// global error handler
srvr.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

/*
 *connecting to mongodb with mongoose ODM. 
 * once connection is established we start the server. 
 * 
*/

console.log('CONFIGS.MONGO_URI', CONFIGS.MONGO_URI)
if (CONFIGS.MONGO_URI) {
    mongoose
        .connect(CONFIGS.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            http.listen(CONFIGS.PORT, () =>
                console.log(`listening on port :: >> ${CONFIGS.PORT}`)
            );
        })
        .catch(err => {
            console.log("err :", err);
        });
} else {
    // running withoud database
    http.listen(CONFIGS.PORT, () =>
        console.log(`listening on port :: >> ${CONFIGS.PORT}`)
    );

}

