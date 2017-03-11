var req = require("request");

var u = "https://yahoo.com";
console.log("HEAD %s", u);

req.head(u, function (e,r,b) { 
   if (e)
     throw e;

   console.log("statusCode: ", r.statusCode);
});