const net = require('net')
const socketUtil = require('./socketUtil')

const socket = net.connect({port: 8111}, () => {
	socket.write('Hello from tcp client.')

	socketUtil.socketAddress(socket)
})

socket.setEncoding('utf8')
socket.on('data', (data) => {
	console.log(data)
	socketUtil.socketStatus(socket)
	socket.destroy()
})

socket.on('close', () => {
	console.log('close event on tcp client')
})
