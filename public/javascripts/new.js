$(".add").click(function (event) {
    alert("click");
    event.stopPropagation();
    $("ul").append('<div class="six wide field"><p><input class="options" name="options" placeholder="Option" type="text"> <span>X</span></p></div>');
});

$(".del").click(function () {
    alert("close");
    $(this).parent().parent().parent().fadeOut(600, function(){
        $(this).remove();
    });
});


// $(".more").keypress(function(event){
//     if(event.which === 13){
//         const another = $(this).val();
//         $("ul").append("<li>" + another + "</li>");
//     }
// });

