const config = require('./config/config');
const mongoose = require('./config/mongoose')(config);
const express = require('express');
var Attendee = require('mongoose').model('Attendee');
var Workshop = require('mongoose').model('Workshop');
var Code = require('mongoose').model('Code');
var app = express();
require('./config/express')(app);

var codes = ["r9kqSv",
"8rrtWx",
"TTupyw",
"WQHeKE",
"29MmLV",
"xQa9Nx",
"TkPvy7",
"Aewahv",
"7siytc",
"jdKY3H",
"3cam36",
"igSX7M",
"Ntr4go",
"zNmgxR",
"XB7Snb",
"B9aSti",
"wXfaRA",
"oiMruU",
"4KYmgK",
"ijWNCf",
"GHeRS7",
"phcSth",
"a4wEcy",
"NNkDTE",
"vWdX5o",
"rMSows",
"r22L7L",
"ez238o",
"TjxJKD",
"5RLf6u",
"VZjoFx",
"LjDpMV",
"A9jHH6",
"gHPgQW",
"F9zYDu",
"fdktbC",
"2PH3iT",
"XZpHUp",
"TmyXsQ",
"Yb9BLM",
"Ma6RJa",
"X2SHVo",
"BeWwtM",
"NJKsei",
"vHjCLC",
"oLqSrM",
"aoXiuo",
"3Cg63v",
"HFx7SR",
"U4kkgB",
"tA3YyT",
"vgdLpQ",
"kTKyqd",
"YxAnvY",
"ZhXX4J",
"5sPCtf",
"c56gwp",
"SAyAfN",
"o2B2G3",
"zjxq4w",
"uho3go",
"p2YvNf",
"qbwDUT",
"Xz2LoF",
"wzRpA7",
"bxKQCU",
"gubYLq",
"75HQty",
"QWuBHj",
"TXcXYd",
"d3tHgT",
"TyCgtp",
"88yCwK",
"vQ7mqc",
"Hukeo2",
"nqo4gm",
"6moQXX",
"et7Za6",
"gdQkwX",
"LzuqtB",
"LqPE33",
"aNsVcY",
"5sp3gf",
"hYFT3i",
"Tyr9oh",
"P63LyH",
"BsmknL",
"Bi95WF",
"kKhL8R",
"Rbjht5",
"ouxEVf",
"e4vYb5",
"LxXTv3",
"myvNcj",
"hM9qzR",
"anau4d",
"fVaRNs",
"dQqTDJ",
"s5Mq3G",
"4XwiDL",
"tZXC8x",
"HeuEen",
"DBEYZj",
"rNSRCj",
"9oourY",
"QB7Pb5",
"bv75Ky",
"SnpqF2",
"44J2mo",
"Zfcdwr",
"82mCGT",
"x6J8CD",
"wSYUUi",
"AWBucN",
"EwkHuX",
"kqGg9n",
"woqHAf",
"HdriK2",
"bMgMXJ",
"rVvVe5",
"pwLRhi",
"pQy6gu",
"sRTq3Z",
"tzTPSD",
"EgCLoT",
"PJjQ75",
"RebPAX",
"KLdNTi",
"Gz6xxh",
"2TCd5F",
"4QRKez",
"DqCY44",
"QKPRUa",
"mLGwqL",
"Ea8kS5",
"epW78i",
"W9Zyy2",
"vtEzAf",
"pgCGtE",
"za3FpH",
"kGhf4y",
"K33zNA",
"GB9D5R",
"3ffAfq",
"y47BMS",
"Eo2Z56",
"cUviZJ",
"5j8hk9",
"k4u3zC",
"h4EpkE",
"zaKwKt",
"CvpWV9",
"MeVgvH",
"AEfnDi",
"KpfvHq",
"jXNAKS",
"9juqiU",
"TEbXpK",
"XAt7H7",
"H9rZZr",
"D3vqvz",
"iyFRyy",
"mpvbz2",
"hnJnHP",
"P74Z7U",
"4GGAuU",
"kFJ7WZ",
"JD6PSi",
"ojWpbG",
"MdtvY5",
"xi6H9V",
"FppfjT",
"urH7wX",
"CwhUKo",
"uqWwoU",
"XHZFFE",
"JNAyNE",
"yJLVfC",
"6bxgav",
"pcbMrL",
"Tuu6nv",
"8qzRao",
"b7EC2q",
"CpDRhs",
"pAu3ZB",
"GF6u5J",
"SgyiKr",
"FpbHag",
"t5xwYF",
"rFMmqJ",
"29NUyQ",
"76fiLu",
"94ioMg",
"xx6TeZ",
"W8BnDi",
"dB7G3Q",
"Pv2Qgn",
"mec2wT",
"nhVJjV",
"au662i",
"hYb8cA",
"ajN7fy",
"qFsHXT",
"NL3Nw3",
"6tVZ5y",
"3yc9bV",
"rQGbv3",
"Jj4J6X",
"Z4g2YZ",
"ESkbdN",
"hTc4rk",
"GknhZP",
"nuDqCa",
"kpN6KA",
"Amfcuo",
"xHoB5X",
"8NQ3mC",
"GY3JWd",
"3RUVJW",
"sqR6Xh"]

function seedCodes(){
  codes.forEach(function(code){
    Code.create({code: code}, function(err, code){
      console.log("Created code " + code);
    })
  })
}

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
})

app.get('*', checkCookies, function(req, res){
  //Render default view
  codes.forEach(function(code){
    Code.create({code: code}, function(err, code){
      if(err) console.log(err);
      else console.log("Created code " + code);
    })
  })
})

var server = app.listen(config.port);
