const socketAddress = (socket) => {
	console.log('Remote port: ' + socket.remotePort)
	console.log('Remote address: ' + socket.remoteAddress)
	console.log('Local port: ' + socket.localPort)
	console.log('Local address: ' + socket.localAddress)
}

const socketStatus = (socket) => {
	console.log('Bytes read: ' + socket.bytesRead)
	console.log('Bytes written: ' + socket.bytesWritten)
}

// exportando function module.exports.nome_function = function
module.exports.socketAddress = socketAddress
module.exports.socketStatus = socketStatus
