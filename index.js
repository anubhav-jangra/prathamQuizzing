var express = require('express');
const app     = express();

app.set('port', (process.env.PORT || 4000));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/links'));
app.use(express.static(__dirname +  '/css'));
app.use(express.static(__dirname +  '/js'));

app.get('/', function(req, res) {
    res.sendFile(index.html);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
