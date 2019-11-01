var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');


var indexRouter = require('./routes/index');
var sendEditorData = require('./routes/sendEditorData');
var getUserId = require('./routes/getUserId');

var app = express();
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var editorSocket = io.of("/editorDataSocket")

editorSocket.on('connection', (sock) => {
  sock.on("changeEditor", (dat) => {
    console.log("A new user has entered the room!")
    console.log(dat)
  })
})


app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/', indexRouter);
app.use('/api/sendEditorData', sendEditorData);
app.use('/api/getUserId', getUserId)
console.log('Express started. Listening on port', process.env.PORT || 5000);
// app.listen(process.env.PORT || 5000);
server.listen(process.env.PORT || 5000)
// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


io.on('connection', () => {
  console.log('a user is connected')
})



module.exports = app;
