const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function spark(x, y) {
  for (let i = 0; i < 12; i++) {
    particles.push({
      x, y,
      size: Math.random() * 5 + 4,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      a: 1
    });
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx; p.y+=p.vy; p.a-=0.015;
    ctx.globalAlpha=p.a;
    ctx.fillStyle="#e6cf8b";
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    if(p.a<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

function submitForm(e) {
  e.preventDefault();

  const btn = e.target.querySelector("button");
  const r = btn.getBoundingClientRect();
  spark(r.left + r.width/2, r.top + r.height/2);

  // 🔗 DÁN URL GOOGLE APPS SCRIPT VÀO ĐÂY
  fetch("https://script.google.com/macros/s/AKfycbwZerscr44pc9qFF1SRBx0AqCo8lIcu5WR0fnILzjzD-SS62jSVdns_B1dodX8YI08rBg/exec", {
    method: "POST",
    body: new FormData(e.target)
  });

  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 900);
}
