const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', {
	// 	from: 'amiteeee@gmail.com',
	// 	text: 'what are you doing',
	// 	createAt: 123
	// });

	/*********socket.emit from admin text welcome to chat app */

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'from hello world',
		createAt: new Date().getTime()
	});

	/*
     * 
     * socket.broadcast.emit fom Admin text New user joined
     * */

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			to: message.text,
			createAt: new Date().getTime()
		});
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});
server.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
