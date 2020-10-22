var pollID = document.getElementsByClassName("temp")[0].id;
console.log("id i got:" + pollID);
jQuery(".optn").click(function() {
    var voted = jQuery(this).text();
    alert(voted);
    var data = {pollID, voted};
    var passing = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    fetch("/update", passing);
    // fetch(`/update/${pollID}`, passing);
});

