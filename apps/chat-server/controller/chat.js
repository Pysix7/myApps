const Chat = require("../model/chat");
const { v4: uuidv4 } = require('uuid');

const { httpServer } = require('../index');
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

exports.chat = () => {
    try {
        // socket io connection event handler
        io.on('connection', async (socket) => {
            const { participants } = socket.handshake.query;
            const partcpts = JSON.parse(participants);
            console.log('participants', partcpts)

            const [chatRoomExists] = await Chat.find().all('participants', partcpts).select('roomId participants');
            console.log('chatRoomExists', chatRoomExists)

            let roomId = uuidv4();
            if (!chatRoomExists) {
                const chatRoom = new Chat({
                    roomId,
                    participants: partcpts
                });

                // save the chat room history
                chatRoom.save();
            } else {
                roomId = chatRoomExists.roomId;
            }
            // join room 
            socket.join(roomId);
            console.log('a user connected to room =>>', roomId);

            // // new events specific to room
            // io.to(roomId).emit('chat-message', {
            //     body: 'user connected -> ' + socket.id,
            //     senderId: socket.id
            // });

            // chat-message event handler
            socket.on('chat-message', (msg) => {
                io.to(roomId).emit('chat-message', msg);
            });

            // XXXXX old events XXXX 

            // io.emit('chat-message', {
            //     body: 'user connected -> ' + socket.id,
            //     senderId: socket.id
            // });

            // // disconnect event handler
            // socket.on('disconnect', () => {
            //     console.log('user disconnected');
            //     io.emit('chat-message', {
            //         body: 'user disconnected -> ' + socket.id,
            //         senderId: socket.id
            //     });
            // });

            // // chat-message event handler
            // socket.on('chat-message', (msg) => {
            //     io.emit('chat-message', msg);
            // });
        });
    } catch (err) {
        console.log('err', err)
    }
}
