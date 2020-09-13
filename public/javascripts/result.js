function copyLink() {
    var url = document.getElementById("link");
    if (url.style.display === "none") {
      url.style.display = "block";
    } else {
      url.style.display = "none";
    }
  }
function getCopy(){
    var copyText = document.getElementById("getLink");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}