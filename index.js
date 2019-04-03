const config = require('./config/config');
const mongoose = require('./config/mongoose')(config);
const express = require('express');
var Attendee = require('mongoose').model('Attendee');
var Workshop = require('mongoose').model('Workshop');
var Code = require('mongoose').model('Code');
var app = express();
require('./config/express')(app);

function checkCookies(req, res, next){
  if(req.cookies.code){
    Attendee.findOne({code: req.cookies.code}).exec(function(err, att){
      if(err) res.status(400).send();
      else{
        if(!!att){
          req.user = att;
          next();
        }
      }
    })
  }
  else next();
}

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

//Register attendee
app.post('/attendee', function (req, res) {
    //Check if code is valid
    Code.findOne({code: req.body.code}).exec(function (err, code) {
      if(err){
        console.log(err);
        res.status(400).send("Invalid code");
      }
      else{
        if(!!code){
          //Check if somebody has registred with this code
          Attendee.findOne({code: code.code}).exec(function(err, attendee){
            if(err){
              console.log(err);
              res.status(400).send();
            }
            else{
              if(!!attendee){
                if(attendee.email != req.body.email){
                  res.status(400).send("Code is already in use by another person.");
                }
                else {
                  console.log("log in again");
                  res.cookie("code", attendee.code, {expires: new Date(Date.now() + 604800000)})
                  res.send(attendee);
                }
              }
              else{

                //Register new attendee
                Attendee.create(req.body, function (err, attendee) {
                  if(err){
                    console.log(err);
                    res.status(400).send("Error");
                  }
                  else{
                    res.cookie("code", attendee.code, {expires: new Date(Date.now() + 604800000)})
                    res.send(attendee);
                  }
                })

              }
            }
          })
        }
        else{
            res.status(400).send("Code supplied is not valid");
          }
        }
    })
});

//Sign up for workshop
app.post('/workshop', function (req, res) {
  Workshop.findOne({_id: req.body.workshopId}, function (err, workshop) {
    if(err){
      res.status(400).send();
    }
    else {
      if(!!workshop){
        if(workshop.attendees.find(x => x.code == req.body.code)) res.send("You have already signed up");
        if(workshop.attendees.length < workshop.capacity){
          workshop.attendees.push({name: req.body.name, email: req.body.email, code: req.body.code});
          workshop.save(function (err) {
            if(!err) res.send(true);
            else res.status(400).send(false);
          })
        }
        else res.status(400).send("Full capacity");
      }
      else{
        res.status(400).send("Workshop not found");
      }
    }
  })
});

app.post('/signout', function(req, res){
  Workshop.findOne({_id: req.body.workshopId}, function (err, workshop) {
    if(err){
      res.status(400).send();
    }
    else {
      if(!!workshop){
        console.log("Finding index");
        var indexOfAttendee = workshop.attendees.map(function(attendee){return attendee.code}).indexOf(req.body.code);
        console.log(indexOfAttendee);
        if(indexOfAttendee > -1){
          workshop.attendees.splice(indexOfAttendee, 1);
          workshop.save(function (err) {
            if(!err) res.send(true);
            else res.status(400).send(false);
          })
        }
      }
      else{
        res.status(400).send("Workshop not found");
      }
    }
  })
});

app.get('/partials/:partialName', function (req, res) {
	res.render('../public/partials/'+ req.params.partialName);
});

app.get('*', checkCookies, function(req, res){
  //Render default view
  res.render('index', {user: req.user});
})

var server = app.listen(config.port);
