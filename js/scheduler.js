$(document).ready(function(){

    var DOW_INDEX = {"M": 0, "T": 1, "W": 2, "R": 3, "F": 4, "S": 5};
    var TOP_MIN = 0;
    var LEFT_MIN = 53;
    var CELL_HEIGHT = 102;
    var CELL_WIDTH = 120;
    var COLLAPSED_WIDTH = 15;
    var CALENDAR_WIDTH = 800;

    var minTime = 2400;
    var maxTime = 0;

    var rawClassData = {"classes" : [{"index" : 1,"courseName" : "C S360","sectionNumber" : "001","daysTaught" : "T R","beginTime" : "0930","endTime" : "1045","room" : "B114","building" : "MARB","creditType" : "S","instructor" : "Clement"},{"index" : 2,"courseName" : "CSANM452R","sectionNumber" : "001","daysTaught" : "M W","beginTime" : "1300","endTime" : "1450","room" : "1110","building" : "TMCB","creditType" : "S","instructor" : "Adams"},{"index" : 3,"courseName" : "CSANM459R","sectionNumber" : "001","daysTaught" : "T R","beginTime" : "1700","endTime" : "1850","room" : "1110","building" : "TMCB","creditType" : "S","instructor" : "Holladay"},{"index" : 4,"courseName" : "ECON110","sectionNumber" : "002","daysTaught" : "M W F","beginTime" : "0800","endTime" : "0850","room" : "250","building" : "SWKT","creditType" : "S","instructor" : "Pope"},{"index" : 5,"courseName" : "TECH202","sectionNumber" : "002","daysTaught" : "M","beginTime" : "1600","endTime" : "1830","room" : "214","building" : "CTB","creditType" : "S","instructor" : "Davis"},{"index" : 6,"courseName" : "ECON110","sectionNumber" : "001","daysTaught" : "T R","beginTime" : "0930","endTime" : "1045","room" : "140","building" : "JSB","creditType" : "S","instructor" : "Kearl"},{"index" : 7,"courseName" : "ECON110","sectionNumber" : "003","daysTaught" : "T R","beginTime" : "1500","endTime" : "1615","room" : "W111","building" : "BNSN","creditType" : "S","instructor" : "Showalter"},{"index" : 8,"courseName" : "ECON110","sectionNumber" : "004","daysTaught" : "M W F","beginTime" : "1400","endTime" : "1515","room" : "2105","building" : "JKB","creditType" : "S","instructor" : "Lefgren"},{"index" : 9,"courseName" : "C S360","sectionNumber" : "002","daysTaught" : "T R","beginTime" : "1335","endTime" : "1450","room" : "3718","building" : "HBLL","creditType" : "S","instructor" : "Clement"}, {"index" : 10,"courseName" : "TECH202","sectionNumber" : "001","daysTaught" : "M W F","beginTime" : "1000","endTime" : "1050","room" : "B002","building" : "JFSB","creditType" : "S","instructor" : "Taylor"}]};
    var classData = {"classes" : [], "hours": []};
    var scheduleConflicts = [[],[],[],[],[],[]]; 


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

    classData.calendarHeight = classData.hours.length * CELL_HEIGHT;

    classData.classes.forEach(function(classInfo){
        var beginTime = parseInt(classInfo.beginTime);
        var beginHour = Math.floor(beginTime / 100);
        var beginMin = beginTime % 100;
        var numericBeginTime = beginHour + (beginMin / 60);

        var endTime = parseInt(classInfo.endTime);
        var endHour = Math.floor(endTime / 100);
        var endMin = endTime % 100;

        var classDuration = endTime - beginTime;
        var numericClassDuration = Math.floor(classDuration / 100) + ((classDuration % 100) / 60);

        var beginConflicts = 0;
        var endConflicts = 0;
        scheduleConflicts[classInfo.dayIndex].forEach(function(layer){
            layer.forEach(function(classTime){
                if(classTime[0] < endTime && classTime[1] > beginTime){
                    if(classTime[0] < beginTime && classTime[1] > beginTime){
                        beginConflicts++;
                    } else {
                        endConflicts++;
                    }
                }
            });
        });
        var maxConflicts = beginConflicts > endConflicts ? beginConflicts : endConflicts;
        classInfo.layer = maxConflicts;
        while(scheduleConflicts[classInfo.dayIndex].length <= maxConflicts){
            scheduleConflicts[classInfo.dayIndex].push([]);
        }
        scheduleConflicts[classInfo.dayIndex][maxConflicts].push([beginTime, endTime, classInfo.index]);

        var cellHeight = Math.floor(CELL_HEIGHT * numericClassDuration);
        var cellTopPos = Math.floor(TOP_MIN + (CELL_HEIGHT * (numericBeginTime - Math.floor(minTime / 100))));
        var cellLeftPos = Math.floor(LEFT_MIN + (CELL_WIDTH * classInfo.dayIndex) + (COLLAPSED_WIDTH * maxConflicts));

        var beginPostfix = beginHour < 12 ? "am" : "pm";
        var endPostfix = endHour < 12 ? "am" : "pm";
        beginHour = beginHour > 12 ? (beginHour % 12) : beginHour;
        endHour = endHour > 12 ? (endHour % 12) : endHour;
        beginMin = beginMin.toString().length == 1 ? ("0" + beginMin) : beginMin;
        endMin = endMin.toString().length == 1 ? ("0" + endMin) : endMin;

        classInfo.beginTime = beginHour + ":" + beginMin + beginPostfix;
        classInfo.endTime = endHour + ":" + endMin + endPostfix;

        classInfo.cellHeight = cellHeight;
        classInfo.cellTopPos = cellTopPos;
        classInfo.cellLeftPos = cellLeftPos;
    });

    //console.log(classData);
    //console.log(scheduleConflicts);


    $("#main-calendar").html(Handlebars.templates['main-calendar'](classData));


    $("#login-button").click(function(e){
        e.preventDefault();
        $("#login-screen").addClass("screen-closed"); 
    });

    $(".wl-event").hover(function(e){
        if($(e.target).hasClass("non-selected") && !$(e.target).hasClass("scheduled")){
            var parsedId = e.target.id.split("_");
            var dayIndex = parseInt(parsedId[2]);
            var dayIndexId = "_" + parsedId[2] + "_";
            var dayIndexSelector = "div[id*='" + dayIndexId + "']";
            var classIndex = parseInt(parsedId[3]);
            var classId = "_" + parsedId[3];
            var classSelector = "div[id$='" + classId + "']";
            var classFound = false;

            //Find all the classes on days following the class being hovered over
            //Set their left postition to [ORIGINAL_POSITION + (CELL_WIDTH - WIDTH_OF_COLLAPSED_CELL)]
            for(var layerIndex = 0; layerIndex < scheduleConflicts[dayIndex].length; layerIndex++){
                if(classFound){
                    for(; cellIndex < scheduleConflicts[dayIndex][layerIndex].length; cellIndex++){
                        var cellSelector = "#class_tile" + dayIndexId + scheduleConflicts[dayIndex][layerIndex][cellIndex][2];
                        var originalCellLeft = parseInt($(cellSelector).css('left'));
                        var newCellLeft = (originalCellLeft + CELL_WIDTH - COLLAPSED_WIDTH) + "px";
                        $(cellSelector).css('left', newCellLeft);
                    }
                } else {
                    for(var cellIndex = 0; cellIndex < scheduleConflicts[dayIndex][layerIndex].length; cellIndex++){
                        if(scheduleConflicts[dayIndex][layerIndex][cellIndex][2] == classIndex){
                            classFound = true;
                            break;
                        }
                    }
                }
            }

            //Find all classes on layers that fall after the class being hovered over
            //Set their left postition to [ORIGINAL_POSITION + (NUMBER_OF_LAYERS - 1) * WIDTH_OF_COLLAPSED_CELL]
            for(var futureDayIndex = dayIndex + 1; futureDayIndex < scheduleConflicts.length; futureDayIndex++){
                var futureDayIndexSelector = "div[id*='_" + futureDayIndex + "_']";
                $(futureDayIndexSelector).each(function(){
                    var originalCellLeft = parseInt($(this).css('left'));
                    var newCellLeft = (originalCellLeft + ((scheduleConflicts[dayIndex].length - 1) * COLLAPSED_WIDTH)) + "px";
                    $(this).css('left', newCellLeft);   
                })
            }

            var columnSelector = "#col-" + dayIndex;
            var columnWidth = ((scheduleConflicts[dayIndex].length - 1) * COLLAPSED_WIDTH) + CELL_WIDTH;
            var calendarWidth = ((scheduleConflicts[dayIndex].length - 1) * COLLAPSED_WIDTH) + CALENDAR_WIDTH;

            $(columnSelector).css('width', columnWidth);
            $(".wrapper-outer").css('width', calendarWidth);

            $(e.target).removeClass("non-selected");
            $(classSelector).each(function(){
                if($(this).hasClass("non-selected")){
                    $(this).addClass("same-class-selected");
                }
            });

        }
    },function(e){
        var classCell = $(e.target).hasClass("wl-event-title") || $(e.target).hasClass("wl-event-details") ? $(e.target).parent() : $(e.target);
        if(!classCell.hasClass("non-selected") && !classCell.hasClass("scheduled")){
            var parsedId = classCell.attr("id").split("_");
            var classId = "_" + parsedId[3];
            var classSelector = "div[id$='" + classId + "']";
            classCell.addClass("non-selected");
            $(classSelector).removeClass("same-class-selected");

            for(var dayIndex = 0; dayIndex < scheduleConflicts.length; dayIndex++){
                for(var layerIndex = 0; layerIndex < scheduleConflicts[dayIndex].length; layerIndex++){
                    scheduleConflicts[dayIndex][layerIndex].forEach(function(classTime){
                        var cellLeftPos = Math.floor(LEFT_MIN + (CELL_WIDTH * dayIndex) + (COLLAPSED_WIDTH * layerIndex));
                        var cellSelector = "#class_tile_" + dayIndex + "_" + classTime[2];
                        $(cellSelector).css('left', cellLeftPos);
                    });
                }
            }

            $("div[id^='col-']").css('width', CELL_WIDTH - 1);
            $(".wrapper-outer").css('width', CALENDAR_WIDTH);
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

function detectCollisions(){

}