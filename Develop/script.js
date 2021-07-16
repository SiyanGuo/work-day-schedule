//get current date
var today = moment().format('dddd, MMMM Do');
$("#currentDay").text(today);

var schedules = [];

//iterate each timeblock and change background color
$(".time-block").each(function (index, el) {
    var workTime = $(this).find("p").text().trim();
    workTime = moment(workTime, "h:mma")
    var diff = moment().diff(workTime, "minutes");

    if (diff < 0) {
        $(this).find("textarea").addClass("future");
        console.log("future");
    } else if (0 < diff && diff < 60) {
        $(this).find("textarea").addClass("present");
        console.log("present");
    } else {
        $(this).find("textarea").addClass("past");
        console.log("past");
    }
});

var saveSchedules = function () {
    var id = $(this).attr("id");
    var scheduleInput = $(this).siblings(".description").val();
    var schedule = { id: id, name: scheduleInput };
    schedules.push(schedule);
    localStorage.setItem("schedules", JSON.stringify(schedules));
    loadSchedules();
}

var loadSchedules = function () {
    schedules = JSON.parse(localStorage.getItem("schedules"));
    console.log(schedules);
    $.each(schedules, function (index, val) {
        console.log("val", val);
        $("textarea[id=" + val.id + "]").val(val.name)
    })
}

loadSchedules();
$(".time-block").on("click", ".saveBtn", saveSchedules);