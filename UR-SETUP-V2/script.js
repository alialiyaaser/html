/* ==========================================
   UR SETUP V2
   Premium JavaScript
========================================== */

// =============================
// Loader
// =============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    // مدة بقاء شاشة التحميل
    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1800); // ← غيّر الرقم حسب المدة المطلوبة

});

// =============================
// Header Scroll Effect
// =============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        header.style.background = "rgba(5,5,5,.92)";
        header.style.backdropFilter = "blur(20px)";

    } else {

        header.style.background = "rgba(5,5,5,.75)";

    }

});

// =============================
// Mobile Menu
// =============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

});

});

// =============================
// Counter Animation
// =============================

const counters = document.querySelectorAll(".counter");

const runCounter = () => {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const speed = target / 80;

        const update = () => {

            current += speed;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + "+";

            }

        };

        update();

    });

};

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

runCounter();

observer.disconnect();

}

});

});

const stats=document.querySelector(".stats");

if(stats){

observer.observe(stats);

}

// =============================
// Reveal Animation
// =============================

const revealElements = document.querySelectorAll(

".product-card,.why-card,.about-image,.about-content,.stat"

);

const reveal = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

revealElements.forEach(el=>{

el.classList.add("hidden");

reveal.observe(el);

});

// =============================
// Back To Top
// =============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

topBtn.classList.toggle(

"show",

window.scrollY>500

);

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};