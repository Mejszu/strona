const texts = ['Java Developer','UI Designer','Web Developer','Szef Szefow','Yeee'];
let textIndex = 0, charIndex = 0;
const animatedText = document.getElementById('animated-text');
const rectangle = document.querySelector('.rectangle');

function typeEffect() {
  if (charIndex < texts[textIndex].length) {
    animatedText.textContent += texts[textIndex][charIndex++];
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(deleteEffect, 2000);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    animatedText.textContent = texts[textIndex].substring(0, --charIndex);
    setTimeout(deleteEffect, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeEffect, 500);
  }
}

const titleText = "@Mejszu";
let titleIndex = 0;
function animateTitle() {
  document.title = titleText.substring(0, titleIndex) + (titleIndex < titleText.length ? "|" : "");
  titleIndex = (titleIndex + 1) % (titleText.length + 1);
  setTimeout(animateTitle, titleIndex === 0 ? 1000 : 150);
}

document.addEventListener('mousemove', ({ clientX, clientY }) => {
  const { innerWidth, innerHeight } = window;
  rectangle.style.transform = `rotateX(${((clientY/innerHeight)-0.5)*20}deg) rotateY(${((clientX/innerWidth)-0.5)*-20}deg)`;
  document.body.style.backgroundPosition = `${50+(clientX-innerWidth/2)*0.01}% ${50+(clientY-innerHeight/2)*0.01}%`;
});

document.querySelectorAll('.link-card').forEach(link => {
  link.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-8px) scale(1.05)'; });
  link.addEventListener('mouseleave', function() { this.style.transform = ''; });
});

function freezeGif() {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.getElementById('intro-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    canvas.style.display = 'block';
    document.getElementById('intro-bg').style.display = 'none';
  };
  img.src = 'background.gif';
}

function enterSite() {
  const overlay = document.getElementById('intro-overlay');
  overlay.style.transition = 'opacity 0.8s ease';
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), 800);
  document.getElementById('bg-music').play().catch(() => {});
  typeEffect();
  animateTitle();
}

freezeGif();
