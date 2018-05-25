var express =  require('express');
var bodyparser = require('body-parser');
var app = express();

var server = require('http').createServer(app);
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

var port = process.env.PORT || 5000;

server.on('connection', function(socket) {
    console.log('클라이언트 정보 - ip : %s, port : %d', socket.remoteAddress, socket.remotePort);
});

server.on('request',function (req) {
    //console.log('클라이언트로부터 요청들어옴',req);
});

server.listen(port, function () {
    console.log('5000 포트 시작~');
});

global.motor = null
//@@모터제어1
//var motor;
app.post('/post',function (req,res) {
    motor = req.body;
    res.json(req.body);
    console.log("receive motor1 data->",req.body);
});

app.get('/post',function (req,res) {
    console.log("receive motor1 data->",motor);
    res.json(motor);
    motor = {"rsl":"stop"};
});

global.motor2 = null;
//@@모터제어2
//var motor2;
app.post('/post1',function (req,res) {
    motor2 = req.body;
    res.json(req.body);
    console.log("receive motor2 data->",req.body);
});

app.get('/post1',function (req,res) {
    console.log("receive motor2 data->",motor2);
    res.json(motor2);
    motor2 = {"rsl":"stop"};
});

//
// global.detect = null;
// //var detect;
// app.post('/detect',function (req,res) {
//     detect = req.body;
//     res.json(detect);
//     console.log('움직임',req.body);
// });
//
// app.get('/detect',function (req,res) {
//     res.json(detect);
//     console.log(detect);
// });


//@@알람
global.alarm = null;
//var alarm;
app.post('/alarm',function (req,res) {
    alarm = req.body;
    res.json(req.body);
    console.log("android receive alarm ->",req.body);
});

app.get('/alarm',function (req,res) {
    console.log('pi alarm',alarm);
    res.json(alarm);
    alarm = {"alarm":"noalarm"};
});

global.exit = null;
//@@파이 프로세스 죽이기
//var exit;
app.post('/exit',function (req,res) {
    exit = req.body;
    res.json(req.body);
    console.log("receive PI Kill data->",req.body);
});

app.get('/exit',function (req,res) {
    console.log("send PI Kill data->",exit);
    res.json(exit);
    exit = {"exit":"noexit"};
});
