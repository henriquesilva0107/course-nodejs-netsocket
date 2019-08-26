const net = require('net')
let numeroDaTransacao = 0

const socket = net.connect({port: 8111}, () => {
	socket.write('Hello from tcp client.')
})

socket.setEncoding('utf8')
socket.on('data', (data) => {
	console.log(data)
	socket.destroy()
})

socket.on('close', () => {
	console.log('close event on tcp client')
})
