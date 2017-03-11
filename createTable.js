var azure = require('azure-storage');
var nconf = require('nconf');

 nconf.env()
      .file({ file: 'config.json', search: true });

 var tableName = nconf.get("TABLE_NAME");
 var partitionKey = nconf.get("PARTITION_KEY");
 var accountName = nconf.get("STORAGE_NAME");
 var accountKey = nconf.get("STORAGE_KEY");
 
 var tableSvc = azure.createTableService(accountName,accountKey);
 
 exports.tableSvc= function(){
      return tableSvc;
 }
   
  
 