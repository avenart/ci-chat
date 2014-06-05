var mysql = require('mysql')
var PHPUnserialize = require('php-unserialize');
var io = require('socket.io').listen(3000)

console.log('Server listening at http://localhost:3000/')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
})
 
db.connect(function(err){
    if (err) console.log(err)
})
 
var notes = []
var usernames = []
var isInitNotes = false
var socketCount = 0
var user_id
var username

function parseCookies(request){
        var result={};
        request.split(/;\s+/).forEach(function(e){
            var parts=e.split(/=/,2);
            result[parts[0]]=parts[1]||'';
        });
        sessionCookieName='ci_session',
        sessionId=result[sessionCookieName]||'';
        return sessionId;
    }

io.sockets.on('connection', function(socket){
    var rcookie = socket.handshake.headers['cookie'];
    var cookies = parseCookies(rcookie)
    var cookies = unescape(cookies)
    var session = PHPUnserialize.unserialize(cookies)

    db.query('SELECT * FROM ci_sessions WHERE session_id="' + session.session_id + '" LIMIT 1')
        .on('result', function(data) {
            var userdata = PHPUnserialize.unserialize(data.user_data)
            user_id = userdata.user_id
            socket.user_id = user_id
            username = userdata.username
            socket.username = username
        })
   
    socketCount++
    io.sockets.emit('users connected', socketCount)
 
    socket.on('disconnect', function() {
        socketCount--
        io.sockets.emit('users connected', socketCount)
    })
 
    socket.on('new note', function(data){
        var sendDate = Math.round((new Date()).getTime() / 1000)
        var post = {user_id: socket.user_id, message: data.message, created_at: sendDate}
        var data = {user_id: socket.user_id, username: socket.username, message: data.message, created_at: sendDate}
        notes.push(data)
        io.sockets.emit('new note', data)
        db.query('INSERT INTO messages SET ?', post)
        console.log(data)
    })
 
    // Check to see if initial query/notes are set
    if (! isInitNotes) {
        // Initial app start, run db query
        db.query('SELECT messages.*,users.username FROM messages LEFT JOIN users ON messages.user_id = users.id')
            .on('result', function(data){
                // Push results onto the notes array
                notes.push(data)
                // console.log(data)
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('initial notes', notes)
            })
 
        isInitNotes = true
    } else {
        // Initial notes already exist, send out
        socket.emit('initial notes', notes)
        // console.log(notes)
    }

})
