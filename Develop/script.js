var today = moment().format('dddd, MMMM Do');
$("#currentDay").text(today);

$(".time-block").each(function(index, el){

    var workTime = $(this).find("p").text().trim();
    workTime = moment(workTime, "h:mma")
    var diff= moment().diff(workTime, "minutes");

    if (diff<0) {
        $(this).find("textarea").addClass("future");
        console.log("future");
    } else if (0<diff && diff<60){
        $(this).find("textarea").addClass("present");
        console.log("present");
    } else{
        $(this).find("textarea").addClass("past");
        console.log("past");
    }

})