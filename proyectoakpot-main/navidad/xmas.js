/* AK-POT · nieve suave + luces + saludo. Respeta prefers-reduced-motion. */
(function(){
  var d=document, root=d.documentElement;
  var lights=d.createElement('div'); lights.className='xmas-lights'; lights.setAttribute('aria-hidden','true'); d.body.appendChild(lights);
  var cv=d.createElement('canvas'); cv.id='xmas-snow'; cv.setAttribute('aria-hidden','true'); d.body.appendChild(cv);
  var fb=d.querySelector('.footer__bottom');
  if(fb){var g=d.createElement('div'); g.className='xmas-greet'; g.textContent='Felices Fiestas de parte del equipo AK-POT'; fb.parentNode.insertBefore(g,fb);}
  var ctx=cv.getContext('2d'), W,H,flakes=[], raf, still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function size(){var r=devicePixelRatio||1;W=cv.width=innerWidth*r;H=cv.height=innerHeight*r;}
  function init(){size();var n=innerWidth<700?22:42;flakes=[];for(var i=0;i<n;i++)flakes.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.6+.8)*(devicePixelRatio||1),v:Math.random()*.5+.25,s:Math.random()*Math.PI*2});}
  function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle='#fff';
    flakes.forEach(function(f){f.y+=f.v;f.s+=.01;f.x+=Math.sin(f.s)*.35;if(f.y>H+5){f.y=-5;f.x=Math.random()*W;}
      ctx.globalAlpha=.35+f.r/6;ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.283);ctx.fill();});
    if(!still&&root.classList.contains('xmas'))raf=requestAnimationFrame(draw);}
  window.xmasRefresh=function(){cancelAnimationFrame(raf);if(root.classList.contains('xmas')){init();draw();}};
  addEventListener('resize',function(){if(root.classList.contains('xmas'))init();});
  window.xmasRefresh();
})();
