var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var scheduleArea = $(".schedule");

var toDoItems = [];


var currentDate = moment().format("dddd, MMMM Do");

var currentHour = moment().format("H");

function initializeSchedule(){

    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        var todoObj = {
            hour: thisBlockHr,
            text: "",

        };
        toDoItems.push(todoObj);
    });
    localStorage.setItem("todos", json.stringify(toDoItems));
}

function setuptimeBlock(){
    $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
        console.log(currentHour, thisBlockHr)
        if (thisBlockHr == currentHour){
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockHr < currentHour){
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockHr > currentHour){
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}
function renderSchedule(){

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++){
        var itemhour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemhour +"]").children("textarea").val(itemText);
    }
    console.log(toDoItems);
}
function saveHandler(){
      var $thisblock = $(this).parent();

    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemtoAdd = (($(this).parent()).children("textarea")).val();

    for (var j = 0; j < toDoItems.length; j++){
        if (toDoItems[j].hour == hourToUpdate){
            toDoItems[j].text = itemtoAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}

$(document).ready(function(){

    setuptimeBlock();

    if(!localStorage.getItem("todos")){

        initializeSchedule();
    }

    $currentDay.text(currentDate);

    renderSchedule();
     
    $(document).on("click", "button", saveHandler);
});