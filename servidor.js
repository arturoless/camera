const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const os = require('os')
var interfaces = os.networkInterfaces()
var wifi = interfaces['eth0']
if(wifi==null){
    wifi = interfaces['Wi-Fi']
    var ipv4 = wifi[1]
}
else{
    var ipv4 = wifi[0]
}
var HOST = ipv4['address']
const PORT = process.env.PORT || 3400
const INDEX = path.join(__dirname, 'index.html')
var cors = require('cors');
const server = express()
  .use(cors(),(req, res) => {
    return res.sendFile(INDEX);
  } )
  .listen(PORT, () => console.log(HOST+':'+PORT))
  

var io = socketIO(server)
io.on('connection', function(socket) {
    console.log("a user connected");
    socket.on('stream', function(stream) {
      console.log('hola')
      socket.emit('receiver', stream);
    });
    socket.on('disconnect', function () {
      console.log("user disconnected");
    });
  });
