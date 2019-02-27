let countDown;
const timeLeft = document.querySelector(".timer-time-left");
const endTime= document.querySelector(".timer-end-time");
const buttons= document.querySelectorAll("[data-time]");


function timer (seconds) {
    clearInterval(countDown);
    const now = Date.now();
    // console.log(now);
    const then = now + seconds * 1000;
    // console.log(now,then);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(function(){
        const secondsLeft = Math.round((then - Date.now() )/1000);
        if (secondsLeft <= 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
        displayEndTime(then);
    },1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainLeft = seconds % 60;
    timeLeft.textContent = `${minutes < 10 ? '0':''}${minutes}:${remainLeft < 10 ? '0':''}${remainLeft}`;
    
    console.log(seconds);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at  ${hour >12 ? hour-12:hour}:${minutes < 10 ? '0':''}${minutes}`;

}

function buttonControl() {
    const time = parseInt(this.dataset.time);
    timer(time);
}

buttons.forEach(button => button.addEventListener('click',buttonControl));
document.custom.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(this.minutes.value);
    const min = this.minutes.value;
    timer(min *60);
    this.reset();
});