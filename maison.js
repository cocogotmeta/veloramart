const categories=["All","Timepieces","Audio","Leather","Apparel","Grooming"];
let cart=[], favs=JSON.parse(localStorage.getItem("elvara-favs")||"[]"), compare=[], activeCategory="All", currentPiece=null;
const $ = id => document.getElementById(id);
const money = n => "Rs. " + n.toLocaleString();
const findP = id => products.find(p => p.id===id);
const toast = msg => { const t=$("toast"); t.textContent=msg; t.classList.add("on"); setTimeout(()=>t.classList.remove("on"),1800); };
function saveFavs(){ localStorage.setItem("elvara-favs", JSON.stringify(favs)); renderFavCount(); }
function isFav(id){ return favs.includes(id); }
function toggleFav(id){
  favs = isFav(id) ? favs.filter(x=>x!==id) : favs.concat(id);
  saveFavs(); renderAll(); toast(isFav(id)?"Saved to the vault list":"Removed from saved");
}
function ding(){
  if($("soundToggle") && $("soundToggle").dataset.on!=="1") return;
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const o=ctx.createOscillator(), g=ctx.createGain();
  o.type="sine"; o.frequency.value=784; g.gain.value=0.03;
  o.connect(g); g.connect(ctx.destination); o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.35);
  o.stop(ctx.currentTime+0.36);
}
function toggleSound(){
  const b=$("soundToggle");
  b.dataset.on = b.dataset.on==="1" ? "0" : "1";
  b.innerHTML = b.dataset.on==="1" ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
  if(b.dataset.on==="1") ding();
}
function route(){
  const hash=(location.hash||"#home").slice(1);
  const [page,id]=hash.split("/");
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("on"));
  document.querySelectorAll(".navLink").forEach(a=>a.classList.toggle("active", a.dataset.page===page));
  if(page==="piece"){ currentPiece=+id; showPiece(+id); $("view-piece").classList.add("on"); }
  else { ($("view-"+(page||"home"))||$("view-home")).classList.add("on"); }
  window.scrollTo({top:0,behavior:"smooth"});
  if(page==="collection") renderProducts(currentList());
  if(page==="saved") renderSaved();
  if(page==="lookbook") renderLookbook();
  if(page==="journal") renderJournal();
}
function go(h){ location.hash=h; }
function availLabel(p){
  if(p.avail==="available") return '<span class="avail go">Ready · '+p.lead+'</span>';
  if(p.avail==="waitlist") return '<span class="avail wait">Waitlist · '+p.lead+'</span>';
  return '<span class="avail lock">Vault only · '+p.lead+'</span>';
}
function cardHTML(p){
  return `<article class="productCard glass rounded-3xl border border-amber-500/10"><div class="productImageWrap h-64"><span class="productBadge">${p.status}</span><button class="heart ${isFav(p.id)?"on":""} absolute z-10 top-3 right-3" onclick="event.stopPropagation();toggleFav(${p.id})"><i class="fa-${isFav(p.id)?"solid":"regular"} fa-bookmark"></i></button><img src="${p.img}" alt="${p.title}" class="productImage w-full h-full object-cover"></div><div class="p-5"><div class="text-[9px] uppercase tracking-[.28em] text-amber-300/70 mb-2">${p.category} · ${p.origin}</div><h3 class="font-cinzel text-lg leading-snug mb-2 cursor-pointer" onclick="go('piece/${p.id}')">${p.title}</h3><div class="mb-3">${availLabel(p)}</div><div class="flex items-center justify-between gap-2"><div class="text-amber-200">${money(p.price)}</div><div class="flex gap-2"><button onclick="toggleCompare(${p.id})" class="text-[10px] uppercase tracking-[.16em] border border-amber-500/20 rounded-full px-3 py-2">Compare</button><button onclick="go('piece/${p.id}')" class="goldBtn text-[10px] uppercase tracking-[.16em] rounded-full px-3 py-2">Open</button></div></div></div></article>`;
}
function currentList(){
  const q=($("searchInput").value||"").toLowerCase().trim();
  let list=products.filter(p=>{
    const hit=!q || [p.title,p.category,p.status,p.origin,p.material,p.sku,p.desc].join(" ").toLowerCase().includes(q);
    return hit && (activeCategory==="All"||p.category===activeCategory);
  });
  const sort=$("sortSelect").value;
  if(sort==="price-desc") list=[...list].sort((a,b)=>b.price-a.price);
  if(sort==="price-asc") list=[...list].sort((a,b)=>a.price-b.price);
  if(sort==="name") list=[...list].sort((a,b)=>a.title.localeCompare(b.title));
  return list;
}
function renderFilters(){
  $("filterBar").innerHTML=categories.map(cat=>`<button class="filterBtn px-4 py-2 rounded-full border border-amber-500/15 text-[10px] uppercase tracking-[.22em] ${cat===activeCategory?"active":""}" onclick="filterCategory('${cat}')">${cat}</button>`).join("");
}
function filterCategory(cat){ activeCategory=cat; renderFilters(); renderProducts(currentList()); }
function handleSearch(){ const m=$("searchInputMobile"); if(m && m.value!==$("searchInput").value) m.value=$("searchInput").value; renderProducts(currentList()); }
function syncSearch(v){ $("searchInput").value=v; renderProducts(currentList()); }
function renderProducts(list){
  $("pieceCounter").textContent=products.length+" pieces in the private vault";
  $("resultNote").textContent=list.length+" shown";
  $("productsGrid").innerHTML=list.length?list.map(cardHTML).join(""):"";
  $("emptyState").classList.toggle("hidden", !!list.length);
  $("productsGrid").querySelectorAll(".productCard").forEach(enableTilt);
}
function renderFeatured(){
  $("featuredRow").innerHTML=products.filter(p=>p.featured).map(p=>`<div class="featuredCard flex-shrink-0 w-[300px]">${cardHTML(p)}</div>`).join("");
  $("featuredRow").querySelectorAll(".productCard").forEach(enableTilt);
}
function renderSaved(){
  const list=products.filter(p=>isFav(p.id));
  $("savedGrid").innerHTML=list.length?list.map(cardHTML).join(""):`<p class="text-white/40">No saved pieces yet. Bookmark from the collection.</p>`;
}
function renderLookbook(){
  const spans=["span8","span4","span6","span6","span4","span8"];
  $("lookGrid").innerHTML=lookbook.map((x,i)=>`<figure class="lookCard ${spans[i%spans.length]}"><img src="${x.img}" alt="${x.title}"><figcaption class="cap"><div class="font-cinzel text-xl">${x.title}</div><div class="text-[10px] tracking-[.25em] uppercase text-amber-200/80">${x.place}</div></figcaption></figure>`).join("");
}
function renderJournal(){
  $("journalList").innerHTML=journal.map(j=>`<article class="glass rounded-3xl p-7"><div class="text-[10px] tracking-[.3em] uppercase text-amber-300/80 mb-2">${j.tag}</div><h3 class="font-cinzel text-2xl mb-3">${j.title}</h3><p class="text-white/55">${j.body}</p></article>`).join("");
}
function showPiece(id){
  const p=findP(id); if(!p){ go("collection"); return; }
  const related=(p.pairs||[]).map(findP).filter(Boolean);
  $("pieceMount").innerHTML=`<div class="grid lg:grid-cols-2 gap-10 items-start"><div class="overflow-hidden rounded-3xl border border-amber-500/15 h-[460px]"><img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover ken"></div><div><div class="text-[10px] uppercase tracking-[.3em] text-amber-300/80 mb-2">${p.category} · ${p.status}</div><h1 class="font-cinzel text-4xl mb-3">${p.title}</h1><div class="mb-4">${availLabel(p)}</div><p class="text-white/60 mb-6">${p.desc}</p><dl class="grid grid-cols-2 gap-3 text-xs text-white/50 mb-8"><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Origin</dt><dd>${p.origin}</dd></div><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Year</dt><dd>${p.year}</dd></div><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Material</dt><dd>${p.material}</dd></div><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Edition</dt><dd>${p.edition}</dd></div><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">SKU</dt><dd>${p.sku}</dd></div><div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Valuation</dt><dd class="text-amber-200">${money(p.price)}</dd></div></dl><div class="flex flex-wrap gap-3"><button onclick="addToCart(${p.id})" class="goldBtn px-6 py-3 rounded-full text-[11px] tracking-[.22em] uppercase">${p.avail==="available"?"Request allocation":"Join private list"}</button><button onclick="toggleFav(${p.id})" class="px-6 py-3 rounded-full border border-amber-500/25 text-[11px] tracking-[.22em] uppercase">${isFav(p.id)?"Saved":"Save"}</button><button onclick="toggleCompare(${p.id})" class="px-6 py-3 rounded-full border border-amber-500/25 text-[11px] tracking-[.22em] uppercase">Compare</button></div></div></div><div class="mt-14"><div class="text-[10px] uppercase tracking-[.3em] text-amber-300/80 mb-4">Paired by the maison</div><div class="grid sm:grid-cols-2 gap-5">${related.map(cardHTML).join("")||"<p class='text-white/40'>No pairings recorded.</p>"}</div></div>`;
}
function addToCart(id){
  const p=findP(id); const ex=cart.find(x=>x.id===id);
  if(ex) ex.qty+=1; else cart.push({...p,qty:1});
  renderCart(); ding(); toast("Added to allocation list");
}
function changeQty(id,d){ const item=cart.find(x=>x.id===id); if(!item) return; item.qty+=d; if(item.qty<1) cart=cart.filter(x=>x.id!==id); renderCart(); }
function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0), total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  $("cartTotal").textContent=money(total);
  const badge=$("cartBadge");
  if(count){ badge.textContent=count; badge.classList.remove("hidden"); badge.classList.add("flex"); }
  else { badge.classList.add("hidden"); badge.classList.remove("flex"); }
  $("cartItems").innerHTML=cart.length?cart.map(item=>`<div class="flex gap-3 border border-amber-500/10 rounded-2xl p-3"><img src="${item.img}" alt="" class="w-16 h-16 object-cover rounded-xl"><div class="flex-1"><div class="text-sm">${item.title}</div><div class="text-amber-200 text-xs mt-1">${money(item.price)}</div><div class="flex items-center gap-2 mt-2 text-xs"><button onclick="changeQty(${item.id},-1)" class="w-6 h-6 border border-amber-500/20 rounded">−</button><span>${item.qty}</span><button onclick="changeQty(${item.id},1)" class="w-6 h-6 border border-amber-500/20 rounded">+</button></div></div></div>`).join(""):`<p class="text-white/35 text-sm">Your allocation list is empty.</p>`;
}
function renderFavCount(){ const n=$("favBadge"); if(!n) return; if(favs.length){ n.textContent=favs.length; n.classList.remove("hidden"); n.classList.add("flex"); } else { n.classList.add("hidden"); } }
function toggleCart(force){ const m=$("cartModal"); if(force===true) m.classList.remove("hidden"); else m.classList.toggle("hidden"); document.body.style.overflow=m.classList.contains("hidden")?"":"hidden"; }
function processOrder(e){
  e.preventDefault(); if(!cart.length) return;
  const name=$("custName").value, phone=$("custPhone").value, address=$("custAddress").value;
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const items=cart.map(i=>`• ${i.title} (${i.sku}) x${i.qty} — ${money(i.price*i.qty)}`).join("\n");
  const message=`*ÉLVARA PRIVÉ — PRIVATE CONCIERGE REQUEST*\n\n*Client:* ${name}\n*Contact:* ${phone}\n*Delivery:* ${address}\n\n*PRIVATE COLLECTION:*\n${items}\n\n*TOTAL VALUATION:* ${money(total)}`;
  window.open("https://wa.me/923234749637?text="+encodeURIComponent(message),"_blank");
}
function requestVisit(e){
  e.preventDefault();
  const message=`*ÉLVARA PRIVÉ — ATELIER VISIT*\nName: ${$("visName").value}\nCity: ${$("visCity").value}\nInterest: ${$("visNote").value}`;
  window.open("https://wa.me/923234749637?text="+encodeURIComponent(message),"_blank");
}
