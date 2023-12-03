
const AWS = require('aws-sdk');
const fs = require('fs');
const readline = require('readline');
AWS.config.update({ region: 'us-east-1' });

var ddb = new AWS.DynamoDB.DocumentClient();

const csvFilePath = 'db/2023-2024 NBA Player Stats - Regular.csv';

const readStream = readline.createInterface({
    input: fs.createReadStream(csvFilePath),
});

readStream.on('line', (line) => {

    const info = line.split(';');

    const params = {
        TableName: 'Test',
        Item: {
            'id': Number(info[0]),
            'name': info[1],
            'Pos': info[2],
            'Age': info[3], 
            'Team': info[4], // Team Played for
            'Games Played': info[5], // Games Played
            'Games Started': info[6], // Games Started
            'MP': info[7],      // Minutes played per game
            'FG': info[8],      // Field goals per game
            'FGA': info[9],     // Field goal attempts per game
            'FG%': info[10],    // Field goal percentage
            '3P': info[11],     // 3-point field goals per game
            '3PA': info[12],    // 3-point field goal attempts per game
            '3P%': info[13],    // 3-point field goal percentage
            '2P': info[14],     // 2-point field goals per game
            '2PA': info[15],    // 2-point field goal attempts per game
            '2P%': info[16],    // 2-point field goal percentage
            'eFG%': info[17],   // Effective field goal percentage
            'FT': info[18],     // Free throws per game
            'FTA': info[19],    // Free throw attempts per game
            'FT%': info[20],    // Free throw percentage
            'ORB': info[21],    // Offensive rebounds per game
            'DRB': info[22],    // Defensive rebounds per game
            'TRB': info[23],    // Total rebounds per game
            'AST': info[24],    // Assists per game
            'STL': info[25],    // Steals per game
            'BLK': info[26],    // Blocks per game
            'TOV': info[27],    // Turnovers per game
            'PF': info[28],     // Personal fouls per game
            'PTS': info[29],    // Points per game
          },
    };

    ddb.put(params, (err, data) => {
        if (err) {
           console.log("Error", err);
        } else {
         console.log("Success", data);
        }
    });

});

readStream.on('close', () => {
    console.log('Finished reading CSV file.');
});

module.exports = { ddb };
