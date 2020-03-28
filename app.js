const path = require('path');
const http = require('http');

const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

const io = socketio(server);
const botName = 'chatApp Bot';
//run when client connects
io.on('connection', socket =>  {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        // console.log(user.room);
        socket.join(user.room);
        
    //Weclome a single current user connection
    socket.emit('text', formatMessage(botName, 'Welcome to chatApp'));

    //broadcast message to connected users except the user that is connecting atm
    socket.broadcast
        .to(user.room)
        .emit('text', formatMessage(botName, `${username} has joined the chat`)
    );

    //Send users and room info when users connect, displayed on the sidebar
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    });
});
   
   
    //listen for chat message
    socket.on('chatText', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('text', formatMessage(user.username, msg));
    });

     //Runs when client disconnects
     socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        // console.log(user);
        if (user) {
            io.to(user.room).emit(
                'text',
                formatMessage(botName, `${user.username} has left the chat`));
            
            //Send users and room info after user(s) have disconnected
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
            }
        }
    );
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`app server running on port ${PORT}`));



//broadcast msg to everyone including the connecting user atm
// io.emit('text', 'A user has entered the chat'); 
