const net = require('net')

const tcpServer = net.createServer((socket) => {
	console.log('Connection established')
	
	// Pega o número de clients conectados
	tcpServer.getConnections((error, count) => {
		console.log('Number of concurrent tcp connections: ' + count)
	})

	socket.on('end', () => {
		console.log('Server disconnected')
	})

	socket.on('data', (data) => {
		console.log('Data received from the tcp client')
		socket.write('Server reply: ' + data)
	})
})

tcpServer.listen(() => {//Se não informar a porta fica randomica
	let port = tcpServer.address().port
	console.log('Server started listening on port: ' + port)
})
