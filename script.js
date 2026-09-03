const WHATSAPP_NUMBER="212600000000";
const INSTAGRAM_URL="https://instagram.com/noir.time";

const PRODUCTS=[
{id:1,name:"Black Steel",category:"Classique",price:349,old:399,badge:"BEST-SELLER",img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=90",desc:"Une montre acier noir au design sobre et puissant."},
{id:2,name:"Executive Gold",category:"Luxe",price:449,old:499,badge:"PREMIUM",img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=90",desc:"Une pièce raffinée avec une finition dorée élégante."},
{id:3,name:"Urban Chrono",category:"Chronographe",price:399,old:459,badge:"NOUVEAU",img:"https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=90",desc:"Un chronographe moderne pour un style urbain affirmé."},
{id:4,name:"Titanium Sport",category:"Sport",price:329,badge:"",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=90",desc:"Un modèle sportif pensé pour un style actif et moderne."},
{id:5,name:"Silver Classic",category:"Classique",price:299,badge:"",img:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=90",desc:"Une silhouette classique et intemporelle."},
{id:6,name:"Midnight Gold",category:"Luxe",price:479,old:549,badge:"EXCLUSIF",img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=90",desc:"Un cadran sombre associé à une finition dorée premium."},
{id:7,name:"Racing Black",category:"Sport",price:359,old:399,badge:"PROMO",img:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=90",desc:"Un design dynamique inspiré de l'univers automobile."},
{id:8,name:"Prestige Chrono",category:"Chronographe",price:429,badge:"",img:"https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=900&q=90",desc:"Un chronographe élégant avec une forte présence au poignet."}
];

let cart=JSON.parse(localStorage.getItem("noirTimeCart")||"[]");
let current=null,quantity=1;

const money=n=>n.toLocaleString("fr-FR")+" DH";
document.querySelectorAll("#instagramLink,#heroInstagram,#instagramBottom,#footerInstagram").forEach(a=>a.href=INSTAGRAM_URL);
document.getElementById("footerWhatsApp").href=`https://wa.me/${WHATSAPP_NUMBER}`;

function render(list=PRODUCTS){
 document.getElementById("products").innerHTML=list.map(p=>`
 <article>
  <div class="productImage" style="background-image:url('${p.img}')">${p.badge?`<span class="badge">${p.badge}</span>`:""}</div>
  <div class="productInfo">
   <small>${p.category.toUpperCase()}</small>
   <h3>${p.name}</h3>
   <div><strong>${money(p.price)}</strong>${p.old?` <span class="old">${money(p.old)}</span>`:""}</div>
   <div class="productBtns"><button onclick="openProduct(${p.id})">Voir</button><button onclick="addToCart(${p.id})">Ajouter</button></div>
  </div>
 </article>`).join("");
}

function addToCart(id,n=1){
 let item=cart.find(x=>x.id===id);
 if(item)item.qty+=n;else cart.push({id,qty:n});
 saveCart();showToast("Produit ajouté au panier ✓");
}
function saveCart(){localStorage.setItem("noirTimeCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 let total=0;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{
  let p=PRODUCTS.find(a=>a.id===x.id);total+=p.price*x.qty;
  return `<div class="cartItem"><img src="${p.img}"><div><h4>${p.name}</h4><p>${x.qty} × ${money(p.price)}</p></div><button onclick="removeItem(${p.id})">×</button></div>`;
 }).join(""):"<p style='text-align:center;color:#888;padding:40px'>Votre panier est vide.</p>";
 document.getElementById("cartTotal").textContent=money(total);
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}

function openProduct(id){
 current=PRODUCTS.find(p=>p.id===id);quantity=1;
 document.getElementById("modalCategory").textContent=current.category;
 document.getElementById("modalName").textContent=current.name;
 document.getElementById("modalPrice").textContent=money(current.price);
 document.getElementById("modalDescription").textContent=current.desc;
 document.getElementById("modalImage").style.backgroundImage=`url('${current.img}')`;
 document.getElementById("quantity").textContent=1;
 document.getElementById("productModal").classList.add("open");
}
function closeProduct(){document.getElementById("productModal").classList.remove("open")}

function orderWhatsApp(items=cart.map(x=>({...x,p:PRODUCTS.find(p=>p.id===x.id)}))){
 if(!items.length){showToast("Votre panier est vide");return}
 let total=0,msg="Bonjour NOIR TIME, je souhaite commander :\n\n";
 items.forEach(x=>{let p=x.p||x,q=x.qty||1;total+=p.price*q;msg+=`• ${p.name} × ${q} — ${money(p.price*q)}\n`});
 msg+=`\nTotal : ${money(total)}\n\nNom :\nVille :\nAdresse :\nTéléphone :`;
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
}

document.querySelectorAll(".filters button,.categories button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));
 if(b.closest(".filters"))b.classList.add("active");
 const f=b.dataset.filter;render(f==="Tous"?PRODUCTS:PRODUCTS.filter(p=>p.category===f));
 document.getElementById("shop").scrollIntoView({behavior:"smooth"});
});

document.getElementById("cartBtn").onclick=()=>{document.getElementById("cart").classList.add("open");document.getElementById("cartBg").classList.add("open")};
document.getElementById("closeCart").onclick=()=>{document.getElementById("cart").classList.remove("open");document.getElementById("cartBg").classList.remove("open")};
document.getElementById("cartBg").onclick=document.getElementById("closeCart").onclick;
document.getElementById("modalClose").onclick=closeProduct;
document.getElementById("modalBg").onclick=closeProduct;
document.getElementById("minus").onclick=()=>{if(quantity>1)quantity--;document.getElementById("quantity").textContent=quantity};
document.getElementById("plus").onclick=()=>{quantity++;document.getElementById("quantity").textContent=quantity};
document.getElementById("modalAdd").onclick=()=>{addToCart(current.id,quantity);closeProduct()};
document.getElementById("modalOrder").onclick=()=>orderWhatsApp([{...current,qty:quantity}]);
document.getElementById("checkout").onclick=()=>orderWhatsApp();
document.getElementById("clearCart").onclick=()=>{cart=[];saveCart()};

document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchOverlay").classList.add("open");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchOverlay").classList.remove("open");
document.getElementById("searchInput").oninput=e=>{
 let q=e.target.value.toLowerCase().trim();
 render(PRODUCTS.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q)));
};
document.getElementById("mobileBtn").onclick=()=>document.getElementById("mobileNav").classList.toggle("open");
document.querySelectorAll(".mobileNav a").forEach(a=>a.onclick=()=>document.getElementById("mobileNav").classList.remove("open"));

function showToast(text){let e=document.getElementById("toast");e.textContent=text;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2000)}
render();renderCart();