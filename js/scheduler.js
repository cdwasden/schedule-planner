$(document).ready(function(){
    $("#login-button").click(function(e){
        e.preventDefault();
        $("#login-screen").addClass("screen-closed"); 
    });

    $(".wl-event").hover(function(e){
        if($(e.target).hasClass("non-selected") && !$(e.target).hasClass("scheduled")){
            var parsedId = e.target.id.split("_");
            var classId = "_" + parsedId[3];
            var classSelector = "div[id$='" + classId + "']";
            $(e.target).removeClass("non-selected");
            $(classSelector).each(function(){
                if($(this).hasClass("non-selected")){
                    $(this).addClass("same-class-selected");
                }
            });
        }
    },function(e){
        if(!$(e.target).hasClass("non-selected") && !$(e.target).hasClass("scheduled")){
            var parsedId = e.target.id.split("_");
            var classId = "_" + parsedId[3];
            var classSelector = "div[id$='" + classId + "']";
            $(e.target).addClass("non-selected");
            $(classSelector).removeClass("same-class-selected");
        } 
    });

    $(".wl-event").click(function(e){
        var parsedId = e.target.id.split("_");
        var classId = "_" + parsedId[3];
        var classSelector = "div[id$='" + classId + "']";
        $(classSelector).each(function(){
            $(this).toggleClass("scheduled");
            if($(this).hasClass("scheduled")){
                $(this).removeClass("non-selected");
            } else {
                $(this).addClass("non-selected");
            }
        });
        $(e.target).removeClass("non-selected");
    });
});


