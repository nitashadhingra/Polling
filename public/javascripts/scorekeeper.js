// alert("Connect");

var curr_score = document.querySelector("h2");
var tot_score = document.querySelector("p");

var p1 = document.querySelectorAll("button")[0];
var p2 = document.querySelectorAll("button")[1];
var reset = document.querySelectorAll("button")[2];
var sc1 = 0;
var sc2 = 0;
var gameOver = false;
var win_score = 5;

p1.addEventListener("click", function(){
    if(!gameOver){
        sc1++;
        console.log(sc1, win_score);
        if(sc1 === win_score){
            gameOver = true;
            console.log("winner : 1");
            p1.classList.add("winner");
        }
        curr_score.textContent = sc1 + " to " + sc2;
    }
});

p2.addEventListener("click", function(){
    if(!gameOver){
        sc2++;
        if(sc2 === win_score){
            gameOver = true;
            console.log("winner : 2");
            p2.classList.add("winner");
        }
        curr_score.textContent = sc1 + " to " + sc2;
    }
});

function rst(){
    gameOver = false;
    sc1 = 0;
    sc2 = 0;
    curr_score.textContent = "0 to 0";
    p1.classList.remove("winner");
    p2.classList.remove("winner");
}

var ip = document.querySelector("input");
ip.addEventListener("change", function(){
    tot_score.textContent = "Playing to: " + ip.value;
    win_score = Number(ip.value);
    rst();
});

reset.addEventListener("click", rst());

