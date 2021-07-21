//get current date
var today = moment().format('dddd, MMMM Do');
$("#currentDay").text(today);

var schedules = [];
var timeBlocks = ["9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"]

//create timeblocks
for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlockDiv = $("<div>")
        .addClass("row time-block")

    var timeText = $("<p>")
        .addClass("col-md-2 hour")
        .text(timeBlocks[i])

    var scheduleInput = $("<textarea>")
        .addClass("col-md-8 description")
        .attr("cols", "100")
        .attr("row", "3")
        .attr("id", i)

    var saveDiv = $("<div>")
        .addClass("col-md-2 saveBtn")
        .attr("id", i)

    var icon = $("<span>")
        .addClass("oi oi-circle-check display-4 mt-3")

    $(saveDiv).append(icon);
    $(timeBlockDiv).append(timeText, scheduleInput, saveDiv);
    $(".container").append(timeBlockDiv);
}

//iterate each timeblock and change background color
$(".time-block").each(function (index, el) {
    var workTime = $(this).find("p").text().trim();
    workTime = moment(workTime, "h:mma")
    var diff = moment().diff(workTime, "minutes");
    console.log(diff);
    if (diff < 0) {
        $(this).find("textarea").addClass("future");
        console.log("future");
    } else if (0 <= diff && diff <= 60) {
        $(this).find("textarea").addClass("present");
        console.log("present");
    } else {
        $(this).find("textarea").addClass("past");
        console.log("past");
    }
});

// save schedules in an array and localStorage
var saveSchedulesHandler = function () {
    var id = JSON.parse($(this).attr("id"));

    var scheduleInput = $(this).siblings(".description").val();

    const scheduleIndex = schedules.findIndex(schedule => schedule.id === id);
    console.log(scheduleIndex);
    if (scheduleIndex >= 0) {
        schedules[scheduleIndex].name = scheduleInput;
    } else {
        var schedule = {
            id: id,
            name: scheduleInput
        };
        schedules.push(schedule);
    }
    localStorage.setItem("schedules", JSON.stringify(schedules));
    loadSchedules();
}

//load schedules on the page
var loadSchedules = function () {
    schedules = JSON.parse(localStorage.getItem("schedules"));
    if (!schedules) {
        schedules = [];
    }

    // schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    $.each(schedules, function (index, val) {
        $("textarea[id=" + val.id + "]").val(val.name)
    })
    console.log(schedules);
}

loadSchedules();

$(".time-block").on("click", ".saveBtn", saveSchedulesHandler);

//reload the page every 30 mins
setInterval(loadSchedules(), (1000 * 60) * 30);