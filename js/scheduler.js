$(document).ready(function(){

    var DOW_INDEX = {"M": 0, "T": 1, "W": 2, "R": 3, "F": 4, "S": 5};
    var TOP_MIN = 0;
    var LEFT_MIN = 53;
    var CELL_HEIGHT = 102;
    var CELL_WIDTH = 120;
    var minTime = 2400;
    var maxTime = 0;

    var rawClassData = {"classes" : [{"index" : 1,"courseName" : "C S360","sectionNumber" : "001","daysTaught" : "T R","beginTime" : "0930","endTime" : "1045","room" : "B114","building" : "MARB","creditType" : "S","instructor" : "Clement"},{"index" : 2,"courseName" : "CSANM452R","sectionNumber" : "001","daysTaught" : "M W","beginTime" : "1300","endTime" : "1450","room" : "1110","building" : "TMCB","creditType" : "S","instructor" : "Adams"},{"index" : 3,"courseName" : "CSANM459R","sectionNumber" : "001","daysTaught" : "T R","beginTime" : "1700","endTime" : "1850","room" : "1110","building" : "TMCB","creditType" : "S","instructor" : "Holladay"},{"index" : 4,"courseName" : "ECON110","sectionNumber" : "002","daysTaught" : "M W F","beginTime" : "0800","endTime" : "0850","room" : "250","building" : "SWKT","creditType" : "S","instructor" : "Pope"},{"index" : 5,"courseName" : "TECH202","sectionNumber" : "002","daysTaught" : "M","beginTime" : "1600","endTime" : "1830","room" : "214","building" : "CTB","creditType" : "S","instructor" : "Davis"}]};
    var classData = {"classes" : [], "hours": []};


    rawClassData.classes.forEach(function(classInfo){
        var beginTime = parseInt(classInfo.beginTime);
        var endTime = parseInt(classInfo.endTime);
        minTime = beginTime < minTime ? beginTime : minTime;
        maxTime = endTime > maxTime ? endTime : maxTime;
        var daysTaught = classInfo.daysTaught.split(" ");
        daysTaught.forEach(function(day){
            classData.classes.push({})
            $.extend(classData.classes[classData.classes.length - 1], classInfo);
            classData.classes[classData.classes.length - 1].dayIndex = DOW_INDEX[day];
        });
    });

    for(var t = Math.floor(minTime / 100); t < (maxTime / 100); t++){
        if(t < 12){
            classData.hours.push(t + "am");
        } else if (t > 12){
            classData.hours.push((t % 12) + "pm");    
        } else {
            classData.hours.push("12pm");
        }
    }

    classData.classes.forEach(function(classInfo){
        var beginTime = parseInt(classInfo.beginTime);
        var numericBeginTime = Math.floor(beginTime / 100) + ((beginTime % 100) / 60);
        var classDuration = parseInt(classInfo.endTime) - beginTime;
        var numericClassDuration = Math.floor(classDuration / 100) + ((classDuration % 100) / 60);

        var cellHeight = Math.floor(CELL_HEIGHT * numericClassDuration);
        var cellTopPos = Math.floor(TOP_MIN + (CELL_HEIGHT * (numericBeginTime - Math.floor(minTime / 100))));
        var cellLeftPos = Math.floor(LEFT_MIN + (CELL_WIDTH * classInfo.dayIndex));

        classInfo.cellHeight = cellHeight;
        classInfo.cellTopPos = cellTopPos;
        classInfo.cellLeftPos = cellLeftPos;
    });


    $("#main-calendar").html(Handlebars.templates['main-calendar'](classData));


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


