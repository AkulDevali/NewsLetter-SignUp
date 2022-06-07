// jshint esversion:6
const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName= req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/13aa98d473";
  const options ={
    method: "POST",
    auth: "akul:1396233eae91398e0f6362595f88414d-us12"
  };

  const request=https.request(url,options,function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    } else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
});


// 1396233eae91398e0f6362595f88414d-us12
// 13aa98d473
