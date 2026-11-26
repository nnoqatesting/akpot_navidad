/* AK-POT · Navidad festiva (B): guirnalda, gorro, nieve, cartel y saludo */
(function(){var d=document,root=d.documentElement;
 function el(t,c,p){var e=d.createElement(t);e.className=c;e.setAttribute('aria-hidden','true');(p||d.body).appendChild(e);return e;}
 el('div','xb-bar');el('div','xb-garland');
 var lg=d.querySelector('.header__logo');if(lg)el('i','xb-hat',lg);
 var tag=d.querySelector('.hero .tag');if(tag){var p=d.createElement('span');p.className='xb-pill';p.textContent='❄ Felices Fiestas';tag.parentNode.insertBefore(p,tag.nextSibling);}
 var ft=d.querySelector('.footer');if(ft){var g=d.createElement('div');g.className='xb-greet';g.innerHTML='🎄 Felices Fiestas de parte del equipo <b>AK-POT</b> 🎄';ft.insertBefore(g,ft.firstChild);}
 var cv=el('canvas','');cv.id='xb-snow';cv.className='';var x=cv.getContext('2d'),W,H,F=[],raf;
 var still=matchMedia('(prefers-reduced-motion:reduce)').matches,r=devicePixelRatio||1;
 function init(){W=cv.width=innerWidth*r;H=cv.height=innerHeight*r;var n=innerWidth<700?40:85;F=[];
  for(var i=0;i<n;i++)F.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*2.6+1)*r,v:Math.random()*.9+.4,s:Math.random()*6.28});}
 function draw(){x.clearRect(0,0,W,H);x.fillStyle='#fff';
  F.forEach(function(f){f.y+=f.v;f.s+=.012;f.x+=Math.sin(f.s)*.5;if(f.y>H+6){f.y=-6;f.x=Math.random()*W;}
   x.globalAlpha=.45+f.r/(7*r);x.beginPath();x.arc(f.x,f.y,f.r,0,6.283);x.fill();});
  if(!still&&root.classList.contains('xmasb'))raf=requestAnimationFrame(draw);}
 window.xbRefresh=function(){cancelAnimationFrame(raf);if(root.classList.contains('xmasb')){init();draw();}};
 addEventListener('resize',function(){if(root.classList.contains('xmasb'))init();});xbRefresh();
})();
