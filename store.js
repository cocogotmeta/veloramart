const categories = ["All","Timepieces","Audio","Leather","Apparel","Grooming"];
let cart = [];
let activeCategory = "All";

const particleContainer = document.getElementById("particles");
for (let i = 0; i < 60; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "%";
  p.style.animationDuration = (8 + Math.random() * 18) + "s";
  p.style.animationDelay = (-Math.random() * 20) + "s";
  particleContainer.appendChild(p);
}

const glow = document.getElementById("ambientGlow");
window.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

function money(n){
  return "Rs. " + n.toLocaleString();
}

function renderFilters(){
  const bar = document.getElementById("filterBar");
  bar.innerHTML = categories.map(cat =>
    `<button class="filterBtn px-4 py-2 rounded-full border border-amber-500/15 text-[10px] uppercase tracking-[.22em] ${cat===activeCategory?"active":""}" onclick="filterCategory('${cat}',this)">${cat}</button>`
  ).join("");
}

function currentList(){
  const q = (document.getElementById("searchInput").value || "").toLowerCase().trim();
  let list = products.filter(p => {
    const hit = !q || [p.title,p.category,p.status,p.origin,p.material,p.sku,p.desc].join(" ").toLowerCase().includes(q);
    const cat = activeCategory === "All" || p.category === activeCategory;
    return hit && cat;
  });
  const sort = document.getElementById("sortSelect").value;
  if (sort === "price-desc") list = [...list].sort((a,b)=>b.price-a.price);
  if (sort === "price-asc") list = [...list].sort((a,b)=>a.price-b.price);
  if (sort === "name") list = [...list].sort((a,b)=>a.title.localeCompare(b.title));
  return list;
}

function cardHTML(p, extra=""){
  return `
  <article class="productCard glass rounded-3xl border border-amber-500/10 ${extra}">
    <div class="productImageWrap h-64">
      <span class="productBadge">${p.status}</span>
      <span class="productGlow" style="right:10px;bottom:10px"></span>
      <img src="${p.img}" alt="${p.title}" class="productImage w-full h-full object-cover">
    </div>
    <div class="p-5">
      <div class="text-[9px] uppercase tracking-[.28em] text-amber-300/70 mb-2">${p.category} · ${p.origin}</div>
      <h3 class="font-cinzel text-lg leading-snug mb-2">${p.title}</h3>
      <p class="text-xs text-white/40 line-clamp-2 mb-4">${p.desc}</p>
      <div class="flex items-center justify-between gap-3">
        <div class="text-amber-200">${money(p.price)}</div>
        <div class="flex gap-2">
          <button onclick="openQuickView(${p.id})" class="text-[10px] uppercase tracking-[.18em] border border-amber-500/20 rounded-full px-3 py-2 hover:border-amber-400/50">View</button>
          <button onclick="addToCart(${p.id})" class="goldBtn text-[10px] uppercase tracking-[.18em] rounded-full px-3 py-2">Request</button>
        </div>
      </div>
    </div>
  </article>`;
}

function renderProducts(list){
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  document.getElementById("pieceCounter").textContent = products.length + " pieces available for private request";
  document.getElementById("resultNote").textContent = list.length + " shown";
  if (!list.length) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  grid.innerHTML = list.map(p => cardHTML(p, "reveal")).join("");
  grid.querySelectorAll(".productCard").forEach((card,i)=>{
    card.style.transitionDelay = (i%6)*70 + "ms";
    enableTilt(card);
  });
  observeReveals();
}

function renderFeatured(){
  const row = document.getElementById("featuredRow");
  row.innerHTML = products.filter(p=>p.featured).map(p=>cardHTML(p,"featuredCard flex-shrink-0 w-[300px]")).join("");
  row.querySelectorAll(".productCard").forEach(enableTilt);
}

function handleSearch(){
  const v = document.getElementById("searchInput").value;
  const mobile = document.getElementById("searchInputMobile");
  if (mobile && mobile.value !== v) mobile.value = v;
  applyFilters();
}
function syncSearch(v){
  document.getElementById("searchInput").value = v;
  applyFilters();
}
function applyFilters(){
  renderProducts(currentList());
}
function filterCategory(category, button){
  activeCategory = category;
  document.querySelectorAll(".filterBtn").forEach(btn=>btn.classList.remove("active"));
  if (button) button.classList.add("active");
  const grid = document.getElementById("productsGrid");
  grid.style.opacity = "0";
  grid.style.transform = "translateY(14px)";
  setTimeout(()=>{
    applyFilters();
    grid.style.opacity = "1";
    grid.style.transform = "none";
  }, 180);
}

