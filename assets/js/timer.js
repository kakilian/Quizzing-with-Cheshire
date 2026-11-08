// QUIZ TIMER — COUNT DOWN AND NOTIFY THE QUIZ WHEN TIME ENDS
export function startTimer(duration, display, endCallback) {
    let remaining = duration;

    function updateDisplay() {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    updateDisplay();

    const interval = setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        updateDisplay();

        if (remaining === 0) {
            stop();
            endCallback();
        }
    }, 1000);

    // Call this when the player finishes before time runs out.
    function stop() {
        clearInterval(interval);
    }

    return stop;
}
