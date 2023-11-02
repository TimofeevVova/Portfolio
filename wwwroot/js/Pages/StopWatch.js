function startTimer() {
    if (!isRunning) {
        startTime = new Date() - accumulatedTime;
        requestAnimationFrame(updateTimer);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        accumulatedTime += new Date() - startTime;
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    accumulatedTime = 0;
    stopTimer();
    document.getElementById("timerDisplay").innerText = "00:00:00.000";
}

function updateTimer() {
    if (isRunning) {
        const currentTime = new Date();
        const elapsedMilliseconds = currentTime - startTime;

        const hours = Math.floor(elapsedMilliseconds / 3600000);
        const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
        const milliseconds = elapsedMilliseconds % 1000;

        const formattedTime =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

        document.getElementById("timerDisplay").innerText = formattedTime;

        requestAnimationFrame(updateTimer);
    }
}

document.getElementById("timerStart").addEventListener("click", startTimer);
document.getElementById("timerStop").addEventListener("click", stopTimer);
document.getElementById("timerReset").addEventListener("click", resetTimer);