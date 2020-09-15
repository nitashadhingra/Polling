var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// app config
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");


// mongoose/model config
const joiningLink = 'https://live.polling.com/vote';
var pollSchema = new mongoose.Schema({ 
    heading: String,
    question: String, 
    options: [{
        name: String,
        count: {type: Number, default: 0}
    }],
    url: {
        type: String,
        get: k => `${joiningLink}${k}`
    }
    // A: String, 
    // B: String, 
    // C: String, 
    // D: String
  });
var Poll = mongoose.model("Poll", pollSchema);



//     route   info about request made, respond with
app.get("/", function (req, res){
    res.render("index");
});

app.get("/polls/:id/vote/", function (req, res){
    Poll.findById(req.params.id, function(err, thisPoll){
        if(err){
            console.log(err);
        } else{
            console.log(thisPoll);
            res.render("join", {poll : thisPoll});
        }
    });
    
});

app.post("/update", function (req, res){

});

app.get("/polls/new", function (req, res){
    res.render("newpoll",{});    
});

app.post("/polls", function(req, res){
    console.log("printing" ,req.body);
    
    var newPoll = {
        heading: req.body.heading, 
        question: req.body.question, 
        options: req.body.op.map(yourOption => ({ name: yourOption, count: 0 }))
    };

    Poll.create(newPoll, function(err, polled){
        if(err){
            console.log(err);
        } else{
            console.log("added");
            console.log(polled);
            console.log(polled._id);
            Poll.findById(polled._id, function(err, thisPoll){
                if(err){
                    console.log(err);
                } else{
                    console.log(thisPoll);
                    res.render("result", {poll : thisPoll});
                }
            });
        }
    });
});

app.get("*", function (req, res){
    res.send("Invalid Link");
});

app.listen(8989, function(){
   console.log("Server started"); 
});