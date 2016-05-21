
// When the browser is ready...
$(document).ready(function() {
  // sets body and screen container styles
  setBodyStyle();
  setScreenContainerStyle();

  // creates screens with styles
  createTimeScreens();

  var start = $("[data-countdown-start]").attr("data-countdown-start");
  var timer = new Timer(start);

  setInterval(function() {
    var time = timer.getTime();

    $("#days").text(correct(time.day));
    $("#hours").text(correct(time.hour));
    $("#minutes").text(correct(time.minute));
    $("#seconds").text(correct(time.second));
  }, 100);
});

function setBodyStyle() {
  $(document.body).css({
    "background-color": "brown",
    "display": "flex",
    "justify-content": "center"
  });
}

function setScreenContainerStyle() {
  // removes all content
  $("[data-countdown]").empty();

  $("[data-countdown]").css({
    "display": "flex",
    "justify-content": "space-between",
    "width": "400px",
    "color": "white",
    "margin-top": "300px"
  });
}

function createTimeScreens() {
  $day_cont = createScreenContainer("days_cont", "DAYS");
  $hour_cont = createScreenContainer("hour_cont", "HOURS");
  $minute_cont = createScreenContainer("minute_cont", "MINUTES");
  $second_cont = createScreenContainer("second_cont", "SECONDS");

  // create screens
  var $days = $("<div>", {id: "days"});
  setScreenCss($days);
  $day_cont.prepend($days);

  var $hours = $("<div>", {id: "hours"});
  setScreenCss($hours);
  $hour_cont.prepend($hours);

  var $minutes = $("<div>", {id: "minutes"});
  setScreenCss($minutes);
  $minute_cont.prepend($minutes);

  var $seconds = $("<div>", {id: "seconds"});
  setScreenCss($seconds);
  $second_cont.prepend($seconds);

  $("[data-countdown]").append($day_cont, $hour_cont, $minute_cont, $second_cont);
}

function createScreenContainer(elId, bottomText) {
  var $elem = $("<div>", {id: elId});
  setScrContCss($elem);

  $text = $("<div>", {text: bottomText});
  setTextCss($text);
  $elem.append($text);

  return $elem;
}

function setScrContCss(item) {
  $(item).css({
    "height": "150px",
    "width": "80px",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
  });
}

function setScreenCss(item) {
  $(item).css({
    "height": "100px",
    "width": "80px",
    "border-radius": "10%",
    "background-color": "orange",
    "font": "50px Verdana",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "": "",
  });
}

function setTextCss(item) {
  $(item).css({
    "height": "40px",
    "width": "80px",
    "font": "22px Courier",
    "display": "flex",
    "justify-content": "center",
    "margin-top": "10px",
  });
}

function correct(num) {
  var str = num.toString();
  return str.length == 1 ? "0" + str : str;
}

/////////////////////////////////////
//    Application timer
function Timer(startStr) {
  this._start = this._parseInput(startStr);
}

Timer.prototype._parseInput = function (startStr) {
  var startItems = startStr.split(":");
  return {
    day: startItems[0],
    hour: startItems[1],
    minute: startItems[2],
    second: startItems[3]
  };
}

Timer.prototype._getEndMs = function (now) {
  var dayMs = this._start.day * 24 * 60 * 60 * 1000;
  var hourMs = this._start.hour * 60 * 60 * 1000;
  var minuteMs = this._start.minute * 60 * 1000;
  var secondMs = this._start.second * 1000;

  return dayMs + hourMs + minuteMs + secondMs + now;
}

Timer.prototype._msToDays = function (ms) {
  return ms / 1000 / 60 / 60 / 24;
}

Timer.prototype._msToHours = function (ms) {
  return ms / 1000 / 60 / 60;
}

Timer.prototype._msToMinutes = function (ms) {
  return ms / 1000 / 60;
}

Timer.prototype._msToSeconds = function (ms) {
  return ms / 1000;
}

Timer.prototype._daysToMs = function (days) {
  return days * 24 * 60 * 60 * 1000;
}

Timer.prototype._hoursToMs = function (hours) {
  return hours * 60 * 60 * 1000;
}

Timer.prototype._minutesToMs = function (minutes) {
  return minutes * 60 * 1000;
}

Timer.prototype._secondsToMs = function (seconds) {
  return seconds * 1000;
}

Timer.prototype._formTime = function (ms) {
  var curTime = {};
  curTime.day = parseInt(this._msToDays(ms));
  var diff = ms - this._daysToMs(curTime.day);

  curTime.hour = parseInt(this._msToHours(diff));
  diff = diff - this._hoursToMs(curTime.hour);

  curTime.minute = parseInt(this._msToMinutes(diff));
  diff = diff - this._minutesToMs(curTime.minute);

  curTime.second = parseInt(this._msToSeconds(diff));
  diff = diff - this._secondsToMs(curTime.second);

  return curTime;
}

Timer.prototype.getTime = function () {
  var now = Date.now();

  if(this._startMs == undefined) {
    this._startMs = now;
    this._endMs = this._getEndMs(this._startMs);
    return this._start;
  }
  else {
    var totalDiff = this._endMs - now;

    if(now >= this._endMs) {
      return this._formTime(this._endMs);
    }
    else {
      return this._formTime(totalDiff);
    }
  }
}
