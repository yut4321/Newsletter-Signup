//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get ('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){
  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url:'https://us3.api.mailchimp.com/3.0/lists/1723162f0b',
    method: 'POST',
    headers: {
      'Authorization':'Nico1 365a70751215dfd41327bccb762e743f-us3'
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname + '/failure.html');
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + '/success.html');
      }else{
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });
});


app.post('/', function(req, res){
  res.redirect('/');
})

app.listen(3000, function(){
  console.log('Server is running on port 3000');
});


// 365a70751215dfd41327bccb762e743f-us3

// 1723162f0b
