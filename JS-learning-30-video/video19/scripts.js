const video = document.querySelector(".player");
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

const strip = document.querySelector('.strip');
const snap = document.querySelector(".snap");

function getVideo() {//获取摄像头访问
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.error(`oh-----`,err);
    });
}

getVideo();

function paintToCanvas() {//将 video 画到 canvas 上显示
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width,height);
    canvas.width = width;
    canvas.height = height;
;
    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height);

        // const pixels = ctx.getImageData(0,0,width,height);

        pixels = rgbSplit(pixels);

        // ctx.putImageData(pixels,0,0);


    }, 16);

}

function takePhoto() {
    snap.currentTime = 0;//播放声音
    snap.play();

    //get image
    const data = canvas.toDataURL('image/jpeg');//保存图片
    console.log(data);

    //download
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome');//新建一个下载链接，保存到本地
    link.innerHTML = `<img src=${data}>`;
    strip.insertBefore(link,strip.firstChild);

}

function redEffect(pixels) {
    for (let i=0;i<pixels.data;i+4) {
        pixels[i+0] = pixels[i+0]+200;
        pixels[i+1] = pixels[i+0]-50;
        pixels[i+2] = pixels[i+0]*0.5;
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i=0;i<pixels.data;i+4) {
        pixels[i-50] = pixels[i+0];
        pixels[i-150] = pixels[i+0];
        pixels[i+20] = pixels[i+0];
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels ={};
    document.querySelector(".rgb input").forEach(input =>{
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
    
        if (red >= levels.rmin
          && green >= levels.gmin
          && blue >= levels.bmin
          && red <= levels.rmax
          && green <= levels.gmax
          && blue <= levels.bmax) {
          // take it out!
          pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}


video.addEventListener('canplay', paintToCanvas);//自动实时监测转换到画布上




