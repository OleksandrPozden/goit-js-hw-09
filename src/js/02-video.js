import Player from '@vimeo/player';
import throttle  from 'lodash.throttle';
const iframe = document.querySelector("#vimeo-player");
console.log(iframe)
const VIDEOPLAYER_CURRENT_TIME = "videoplayer-current-time";
const player = new Player(iframe);


player.on('timeupdate',throttle(onTimeUpdate,1000))
function onTimeUpdate(data){
    console.log(data)
    updateVideoPlayerCurrentTime(data.seconds);
}
function updateVideoPlayerCurrentTime(time){
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME,time);
}
function getVideoPlayerCurrentTime(){
    return localStorage.getItem(VIDEOPLAYER_CURRENT_TIME)

}
player.setCurrentTime(getVideoPlayerCurrentTime())
