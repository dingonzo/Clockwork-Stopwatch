

"use strict";

const padSingleDigit = num => num.toString().padStart(2, "0");

const displayCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let ampm = "AM";
    
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    } else {
         switch (hours) {
            case 12: ampm = "PM"; break;
            case 0:  hours = 12; ampm = "AM"; break;
        }
    }
    
    $("#hours").textContent = hours;
    $("#minutes").textContent = padSingleDigit(now.getMinutes());
    $("#seconds").textContent = padSingleDigit(now.getSeconds());
    $("#ampm").textContent = ampm;
};

// Stopwatch variables
let stopwatchTimer = null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

const tickStopwatch = () => {    
    elapsedMilliseconds += 10;
    if (elapsedMilliseconds === 1000) {
        elapsedSeconds++;
        elapsedMilliseconds = 0;
    }
    if (elapsedSeconds === 60) {
        elapsedMinutes++;
        elapsedSeconds = 0;
    }
    
    $("#s_minutes").textContent = padSingleDigit(elapsedMinutes);
    $("#s_seconds").textContent = padSingleDigit(elapsedSeconds);
    $("#s_ms").textContent = elapsedMilliseconds.toString().padStart(3, "0");
};

const startStopwatch = e => {
    evt.preventDefault(e);
    if (!stopwatchTimer) {
        stopwatchTimer = setInterval(tickStopwatch, 10);
    }
};

const stopStopwatch = e => {
    evt.preventDefault(e);
    clearInterval(stopwatchTimer);
    stopwatchTimer = null;
};

const resetStopwatch = e => {
    evt.preventDefault(e);
    stopStopwatch(e);
    elapsedMinutes = 0;
    elapsedSeconds = 0;
    elapsedMilliseconds = 0;
    $("#s_minutes").textContent = "00";
    $("#s_seconds").textContent = "00";
    $("#s_ms").textContent = "000";
};

document.addEventListener("DOMContentLoaded", () => {
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);
	
    evt.attach($("#start"), "click", startStopwatch);
    evt.attach($("#stop"), "click", stopStopwatch);
    evt.attach($("#reset"), "click", resetStopwatch);
});