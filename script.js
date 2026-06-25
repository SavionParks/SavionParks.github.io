const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const words = ['skills', 'projects', 'experience', 'contact', 'github', 'linkedin'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typed = document.getElementById('typed');
function typeLoop(){
  const word = words[wordIndex];
  if(!deleting){
    typed.textContent = word.slice(0, ++charIndex);
    if(charIndex === word.length){ deleting = true; setTimeout(typeLoop, 900); return; }
  } else {
    typed.textContent = word.slice(0, --charIndex);
    if(charIndex === 0){ deleting = false; wordIndex = (wordIndex + 1) % words.length; }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

document.getElementById('year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
