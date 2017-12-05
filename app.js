const express = require('express')
const app = express();
const path = require('path');

const https = require('https');

const PORT = process.env.PORT || 4200;
const configurationUrl = process.env.configurationUrl || 'https://j6f6mqtypk.execute-api.us-west-2.amazonaws.com/local/clincx/v1/admin/config';
const context = process.env.context || '';

app.use(express.static('ghxmoniter'));

app.get('/configuration', function (req, res) {
    https.get(configurationUrl, (resp) => {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            res.send(JSON.parse(chunk));
        });
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/ghxmoniter/index.html'));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

console.log('environment', process.env.environment, process.env.context, configurationUrl)
module.exports = app; 