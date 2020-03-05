var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

var format = require('pg-format');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    console.log('here')
    next();
});
let connection = require('./db')
app.get('/', (req, res, next) => {
    res.send('Hello World');
})

app.post('/api/save-records', (req, res, next) => {
    if (req.body.Detections) {
        console.log('Called')
        let insertData = [];
        let timeStamp = req.body.Timestamp;
        let detections = req.body.Detections;
        let sourceId = req.body.SourceId;
        detections.forEach(detection => {
            insertData.push([timeStamp, detection.neutral, detection.happy, detection.sad,
                detection.angry, detection.fearful, detection.disgusted, detection.surprised, sourceId]);
        });
        console.log(insertData)
        if (insertData.length > 0) {
            const conn = connection();
            var sql = format('INSERT INTO EmotionHistory (Timestamp,neutral,happy,sad,angry,fearful,disgusted,surprised,Source) VALUES %L', insertData);
            console.log(sql);
            let result = conn.then((pool) => {
                return pool.query(sql);
            }).then(result => {
                console.log(result);
                res.send('Success').status(200);
            }).catch(err => {
                // ... error checks
                console.log(err);
                res.send('Error').status(500);
            })
            conn.close();
        }


    }
});

api.get('/api/sentiments-by-minute', (req, res, next) => {
    const conn = connection();
    var sql = format('INSERT INTO EmotionHistory (Timestamp,neutral,happy,sad,angry,fearful,disgusted,surprised,Source) VALUES %L', insertData);
    console.log(sql);

    res.send()
})
var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Example app listening at localhost port:%s", port);
})