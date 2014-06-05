$(document).ready(function(){

    var socket = io.connect('http://localhost:3000');
 
    // Initial set of notes, loop through and add to list
    socket.on('initial notes', function(data){
        var html = ''
        for (var i = 0; i < data.length; i++){
            // We store html as a var then add to DOM after for efficiency
          
            html += '<li class="list-group-item"><span class="user">' + data[i].username + ':</span><span class="badge">' + formattedTime(data[i].created_at) + '</span> ' + data[i].message + '</li>'
        }
        $('#notes').html(html)
        $('.holder').scrollTop($('.holder')[0].scrollHeight)
    })
 
    // New note emitted, add it to our list of current notes
    socket.on('new note', function(data){
        $('#notes').append('<li class="list-group-item"><span class="user">' + data.username + ':</span><span class="badge">' + formattedTime(data.created_at) + '</span> ' + data.message + '</li>')
        $('.holder').scrollTop($('.holder')[0].scrollHeight)
    })
 
    // New socket connected, display new count on page
    socket.on('users connected', function(data){
        $('#usersConnected').html('Users connected: ' + data)
    })
 
    // Add a new (random) note, emit to server to let others know
    $('form#chat').submit(function(){

        var newNote = $('#content').val()
        
        if(newNote) {
        socket.emit('new note', {message: newNote})
        $('#content').val('')
      } else {
        $('.alert').text('You\'ve gotta say something!')
        $('.alert').removeClass('hidden')
        $('.alert').delay(2000).fadeOut(function(){ $(this).empty().show().addClass('hidden');  });
      }
      return false;
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
