const net = require('net')

let sockets = []

let tcpServer = net.createServer()

tcpServer.on('connection', (socket) => {
	console.log('connection established')

	socket.setEncoding('utf8')
	
	sockets.push(socket)
	
	socket.on('data', (data) => {
		
		let clients = sockets.length
		for(let i = 0; i < clients; i++) {
			if(sockets[i] === socket) continue
				sockets[i].write(data)
		}	
	})

	socket.on('end', () => {
		sockets.splice(sockets.indexOf(socket), 1)
		console.log('client left the chat')
	})
		
})

tcpServer.listen(8000, () => {
	console.log('Server running on port 8000')
})
