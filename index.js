const express = require("express")
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = 8000

http.listen(porta, function(){
    console.log('servidor iniciado. abra o navegador em http://localhost:'+ porta);
})

app.get('/', function(req, resp){
    resp.sendFile(__dirname + '/index.html')
})

serverSocket.on('connection', function(socket){
    

    socket.on('login', function(nickname){
        console.log(`cliente conectado ${nickname}`)
        serverSocket.emit('chat msg',`Usuário ${nickname} conectou.`)
        socket.nickname = nickname
    })

    socket.on('chat msg', function(msg){
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`)
        serverSocket.emit('chat msg', `${socket.nickname}: ${msg}`)  
    })

    socket.on('status', function(msg){
        socket.broadcast.emit('status', msg)
    })
})