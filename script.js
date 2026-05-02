const animatedText = document.getElementById('animated-text');
const cursor = document.querySelector('.cursor');
const rectangle = document.querySelector('.rectangle');

const texts = [
    'Java Developer',
    'UI Designer',
    'Web Developer',
    'Szef Szefow',
    'Yeee'
];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < texts[textIndex].length) {
    animatedText.textContent += texts[textIndex][charIndex];
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(deleteEffect, 2000);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    animatedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteEffect, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeEffect, 500);
  }
}

typeEffect();

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  const xRotation = ((clientY / innerHeight) - 0.5) * 20;
  const yRotation = ((clientX / innerWidth) - 0.5) * -20;
  rectangle.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
});

const titleText = "@Mejszu";
let titleIndex = 0;
function animateTitle() {
  document.title = titleText.substring(0, titleIndex) + (titleIndex < titleText.length ? "|" : "");
  titleIndex++;
  if (titleIndex <= titleText.length) {
    setTimeout(animateTitle, 150);
  } else {
    setTimeout(() => { titleIndex = 0; animateTitle(); }, 1000);
  }
}
animateTitle();

document.querySelectorAll('.link-card').forEach(link => {
  link.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-8px) scale(1.05)'; });
  link.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
});

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;
  const moveX = (clientX - innerWidth / 2) * 0.01;
  const moveY = (clientY - innerHeight / 2) * 0.01;
  document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

const audio = document.getElementById('bg-music');
function tryPlay() {
  audio.play().catch(() => {
    document.addEventListener('click', () => audio.play(), { once: true });
    document.addEventListener('keydown', () => audio.play(), { once: true });
  });
}
tryPlay();

function enterSite() {
  const overlay = document.getElementById('intro-overlay');
  overlay.style.transition = 'opacity 0.8s ease';
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), 800);
  audio.play().catch(() => {});
}