function enableTilt(card){
  if (window.innerWidth < 768) return;
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = `perspective(1000px) rotateX(${((y/rect.height)-.5)*-10}deg) rotateY(${((x/rect.width)-.5)*10}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", ()=> card.style.transform = "");
}

function openQuickView(id){
  const p = products.find(x=>x.id===id);
  if (!p) return;
  document.getElementById("quickViewContent").innerHTML = `
    <div class="flex justify-end mb-3">
      <button onclick="closeQuickView()" class="text-white/40 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="relative h-80 sm:h-[430px] rounded-2xl overflow-hidden border border-amber-500/15">
        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover">
      </div>
      <div>
        <div class="text-[10px] uppercase tracking-[.3em] text-amber-300/80 mb-2">${p.category} · ${p.status}</div>
        <h3 class="font-cinzel text-3xl mb-3">${p.title}</h3>
        <p class="text-white/55 text-sm leading-relaxed mb-5">${p.desc}</p>
        <dl class="grid grid-cols-2 gap-3 text-xs text-white/50 mb-6">
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Origin</dt><dd>${p.origin}</dd></div>
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Year</dt><dd>${p.year}</dd></div>
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Material</dt><dd>${p.material}</dd></div>
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Edition</dt><dd>${p.edition}</dd></div>
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">SKU</dt><dd>${p.sku}</dd></div>
          <div><dt class="uppercase tracking-[.2em] text-[9px] text-amber-200/60">Valuation</dt><dd class="text-amber-200">${money(p.price)}</dd></div>
        </dl>
        <button onclick="addToCart(${p.id});closeQuickView();toggleCart(true)" class="goldBtn w-full py-3.5 rounded-full text-[11px] tracking-[.25em] uppercase font-semibold">Request this piece</button>
      </div>
    </div>`;
  document.getElementById("quickViewModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeQuickView(){
  document.getElementById("quickViewModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const existing = cart.find(x=>x.id===id);
  if (existing) existing.qty += 1;
  else cart.push({...p, qty:1});
  renderCart();
}
function changeQty(id, d){
  const item = cart.find(x=>x.id===id);
  if (!item) return;
  item.qty += d;
  if (item.qty < 1) cart = cart.filter(x=>x.id!==id);
  renderCart();
}
function renderCart(){
  const wrap = document.getElementById("cartItems");
  const badge = document.getElementById("cartBadge");
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById("cartTotal").textContent = money(total);
  if (count) {
    badge.textContent = count;
    badge.classList.remove("hidden");
    badge.classList.add("flex");
  } else {
    badge.classList.add("hidden");
    badge.classList.remove("flex");
  }
  if (!cart.length) {
    wrap.innerHTML = `<p class="text-white/35 text-sm">Your allocation list is empty.</p>`;
    return;
  }
  wrap.innerHTML = cart.map(item => `
    <div class="flex gap-3 border border-amber-500/10 rounded-2xl p-3">
      <img src="${item.img}" alt="" class="w-16 h-16 object-cover rounded-xl">
      <div class="flex-1">
        <div class="text-sm">${item.title}</div>
        <div class="text-amber-200 text-xs mt-1">${money(item.price)}</div>
        <div class="flex items-center gap-2 mt-2 text-xs">
          <button onclick="changeQty(${item.id},-1)" class="w-6 h-6 border border-amber-500/20 rounded">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id},1)" class="w-6 h-6 border border-amber-500/20 rounded">+</button>
        </div>
      </div>
    </div>`).join("");
}
function toggleCart(forceOpen){
  const modal = document.getElementById("cartModal");
  if (forceOpen === true) modal.classList.remove("hidden");
  else modal.classList.toggle("hidden");
  document.body.style.overflow = modal.classList.contains("hidden") ? "" : "hidden";
}

function processOrder(e){
  e.preventDefault();
  if (!cart.length) return;
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const total = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  const items = cart.map(item => `• ${item.title} (${item.sku}) x${item.qty} — ${money(item.price*item.qty)}`).join("\n");
  const message = `*ÉLVARA PRIVÉ — PRIVATE CONCIERGE REQUEST*\n\n*Client:* ${name}\n*Contact:* ${phone}\n*Delivery:* ${address}\n\n*PRIVATE COLLECTION:*\n${items}\n\n*TOTAL VALUATION:* ${money(total)}`;
  window.open("https://wa.me/923234749637?text="+encodeURIComponent(message), "_blank");
}

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
function observeReveals(){
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
}

function countUp(){
  document.querySelectorAll("[data-count]").forEach(el=>{
    const target = +el.dataset.count;
    const start = performance.now();
    const tick = now => {
      const t = Math.min(1, (now-start)/1400);
      el.textContent = Math.floor(target * (1-Math.pow(1-t,3)));
      if (t<1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  });
}

window.addEventListener("scroll", ()=>{
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY>20);
});
document.addEventListener("keydown", e=>{
  if (e.key==="Escape"){
    closeQuickView();
    document.getElementById("cartModal").classList.add("hidden");
    document.body.style.overflow = "";
  }
});
document.getElementById("quickViewModal").addEventListener("click", e=>{
  if (e.target.id==="quickViewModal") closeQuickView();
});
document.getElementById("cartModal").addEventListener("click", e=>{
  if (e.target.id==="cartModal") toggleCart();
});

renderFilters();
renderFeatured();
renderProducts(products);
renderCart();
observeReveals();
countUp();
setTimeout(()=>document.getElementById("luxuryLoader").classList.add("loaded"), 2300);
