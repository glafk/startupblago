const config = require('./config/config');
const mongoose = require('./config/mongoose')(config);
const express = require('express');
var Attendee = require('mongoose').model('Attendee');
var Workshop = require('mongoose').model('Workshop');
var Code = require('mongoose').model('Code');
var Presenter = require('mongoose').model('Presenter');

var app = express();


//Get all workshops data
app.get('/workshop', function (req, res) {
    Workshop.find({}).exec(function (err, workshops) {
      if(err){
        res.status(400);
      }
      else{
        res.send(workshops);
      }
    })
});

//Get all speakers
app.get('/speakers', function (req, res) {
  Presenter.find({}).exec(function (err, speakers) {
    if(err){
      res.status(400);
    }
    else{
      res.send(speakers);
    }
  })
});

//Register attendee
app.post('/attendee', function (req, res) {
    //Check if code is valid
    Code.findOne({code: req.body.code}).exec(function (err, code) {
      if(err){
        res.status(400);
      }
      else{
        if(!!code){
            Attendee.create(req.body, function (err, attendee) {
              if(err){
                res.status(400).send("Error");
              }
              else{
                res.send(attendee.code);
              }
            })
          }
        else{
            res.error("Code supplied is not valid");
          }
        }
    })
});

//Sign up for workshop
app.post('/workshop', function (req, res) {
  Workshop.find({id: req.body.workshopId}, function (err, workshop) {
    if(err){
      res.status(400).send();
    }
    else {
      if(!!workshop){
        workshop.addAttendee(req.body.code, function(success){
          if(success){
            req.send(true);
          }
          else req.send(false);
        })
      }
      else{
        res.status(400).send("Workshop not found");
      }
    }
  })
});

app.delete('/workshop', function(req, res){
  Workshop.find({id: req.body.workshopId}, function (err, workshop) {
    if(err){
      res.status(400).send();
    }
    else {
      if(!!workshop){
        workshop.removeAttendee(req.body.code, function(success){
          if(success){
            req.send(true);
          }
          else req.send(false);
        })
      }
      else{
        res.status(400).send("Workshop not found");
      }
    }
  })
});

app.get('*', function(req, res){
  res.send("KZO");
})

var server = app.listen(config.port);
