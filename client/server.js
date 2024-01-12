
//const { ddb } = require('./init'); 
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
import AWS from 'aws-sdk';
import express from 'express';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
AWS.config.update({ region: 'us-east-1' });

const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());
const port = 3000;

var ddb = new AWS.DynamoDB.DocumentClient();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, ), {extensions: ["js"]}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.post('/basictable', (req, res) => {
  
  const params = {
    TableName: 'Test',
    ProjectionExpression: '#n, Team, PTS, TRB, AST', 
    ExpressionAttributeNames: {
      '#n': 'name',
    },
  };
  
  ddb.scan(params, (err, data) => {
    if(err){
      console.error("Error scanning!", err);
      res.status(500).send("Internal Error");
    }else{
      res.json(data.Items);
    }
  
  })

});

app.post('/calculate', (req, res) => {
  const { name, calculate } = req.body;
  const params = {
    TableName: 'Test',
    Key: {
      'id': 47,
      'name': name,
    }
  };
  ddb.get(params, (err, data) => {
    if (err) {
      console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      const retrievedItem = data.Item;
      let result;

      switch (calculate) {
        case "TS%":
          result = retrievedItem.PTS / (2 * (Number(retrievedItem.FGA) + (0.44 * Number(retrievedItem.FTA)))) * 100;
          break;

        default:
          return res.status(400).json({ error: 'Invalid' });
      }
      res.json({ result });
    }


  });

});






//create multiple tables and base them on formula