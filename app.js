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
app.use(express.json());
app.set("view engine", "ejs");


// mongoose/model config
const joiningLink = 'https://live.polling.com/vote';

var childSchema = new mongoose.Schema({
    
        // type: Map,
        // of: Number
        name: String,
        count: {type: Number, default: 0}
        // _id: True
    
});

var pollSchema = new mongoose.Schema({ 
    heading: String,
    question: String, 
    options: [childSchema],
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
    console.log("got a req " , req.body);
    Poll.findById(req.body.pollID, function(err, v){
        if(err){
            console.log(err);
        } else{
            console.log("found:" , v);
            var opt = req.body.voted;
            v.update({'options.name': opt}, 
                {$inc : {'options.$.count' : 1}}, function(err,model) {
                    if(err){
                     console.log(err);
                     return res.send(err);
                 }
                 return res.json(model);}
            )
            console.log("update:" , v);
            
            // for(var i=0 ; i < v.options.length ; i++){
            //     if(v.options[i] == req.params.voted){
                    
            //     }
            // }
            // v.options.findById(req.params.voted, function(error, result){
            //     if(error){
            //         console.log(error);
            //     } else{
            //         console.log("voted for" , result);
            //     }
            // });
            // v.options.findOneAndUpdate({_id: req.body.voted}, {$add: [ this.count, 1 ]$add: {friends: friend}});
            // console.log(v.options.findOne({ _id: req.body.voted }));

            // v.params.options.update(
            //     {"options.$._id": req.body.voted}, 
            //     {$inc: {"options.$.count": 1}});

            //     console.log("updated:" , v);
            //     if(er){
            //         console.log(er);
            //     } else{
            //         console.log("here's what i found" , upvote);
            //         // res.render("join", {poll : thisPoll});
            //     }
            // });
            res.render("join", {poll : v});
        }
    });
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

    
    // options: new opt{
    //     name: 
    // },

    // newPoll.insertMany(yourOption.map(function(opt){
        
    // }));
    // yourOption.forEach(function(opt){
    //     console.log(opt);
    //     newPoll.options.set(opt, 0);
    //     var optn = {"name": opt, "count": 0};
    //     Poll.findOneAndUpdate({name: req.body.pollID}, {$push: {friends: friend}});
    // });

    
});

app.get("*", function (req, res){
    res.send("Invalid Link");
});

app.listen(8989, function(){
   console.log("Server started"); 
});