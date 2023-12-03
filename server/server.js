

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

app.get('/get-data/:id', (req, res) => {
  const { name } = req.params;

  const params = {
    TableName: 'Test',
    Key: {
      'name': name,
    },
  };

  ddb.get(params, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ error: 'Error fetching data from DynamoDB' });
    } else {
      console.log("Success", data);
      res.json(data.Item);
    }
  });
});

app.post('/put-data', express.json(), (req, res) => {
  const { id, name, Pos, Age, Team, GamesPlayed, GamesStarted, MP, FG, FGA, FGPercent, ThreePoint, ThreePointAttempts, ThreePointPercent, TwoPoint, TwoPointAttempts, TwoPointPercent, effectiveField, FreeThrows, FreeThrowsAttempts, FreeThrowPercent, ORebound, DRebound, TRebound, Assists, Steals, Blocks, Turnovers, PersonalF, Points} = req.body;
  
  const params = {
    TableName: 'Test',
    Item: {
      'id': id,
      'name': name,
      'Pos': Pos,
      'Age': Age,
      'Team': Team,
      'Games Played': GamesPlayed,
      'Games Started': GamesStarted,
      'MP': MP,
      'FG': FG,
      'FGA': FGA,
      'FG%': FGPercent,
      '3P': ThreePoint,     
      '3PA': ThreePointAttempts,   
      '3P%': ThreePointPercent,    
      '2P': TwoPoint,     
      '2PA': TwoPointAttempts,    
      '2P%': TwoPointPercent,    
      'eFG%': effectiveField,   
      'FT': FreeThrows,     
      'FTA': FreeThrowsAttempts,    
      'FT%': FreeThrowPercent,    
      'ORB': ORebound,    
      'DRB': DRebound,    
      'TRB': TRebound,    
      'AST': Assists,   
      'STL': Steals,    
      'BLK': Blocks,    
      'TOV': Turnovers,    
      'PF': PersonalF,     
      'PTS': Points,    
    },
  };

  ddb.put(params, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ error: 'Error inserting data into DynamoDB' });
    } else {
      console.log("Success", data);
      res.json({ success: true });
    }
  });
});