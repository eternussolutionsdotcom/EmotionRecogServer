var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
let connection=require('./db')
app.get('/', (req, res,next)=> {
   res.send('Hello World');
})

app.post('/api/save-records',(req,res,next)=>{
    if(req.body.Detections){
        let insertData=[];
        let timeStamp=req.body.Timestamp;
        let detections=req.body.Detections;
        detections.forEach(detection => {
            insertData.push([timeStamp,detection.neutral,detection.happy,detection.sad,
                detection.angry,detection.fearful,detection.disgusted,detection.surprised]);
        });
        const pool=connection();
        var sql = "INSERT INTO EmotionHistory (Timestamp,neutral,happy,sad,angry,fearful,disgusted,surprised) VALUES ?";

        console.log(insertData)
    }
    
    res.send('Success')
})
var server = app.listen(8081, function () {
   var port = server.address().port;
   console.log("Example app listening at localhost port:%s", port);
})