const socket = io()


socket.on('conectado', (mensaje)=>{
console.log(mensaje)

socket.disconnect()
})