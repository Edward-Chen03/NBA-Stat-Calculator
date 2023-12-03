

//const { ddb } = require('./init'); 
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
const AWS = require('aws-sdk');
const express = require('express');
const fs = require('fs');
const readline = require('readline');
AWS.config.update({ region: 'us-east-1' });

const app = express();
const port = 3000;

var ddb = new AWS.DynamoDB.DocumentClient();
var params = {
  TableName: 'Test',
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});