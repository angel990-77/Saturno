const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Palabras lindas para tu novia
const lunas = ["Amor", "Bella", "Tesoro", "Cielo", "Luz", "Corazón", "Mi Vida", "Estrella", "Dulzura", "Princesa"];

// Crear estrellas con parpadeo
const estrellas = [];
for (let i = 0; i < 250; i++) {
  estrellas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  });
}

let angulo = 0;

// Función para dibujar estrellas
function drawStars() {
  estrellas.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

// Función para dibujar Saturno y su anillo
function drawSaturno() {
  const saturnoRadius = 70;

  // Planeta
  ctx.beginPath();
  ctx.arc(centerX, centerY, saturnoRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#f4e842";
  ctx.fill();

  // Anillo con degradado
  const gradient = ctx.createRadialGradient(centerX, centerY, saturnoRadius, centerX, centerY, saturnoRadius+30);
  gradient.addColorStop(0, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0.8)");

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, saturnoRadius+30, saturnoRadius+15, angulo/2, 0, Math.PI*2);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 6;
  ctx.stroke();
}

// Función para dibujar las lunas con palabras
function drawLunas() {
  const saturnoRadius = 70;
  lunas.forEach((palabra, i) => {
    const angleOffset = (i / lunas.length) * Math.PI * 2;
    const moonX = centerX + Math.cos(angulo + angleOffset) * (saturnoRadius + 100);
    const moonY = centerY + Math.sin(angulo + angleOffset) * (saturnoRadius + 100);

    // Dibuja luna como círculo brillante
    ctx.beginPath();
    ctx.arc(moonX, moonY, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#a2d2ff";
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Escribir palabra
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(palabra, moonX, moonY);
  });
}

// Animación
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawStars();
  drawSaturno();
  drawLunas();
  angulo += 0.01; // velocidad rotación
  requestAnimationFrame(animate);
}

animate();

// Ajustar canvas al tamaño de pantalla
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

