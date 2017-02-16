var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write('testing...' + '\n' + '\n');
  res.end(new Date() + '\n');
  
}).listen(port);
var d = Date();
var fs = require('fs');
var dFileStamp = Date().toString("yyyyMMddHHmmss");

fs.writeFile(dFileStamp + ".txt", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});


console.log('Server running on port %s', port);

