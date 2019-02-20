var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
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
var port = process.env.port || 3000;
var HOST = ipv4['address']
app.use(express.static(__dirname + "/public" ))
app.get('/',function(req,res){
res.redirect('index.html');
});
 
 
io.on('connection',function(socket){
 
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);  
    });
 
});
 
http.listen(port,function(){
console.log(HOST+':'+port)
});