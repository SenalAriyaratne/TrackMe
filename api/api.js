const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

//mongoose.connect('mongodb+srv://Senal:test1234@sit209-yaf69.mongodb.net/test');
const Device = require('./models/device');
const User = require('./models/user');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
//const port = 5000;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});
app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (err == true) {
            return res.send(err);
        } else {
            return res.send(devices);
        }

    });
});
/*
app.post('/api/devices', (req, res) => {
    console.log(req.body);
  
});*/
app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    });

});

app.post('/api/send-command', (req, res) => {
    console.log(req.body);

});

app.post('/api/authenticate', (req,res) => {
    const {name,password} = req.body;
    

    
})
