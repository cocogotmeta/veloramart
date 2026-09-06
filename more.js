function toggleCompare(id){
  if(compare.includes(id)) compare=compare.filter(x=>x!==id);
  else if(compare.length===2){ toast("Compare two pieces only"); return; }
  else compare.push(id);
  renderCompare();
}
function renderCompare(){
  const bar=$("compareBar");
  if(!compare.length){ bar.classList.remove("on"); return; }
  bar.classList.add("on");
  bar.innerHTML=`<div class="glass rounded-full px-4 py-2 flex items-center gap-3">${compare.map(id=>{const p=findP(id);return `<span class="text-xs">${p.title.split(" ").slice(-2).join(" ")}</span>`;}).join("<span class='text-white/30'>vs</span>")}${compare.length===2?`<button class="goldBtn text-[10px] px-3 py-1 rounded-full" onclick="openCompare()">View</button>`:""}<button onclick="compare=[];renderCompare()" class="text-white/40">✕</button></div>`;
}
function openCompare(){
  const [a,b]=compare.map(findP);
  $("quickViewContent").innerHTML=`<div class="flex justify-between mb-4"><div class="font-cinzel text-2xl">Atelier compare</div><button onclick="closeQuickView()"><i class="fa-solid fa-xmark"></i></button></div><div class="grid md:grid-cols-2 gap-6">${[a,b].map(p=>`<div><img src="${p.img}" class="h-48 w-full object-cover rounded-2xl mb-3"><div class="font-cinzel text-xl mb-2">${p.title}</div><p class="text-xs text-white/50 mb-2">${p.desc}</p><div class="text-amber-200">${money(p.price)}</div><div class="text-[10px] mt-2">${p.material} · ${p.origin}</div></div>`).join("")}</div>`;
  $("quickViewModal").classList.remove("hidden");
}
function closeQuickView(){ $("quickViewModal").classList.add("hidden"); }
function enableTilt(card){
  if(window.innerWidth<768) return;
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    card.style.transform=`perspective(1000px) rotateX(${((e.clientY-r.top)/r.height-.5)*-10}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*10}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
}
function renderAll(){
  renderFilters(); renderFeatured(); renderProducts(currentList()); renderCart(); renderFavCount(); renderCompare();
  if((location.hash||"").includes("saved")) renderSaved();
  if((location.hash||"").includes("piece")) showPiece(currentPiece);
}
(function particles(){
  const box=$("particles");
  for(let i=0;i<55;i++){
    const p=document.createElement("div"); p.className="particle";
    p.style.left=Math.random()*100+"%"; p.style.animationDuration=(8+Math.random()*18)+"s";
    p.style.animationDelay=(-Math.random()*20)+"s"; box.appendChild(p);
  }
})();
const glow=$("ambientGlow");
window.addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
  const c=$("goldCursor"); if(c){ c.style.left=e.clientX+"px"; c.style.top=e.clientY+"px"; }
});
document.addEventListener("mouseover",e=>{
  const c=$("goldCursor"); if(!c) return;
  c.classList.toggle("hot", !!e.target.closest("button,a,.productCard"));
});
window.addEventListener("hashchange", route);
window.addEventListener("scroll",()=>$("navbar").classList.toggle("scrolled", window.scrollY>20));
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeQuickView(); $("cartModal").classList.add("hidden"); document.body.style.overflow=""; }});
$("quickViewModal").addEventListener("click",e=>{ if(e.target.id==="quickViewModal") closeQuickView(); });
$("cartModal").addEventListener("click",e=>{ if(e.target.id==="cartModal") toggleCart(); });
renderAll();
route();
document.querySelectorAll("[data-count]").forEach(el=>{
  const target=+el.dataset.count, start=performance.now();
  const tick=now=>{ const t=Math.min(1,(now-start)/1400); el.textContent=Math.floor(target*(1-Math.pow(1-t,3))); if(t<1) requestAnimationFrame(tick); else el.textContent=target; };
  requestAnimationFrame(tick);
});
setTimeout(()=>$("luxuryLoader").classList.add("loaded"), 2200);
