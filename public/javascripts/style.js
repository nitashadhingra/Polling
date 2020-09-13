var tags = document.querySelectorAll("button");

for(var i=0 ; i<tags.length ; i++){
    tags[i].classList.add("btn");
    tags[i].addEventListener("mouseover", function(){
        this.style.backgroundColor = "yellow";
    });
    tags[i].addEventListener("mouseout", function(){
        this.style.backgroundColor = "white";
    });
}

var butn = document.getElementsByClassName("newy")[0];
butn.addEventListener("click", function(){
    alert("clicked");
});

