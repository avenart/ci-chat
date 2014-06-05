$(document).ready(function(){

    var socket = io.connect('http://192.166.218.61:3000');
 
    // Initial set of notes, loop through and add to list
    socket.on('initial notes', function(data){
        var html = ''
        for (var i = 0; i < data.length; i++){
            // We store html as a var then add to DOM after for efficiency
          
            html += '<li class="list-group-item"><span class="user">' + data[i].username + ': </span><span class="badge">' + formattedTime(data[i].created_at) + '</span>' + data[i].message + '</li>'
        }
        $('#notes').html(html)
    })
 
    // New note emitted, add it to our list of current notes
    socket.on('new note', function(data){
        var username = $('#username').val()
        $('#notes').append('<li class="list-group-item"><span class="user">' + username + ': </span><span class="badge">' + formattedTime(data.created_at) + '</span>' + data.message + '</li>')
    })
 
    // New socket connected, display new count on page
    socket.on('users connected', function(data){
        $('#usersConnected').html('Users connected: ' + data)
    })
 
    // Add a new (random) note, emit to server to let others know
    $('#newNote').click(function(){

        var newNote = $('#content').val()
        var user = $('#uid').val()
        if(newNote) {
        socket.emit('new note', {message: newNote, user_id: user})
        $('#content').val('')
      } else {
        alert('Fill the content!');
      }
    })
})

      function formattedTime(unixtmps)
      {
           var date = new Date(unixtmps*1000);
           var hours = date.getHours();
           if(hours < 10) { hours = '0' + hours }
           var minutes = date.getMinutes();
           if(minutes < 10) { minutes = '0' + minutes }
           var seconds = date.getSeconds();
           if(seconds < 10) { seconds = '0' + seconds }
           return hours + ':' + minutes + ':' + seconds;
      }
