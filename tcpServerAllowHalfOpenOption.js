const net = require('net')
const socketUtil = require('./socketUtil')
/*
	Custom TCP Client Port
	command:
	nc -p  number_port    host       port_server
	nc -p 	6000       localhost       3000

	//define a port remota para ser a 6000
	nc -p 6000 localhost host
*/
const tcpServer = net.createServer({allowHalfOpen: false})

tcpServer.on('connection', (socket) => {
	console.log('Connection established')

	socketUtil.socketAddress(socket)// Function que está no módulo socketUtil

	tcpServer.getConnections((error, count) => {
		console.log('Number of concurrent tcp connections: ' + count)
	})
	
	// Se for utilizado o socket.end() é disparado
	// o evento end e logo após um close, senão
	// é disparado somente o close event
	socket.on('end', () => {
		socketUtil.socketStatus(socket)// Function que está no módulo socketUtil
		console.log('Server disconnected')
	})

	socket.on('close', () => {
		console.log('Closed event fired')
	})

	socket.on('data', (data) => {
		console.log('Data received from the tcp client')
		let flushed = socket.write('Server reply: ' + data)
		console.log('Buffer kernel free: ' + flushed)// Retorna true se todos os dados forem liberados do buffer do kernel
		//socket.emit('error', new Error('forcefully injected error'))// Emit evento error
	})

	socket.on('error', (error) => {// Tratamento para error event, sem parar aplicação
		console.log('something wrong happened here')
		// finaliza o socket mais o servidor pode enviar alguns dados
		//socket.end('socket can send some more data but it will be endedn\n')
		// destroi tudo relacionado a esse socket
		socket.destroy()
	})

	// Desconecta o client após 15 segundos
	socket.setTimeout(15000)

	// Manipulador do evento timeout
	socket.on('timeout', () => {
		socket.end('Time out\n')
	})
})

// Limita o número de clients conectados
tcpServer.maxConnections = 2

// Matem o servidor aberto para conexões existentes e não permite novas
setTimeout(() => {
	tcpServer.close(() => { console.log('Server closed') })
}, 60000)

// Quando tcpServer emitir algum evento de close ele chama essa código abaixo
tcpServer.on('close', () => console.log('Second close event handler'))

tcpServer.listen(() => {//Se não informar a porta fica randomica
	let port = tcpServer.address().port
	console.log('Server started listening on port: ' + port)
})
