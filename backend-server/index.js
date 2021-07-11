const webSocket = require('ws')
const server = new webSocket.Server({port:'8080'})
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

server.on('connection', socket => {
    socket.on('message', message => {
        console.log(message)
        socket.send('Gotcha!')
    })
    socket.send('hello, server here!');
    ask();
    function ask(){
        readline.question('Message: ', message => {
            socket.send(message);
            ask();
        })
    }
})