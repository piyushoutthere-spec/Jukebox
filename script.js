const audioPlayer=document.getElementById("audioPlayer");
const playButton=document.getElementById("playButton");
const previousButton=document.getElementById("previousButton");
const nextButton=document.getElementById("nextButton");
const volumeSlider=document.getElementById("volumeSlider");
const searchInput=document.getElementById("searchInput");
const trackList=document.getElementById("trackList");
const queueList=document.getElementById("queueList");
const nowPlayingTitle=document.getElementById("nowPlayingTitle");
const nowPlayingArtist=document.getElementById("nowPlayingArtist");
const queueCount=document.getElementById("queueCount");
let tracks=[];
let queue=[];
let currentTrackIndex=-1;
tracks=[
    {
        title:"Beat 1",
        artist:"EchoBeats",
        src:"audio/beat1.mp3"
    },
    {
        title:"Beat 2",
         artist:"TremoxBeatz",
         src:"audio/beat2.mp3"
    },
    {
        title:"Beat 3",
        artist:"Yurasoop",
        src:"audio/beat3.mp3"
    }
];
function renderTracks(){
    trackList.innerHTML="";
    tracks.forEach((track,index) =>{
        const item=document.createElement("div");
        item.className="track-item";
        item.innerHTML= `
        <div>
        <strong>${track.title}</strong>
        <small>${track.artist}</small>
        </div>
        <button class="add-track-button" data-index="${index}">
          +Add
        </button>
       `;
       trackList.appendChild(item);
    });    
}
renderTracks();
trackList.addEventListener("click",function(event){
    if(event.target.classList.contains("add-track-button")){
        const index=Number(event.target.dataset.index);
        queue.push(tracks[index]);
        renderQueue();
    }
});
function renderQueue(){
    queueList.innerHTML="";
    queue.forEach((track,index)=>{
        const item=document.createElement("div");
        item.innerHTML=`
         <strong>${index + 1}. ${track.title}</strong>
      <small>${track.artist}</small>
    `;
    queueList.appendChild(item);
    });
    queueCount.textContent=`${queue.length}tracks`;
}
playButton.addEventListener("click",function(){
    if(queue.length===0){
        showNotice("Add a track to the queue first!");
        return;
    }
    if (currentTrackIndex===-1){
        currentTrackIndex=0;
    }
    if(audioPlayer.paused){
        const track=queue[currentTrackIndex];
        if(audioPlayer.src===""||!audioPlayer.src.includes(track.src)){
        audioPlayer.src=track.src;
        nowPlayingTitle.textContent=track.title;
        nowPlayingArtist.textContent=track.artist;
        }
        audioPlayer.play();
        playButton.textContent="⏸";
    } else{
        audioPlayer.pause();
        playButton.textContent="▶";
    }
});
previousButton.addEventListener("click",function(){
    if(queue.length===0)return;
    if(currentTrackIndex>0){
        currentTrackIndex--;
    }else{
        currentTrackIndex=queue.length-1;
    }
    playCurrentTrack()
});
nextButton.addEventListener("click",function(){
    if(queue.length===0)return;
    if(currentTrackIndex<queue.length-1){
        currentTrackIndex++;
    }else{
        currentTrackIndex=0;
    }
    playCurrentTrack();
});
function playCurrentTrack(){
    const track=queue[currentTrackIndex];
    audioPlayer.src=track.src;
    nowPlayingTitle.textContent=track.title;
    nowPlayingArtist.textContent=track.artist;
    audioPlayer.play();
    playButton.textContent="⏸";
}
audioPlayer.addEventListener("ended",function(){
    if(queue.length===0)return;
    if(currentTrackIndex<queue.length-1){
        currentTrackIndex++;
    }else{
        currentTrackIndex=0;
    }
    playCurrentTrack();
});
volumeSlider.addEventListener("input",function(){
    audioPlayer.volume=volumeSlider.value;
});
audioPlayer.volume=volumeSlider.value;
function showNotice(message){
    const notice=document.createElement("div");
    notice.className="jukebox-notice";
    notice.innerHTML=`
    <div class="notice-box">
    <div class="notice-icon">♫</div>
    <h3>NO TRACK SELECTED</h3>
    <p>${message}</p>
    <button class="notice-close">OK</button>
    </div>
    `;
    document.body.appendChild(notice);
    notice.querySelector(".notice-close").addEventListener("click",()=>{
        notice.remove();
    });
}