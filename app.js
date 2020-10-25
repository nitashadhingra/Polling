const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

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

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

const childSchema = new mongoose.Schema({
        name: String,
        count: {type: Number, default: 0}
});

const pollSchema = new mongoose.Schema({ 
    heading: String,
    question: String, 
    options: [childSchema],
    // url: {
    //     type: String,
    //     get: k => `${joiningLink}${k}`
    // }
  });

const Poll = mongoose.model("Poll", pollSchema);

//     route   info about request made, respond with
app.get("/", function (req, res){
    res.render("index");
});

app.get("/polls/:id/vote/", async (req, res) => {
    const thisPoll = await Poll.findById(req.params.id);
    console.log(thisPoll);
    res.render("join", {poll : thisPoll});    
});

app.post("/update", (req, res) => {
    console.log("got a req " , req.body);

    Poll.findById(req.body.pollID, function(err, v){
        if(err){
            console.log(err);
        } else{
            console.log("found:" , v);
            v.options.find(polled => polled.name === req.body.voted).count++;
            v.save();
            console.log(v);
        }
    });
});

app.get("/polls/new", (req, res) => {
    res.render("newpoll",{});    
});

app.post("/polls", async (req, res) => {
    console.log("printing" ,req.body);
    
    const newPoll = {
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
   console.log("Server started, listening on port 8989"); 
});