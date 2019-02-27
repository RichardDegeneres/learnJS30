const player = document.querySelector('.content');
const boFang = player.querySelector('.boFang');
const video = player.querySelector('video');
//1.播放按钮
function togglePlay() {
    if(video.paused) {//pause属性
        video.play();
    }else {
        video.pause();
        
    }
}
boFang.addEventListener('click', togglePlay);

//2. 图标切换

function updateIcon() {
    const icon = this.paused? '►':'❚ ❚';
    boFang.textContent = icon;
}

video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
//3. 快进/快退

function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);

}

const skipButtons = player.querySelectorAll('[data-skip]');
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipVideo));

//3. 音量 & 播放速度

function handleUpdate() {
    video[this.name] = this.value;
   
}

const rangeButtons = player.querySelectorAll('.slider');
rangeButtons.forEach(rangeButton => rangeButton.addEventListener('change', handleUpdate));
rangeButtons.forEach(rangeButton => rangeButton.addEventListener('mousemove', handleUpdate));

//4. 播放进度条-自动跟随视频的播放进度

const progressBar = player.querySelector('.jinDuTiao');

function handleProgress(e) {
    const percent = video.currentTime/video.duration*100;
    progressBar.style.flexBasis = `${percent}%`;
    console.log(percent);
}

video.addEventListener('timeupdate', handleProgress);

//5. 控制进度条-点击更改当前播放时间

function scrub(e) {
    const timeVideo = e.offsetX/progress.offsetWidth * video.duration;
    video.currentTime = timeVideo;
}
const progress = player.querySelector('.progress');
progress.addEventListener('click', scrub);

//6. 控制进度条-按下后拖动
let mousedown = false;
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);
progress.addEventListener('mousemove', (e) => {
    if (mousedown) {
        scrub(e);
    }
});


// 7. 控件在有鼠标才显示，或者视频停止时显示???


function toggleKongJian() {
    kongJian.show();
}

const kongJian = player.querySelector('.kongJian');
kongJian.hide();
kongJian.addEventListener('mousemove',toggleKongJian);
