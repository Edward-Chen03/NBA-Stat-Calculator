// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-1'});

// Create DynamoDB service object
var ddb = new AWS.DynamoDB();

var params = {
  TableName: 'Players',
};

ddb.scan(params, function test(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(data);
  }

});


