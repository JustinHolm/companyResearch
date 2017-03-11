
 var azure = require('azure-storage');
 var uuid = require('node-uuid');
 var nconf = require('nconf');
 nconf.env()
      .file({ file: 'config.json', search: true });
 var tableName = nconf.get("TABLE_NAME");
 var partitionKey = nconf.get("PARTITION_KEY");
 var accountName = nconf.get("STORAGE_NAME");
 var accountKey = nconf.get("STORAGE_KEY");
//var x = require('createTable.js');

var tableSvc = azure.createTableService(accountName,accountKey);
//x.tableSvc().insertEntity


console.log("Create Table");

tableSvc.createTableIfNotExists('mytable', function(error, result, response){
  if(!error){
    console.log("Table Created");
  }
});

var entGen = azure.TableUtilities.entityGenerator;
var task = {
  PartitionKey: entGen.String('hometasks'),
  RowKey: entGen.String('1'),
  description: entGen.String('take out the trash'),
  dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
};

tableSvc.insertEntity('mytable',task, function (error, result, response) {
  if(!error){
    // Entity inserted
  }
});


var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 var TaskList = require('./routes/tasklist');
 var Task = require('./models/task');
 var task = new Task(azure.createTableService(accountName, accountKey), tableName, partitionKey);
 var taskList = new TaskList(task);

 app.get('/', taskList.showTasks.bind(taskList));
 app.post('/addtask', taskList.addTask.bind(taskList));
 app.post('/completetask', taskList.completeTask.bind(taskList));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
