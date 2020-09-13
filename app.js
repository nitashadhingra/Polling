var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var pollSchema = new mongoose.Schema({ 
    heading: String,
    question: String, 
    
    A: String, 
    B: String, 
    C: String, 
    D: String
  });
var Poll = mongoose.model("Poll", pollSchema);


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");


//         heading: "PREFERRED BRAND",
//         question: "Pick your brand for shoes", 
//         A: "Nike", 
//         B: "Puma", 
//         C: "Reebok", 
//         D: "Adidas"


//     route   info about request made, respond with
app.get("/", function (req, res){
    res.render("index");
});

// app.get("/poll/:id/vote/", function (req, res){
// app.get("/polls", function (req, res){
    // console.log(req);
    // var heading = req.params.name;
    // Poll.findById(req.params.id, function(err, thisPoll){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         res.render("/poll/:id/result/", {poll : thisPoll});
    //     }
    // });
    // Poll.find({}, function (err, allPolls){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log("showing all..");
    //         res.render("join", {polls: allPolls});
    //     }
    // });
    // res.send("choose options");
    // for(var i=0 ; i<Number(req.params.id) ; i++)
    //     message += req.params.name + " ";
    
// });

app.get("/polls/:id/vote/", function (req, res){
// app.get("/polls", function (req, res){
        // console.log(req.params);
        // var heading = req.params.name;
        Poll.findById(req.params.id, function(err, thisPoll){
            if(err){
                console.log(err);
            } else{
                console.log(thisPoll);
                res.render("join", {poll : thisPoll});
            }
        });
        
    });

app.get("/polls/new", function (req, res){
    res.render("newpoll");
});

app.post("/polls", function(req, res){
    console.log("printing" ,req.body);
    var newPoll = req.body;
    Poll.create(newPoll, function(err, polled){
        if(err){
            console.log(err);
        } else{
            console.log("added");
            console.log(polled);
            console.log(polled._id);
            // res.redirect("/polls", key: polled._id);
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
    // res.redirect("/poll/:id/vote/:name/");
});

app.get("*", function (req, res){
    res.send("Invalid Link");
});

app.listen(8989, function(){
   console.log("Server started"); 
});