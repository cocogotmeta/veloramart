let ytPlayer=null, ytReady=false;
function onYouTubeIframeAPIReady(){
  ytPlayer=new YT.Player("ytPlayer",{
    height:"1", width:"1",
    videoId:"o2W8_mvLuxU",
    playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,rel:0,loop:1,playlist:"o2W8_mvLuxU",playsinline:1},
    events:{
      onReady:function(e){ ytReady=true; e.target.setVolume(11); e.target.setPlaybackRate(0.8); },
      onStateChange:function(e){ if(e.data===0){ e.target.setPlaybackRate(0.8); e.target.setVolume(11); e.target.playVideo(); } }
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
    ytPlayer.setPlaybackRate(0.8);
    ytPlayer.setVolume(11);
    ytPlayer.playVideo();
    b.dataset.on="1";
    b.innerHTML='<i class="fa-solid fa-volume-low"></i>';
    toast("طويل الشوق · quiet · 0.8×");
  }
}
