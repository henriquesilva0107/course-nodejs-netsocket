const net = require('net')

const tcpServer = net.createServer((socket) => {
	console.log('Connection established')

	tcpServer.getConnections((error, count) => {
		console.log('Number of concurrent tcp connections: ' + count)
	})
	
	// Se for utilizado o socket.end() é disparado
	// o evento end e logo após um close, senão
	// é disparado somente o close event
	socket.on('end', () => {
		console.log('Server disconnected')
	})

	socket.on('close', () => {
		console.log('Closed event fired')
	})

	socket.on('data', (data) => {
		console.log('Data received from the tcp client')
		socket.write('Server reply: ' + data)
		//socket.emit('error', new Error('forcefully injected error'))// Emit evento error
	})

	socket.on('error', (error) => {// Tratamento para error event, sem parar aplicação
		console.log('something wrong happened here')
		// finaliza o socket mais o servidor pode enviar alguns dados
		//socket.end('socket can send some more data but it will be endedn\n')
		// destroi tudo relacionado a esse socket
		socket.destroy()
	})
})
// Limita o número de clients conectados
tcpServer.maxConnections = 2

// Matem o servidor aberto para conexões existentes e não permite novas
setTimeout(() => {
	tcpServer.close(() => { console.log('Server closed') })
}, 30000)

tcpServer.listen(() => {//Se não informar a porta fica randomica
	let port = tcpServer.address().port
	console.log('Server started listening on port: ' + port)
})
