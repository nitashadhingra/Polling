var tiles = 6;
var options = [];
var squares = document.getElementsByClassName("option");
var ques = document.querySelector("h2");
var message = document.querySelector("span");
var pickedClr = pickColor();
var lvl = document.querySelectorAll(".levels");
var reset = document.querySelector("button");

init();
function init(){
    for(var i=0 ; i<squares.length ; i++){
        squares[i].style.backgroundColor = options[i];
    }
    for(var i=0 ; i<lvl.length ; i++){
        lvl[i].addEventListener("click", function(){
            lvl[0].classList.remove("selected");
            lvl[1].classList.remove("selected");
            this.classList.add("selected");
                
            if(this.textContent == "Easy"){
                tiles = 3;
            }
            else{
                tiles = 6;
            }
            redo();
        });
    }
    for(var i=0 ; i<squares.length ; i++){
        squares[i].addEventListener("click", function(){
            var chose = this.style.backgroundColor;
            // console.log(chose + " " + pickedClr);
            if(chose === pickedClr){
                // alert("Correct");
                for(var j=0 ; j<squares.length ; j++)
                    squares[j].style.backgroundColor = pickedClr;
                message.textContent = "Waiting for others...";
                document.querySelector("h1").style.backgroundColor = pickedClr;
            } else{
                this.style.backgroundColor = "#31302c";
                message.textContent = "Try again";
            }
        });
    }
    redo();
}

function chooseColor(n){
    var arr = [];
    for(var i=0  ; i<n ; i++)
        arr.push(randomclr());
    console.log(arr);
    return arr;
}
function randomclr(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function pickColor() {
    var index = Math.floor(Math.random() * options.length);
    return options[index];
}

ques.textContent = pickedClr;

reset.addEventListener("click", function(){
    redo();
});

function redo(){
    options = chooseColor(tiles);
    pickedClr = pickColor();
    console.log(pickedClr);
    ques.textContent = pickedClr;
    message.textContent = "";
    for(var i=0 ; i<squares.length ; i++){
        if(options[i]){
            squares[i].style.backgroundColor = options[i];
            squares[i].style.display = "block";
        }
        else
            squares[i].style.display = "none";
    }
    document.querySelector("h1").style.backgroundColor = "royalblue";
}


