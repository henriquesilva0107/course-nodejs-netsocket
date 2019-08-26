const net = require('net')
let operation = 0

const tcpServer = net.createServer((socket) => {
	console.log('Connection established')

	socket.on('end', () => {
		console.log('Server disconnected')
	})

	socket.on('data', (data) => {
		console.log('Data received from the tcp client')
		console.log('Operation: ' + (++operation))
		socket.write('Server reply: ' + data)
	})
})

tcpServer.listen(8111, () => {
	console.log('Server started listening')
})
