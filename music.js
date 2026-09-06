let ytPlayer=null, ytReady=false;
function hush(){
  if(!ytPlayer||!ytPlayer.setVolume) return;
  ytPlayer.setVolume(4);
}
function onYouTubeIframeAPIReady(){
  ytPlayer=new YT.Player("ytPlayer",{
    height:"1", width:"1",
    videoId:"4AVDPYZ4E1A",
    playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,rel:0,loop:1,playlist:"4AVDPYZ4E1A",playsinline:1},
    events:{
      onReady:function(e){ ytReady=true; hush(); },
      onStateChange:function(e){
        hush();
        if(e.data===0){ hush(); e.target.playVideo(); }
      }
    }
  });
}
function toggleSound(){
  const b=document.getElementById("soundToggle");
  if(!ytReady||!ytPlayer){ toast("Salon audio is loading"); return; }
  if(b.dataset.on==="1"){
    ytPlayer.pauseVideo();
    b.dataset.on="0";
    b.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';
    toast("Background paused");
  } else {
    hush();
    ytPlayer.playVideo();
    setTimeout(hush, 200);
    setTimeout(hush, 800);
    b.dataset.on="1";
    b.innerHTML='<i class="fa-solid fa-volume-low"></i>';
    toast("طويل الشوق · sped up · whisper");
  }
}
