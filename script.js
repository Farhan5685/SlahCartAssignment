    const searchIcon = document.querySelector('.bi-search');
  const searchPopup = document.getElementById('searchPopup');
  const searchInput = document.querySelector('.search-input');

  searchIcon.addEventListener('click', () => {
    searchPopup.style.display = 'flex';
    searchInput.focus();
  });

  function closeSearch() {
    searchPopup.style.display = 'none';
  }

  // ESC key closes popup
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  const cartIcon = document.querySelector('.bi-cart');
const cartPopup = document.getElementById('cartPopup');

cartIcon.addEventListener('click', () => {
  cartPopup.classList.add('open');
});

function closeCart() {
  cartPopup.classList.remove('open');
}

document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closeCart();
  }
});
  
  
  /*for ourcollection*/
document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slidesContainer = slider.querySelector('[data-slides]');
    const slides = slider.querySelectorAll('.collection-slide');
    const prevBtn = slider.querySelector('[data-prev]');
    const nextBtn = slider.querySelector('[data-next]');
    const dots = slider.querySelectorAll('[data-dots] span');

    let index = 0;

    function updateSlider() {
      const slideWidth = slides[0].offsetWidth + 20;
      const offset = -index * slideWidth;
      slidesContainer.style.transform = `translateX(${offset}px)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + dots.length) % dots.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % dots.length;
      updateSlider();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
      });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  });

/*end collection*/
const products={
coffee:[
{name:"Panama Coffee",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£13.50",image:"images/packet 10 (1).png",type:"coffee"},
{name:"Peru Coffee",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£12.00",image:"images/packet 7 (1).png",type:"coffee"},
{name:"Panama Coffee",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£13.50",image:"images/packet 10 (1).png",type:"coffee"}
],
capsule:[
{name:"House Espresso Capsules",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£13.50",image:"images/capsul2.png",type:"capsule"},
{name:"House Espresso Capsules",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£16.25",image:"images/capsul2.png",type:"capsule"},
{name:"House Espresso Capsules",desc:"Introducing El Vergel Estate, a vibrant new coffee from the Bayter family’s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.",price:"£13.50",image:"images/capsul2.png",type:"capsule"}
],
all:[]
};
products.all=[...products.coffee,...products.capsule];
const galleryImages={
coffee:["images/np1.png","images/np2.png","images/np3.png","images/np4.png"],
capsule:["images/capsul.png"],
all:["images/np1.png","images/np2.png","images/np3.png","images/np4.png"]
};
let swiperInstance=null;
function loadProducts(category){
const wrapper=document.getElementById("productSliderContent");
wrapper.innerHTML="";
products[category].forEach((p,i)=>{
const slide=document.createElement("div");
slide.className="swiper-slide";
let bgColor="#fff";
if(p.type==="capsule"){bgColor=(i%2===0)?"#C2C4C3":"#D3D3CB";}
else if(p.type==="coffee"){bgColor=(i%2===0)?"#D6DBDA":"#D3D3CB";}
slide.innerHTML=`
<div class="card-hover shadow-sm position-relative" style="background:${bgColor}">
<img src="${p.image}" alt="${p.name}" class="${p.type==='capsule'?'capsule-image':''}">
<div class="p-3">
<h5>${p.name}</h5>
<p class="mb-1">${p.desc}</p>
<strong>${p.price}</strong>
</div>
<button class="buy-now">Buy Now</button>
</div>`;
wrapper.appendChild(slide);
});
initSwiper();
}
function loadGallery(category){
const grid=document.getElementById("galleryGrid");
grid.innerHTML="";
const imgs=galleryImages[category];
if(category==="capsule"){
grid.classList.add("single-image");
const el=document.createElement("a");
el.className="gallery-hover";
el.href="#";
el.innerHTML=`<img src="${imgs[0]}" alt="gallery image">`;
grid.appendChild(el);
}else{
grid.classList.remove("single-image");
imgs.slice(0,4).forEach(src=>{
const el=document.createElement("a");
el.className="gallery-hover";
el.href="#";
el.innerHTML=`<img src="${src}" alt="gallery image">`;
grid.appendChild(el);
});
}
}
function initSwiper(){
if(swiperInstance!==null){
try{swiperInstance.destroy(true,true);}catch(e){}
swiperInstance=null;
}
swiperInstance=new Swiper(".mySwiper",{
slidesPerView:2,
spaceBetween:20,
navigation:{
nextEl:".swiper-button-next",
prevEl:".swiper-button-prev"
},
breakpoints:{
0:{slidesPerView:1},
768:{slidesPerView:2}
}
});
}
document.querySelectorAll("#productTabs .nav-link").forEach(tab=>{
tab.addEventListener("click",e=>{
e.preventDefault();
document.querySelector("#productTabs .active").classList.remove("active");
tab.classList.add("active");
const cat=tab.dataset.category;
loadProducts(cat);
loadGallery(cat);
});
});
loadProducts("coffee");
loadGallery("coffee");
