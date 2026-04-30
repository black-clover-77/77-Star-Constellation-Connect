const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSparkle() {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000 + Math.random() * 1000, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}

for(let i=0; i<30; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const x = Math.random() * (window.innerWidth - 20) + 10;
    const y = Math.random() * (window.innerHeight - 20) + 10;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    document.body.appendChild(star);
    
    star.addEventListener('click', () => {
        playSparkle();
        points.push({x: x + 3, y: y + 3});
        if(points.length > 1) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#fff';
            ctx.beginPath();
            ctx.moveTo(points[points.length-2].x, points[points.length-2].y);
            ctx.lineTo(x + 3, y + 3);
            ctx.stroke();
        }
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
