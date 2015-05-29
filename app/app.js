/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_7
 * by Diane Zevenbergen
 */

var express = require('express'); 
var mongoose = require('mongoose'); 
var app = express();  
var bodyParser = require('body-parser');
var truckRoutes = require('./routes/truckRoutes');


var db = mongoose.connect('mongodb://localhost/foodTruckAPI');

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/trucks', truckRoutes); 

app.listen(port, function() {
    console.log('listening on port ', port);
});
