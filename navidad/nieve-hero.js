/* AK-POT · Nieve cinematográfica SOLO en el Hero (Canvas, sin librerías).
   3 capas de profundidad (lejos/medio/cerca), copos suaves desenfocados, viento lento,
   animación por tiempo (dt) sin saltos, pausa fuera de pantalla / pestaña oculta,
   anima siempre (ignora prefers-reduced-motion, ver RESPETAR_MOVIMIENTO_REDUCIDO). Se activa con <html class="xmasc">. */
(function(){
  /* true  = respeta 'reducir movimiento' del sistema (nieve quieta). false = siempre animada. */
  var RESPETAR_MOVIMIENTO_REDUCIDO=false;
  /* Para probar: agregar nieve=on a la dirección (ej. index.html?nieve=on) fuerza la animación aunque el sistema reduzca el movimiento. */
  var forzar=/nieve=on\b/.test(location.href);
  var d=document,root=d.documentElement,hero=d.querySelector('.hero,.page-hero');
  if(!hero)return;
  var cv=d.createElement('canvas');cv.className='xc-snow';cv.setAttribute('aria-hidden','true');
  hero.insertBefore(cv,hero.firstChild);
  var ctx=cv.getContext('2d'),W=0,H=0,dpr=1,F=[],raf=0,last=0,t=0,vis=true;
  var calm=matchMedia('(prefers-reduced-motion:reduce)');
  function sprite(soft){
    var s=64,c=d.createElement('canvas');c.width=c.height=s;var g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);
    if(soft){r.addColorStop(0,'rgba(255,246,232,.85)');r.addColorStop(.4,'rgba(255,246,232,.34)');r.addColorStop(1,'rgba(255,246,232,0)');}
    else{r.addColorStop(0,'rgba(255,249,240,1)');r.addColorStop(.5,'rgba(255,249,240,.9)');r.addColorStop(.78,'rgba(255,249,240,.22)');r.addColorStop(1,'rgba(255,249,240,0)');}
    g.fillStyle=r;g.fillRect(0,0,s,s);return c;}
  var S=sprite(true),M=sprite(false);
  /* capas: tamaño (radio px), velocidad (px/s), opacidad, viento, proporción */
  var L=[{sp:S,r:[1.6,2.6],v:[10,18],a:[.40,.60],wd:3,sh:.46},
         {sp:M,r:[1.2,2.1],v:[20,34],a:[.62,.92],wd:6,sh:.40},
         {sp:S,r:[3.2,5.2],v:[36,58],a:[.42,.68],wd:10,sh:.14}];
  function rnd(a,b){return a+Math.random()*(b-a);}
  function make(i){var l=L[i];return{l:l,x:rnd(0,W),y:rnd(0,H),r:rnd(l.r[0],l.r[1]),v:rnd(l.v[0],l.v[1]),a:rnd(l.a[0],l.a[1]),
    amp:rnd(5,16)*(1+i*.6),ph:rnd(0,6.28),fr:rnd(.35,.9)};}
  function layerOf(){var q=Math.random();return q<L[0].sh?0:q<L[0].sh+L[1].sh?1:2;}
  function size(){
    var nw=hero.clientWidth,nh=hero.clientHeight;if(!nw||!nh)return;
    var vw=root.clientWidth;if(nw<vw-4){nw=vw;cv.style.cssText='left:50%;right:auto;width:'+vw+'px;transform:translateX(-50%)';}else cv.style.cssText='';
    var sx=W?nw/W:1,sy=H?nh/H:1;W=nw;H=nh;dpr=Math.min(devicePixelRatio||1,2);
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
    var n=Math.round(Math.max(34,Math.min(W<700?52:120,W*H/9000)));
    F.forEach(function(f){f.x*=sx;f.y*=sy;});
    while(F.length<n)F.push(make(layerOf()));F.length=n;
    if(!raf)draw();}
  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    for(var i=0;i<F.length;i++){var f=F[i],x=f.x+Math.sin(f.ph)*f.amp,
      fade=Math.min(1,(f.y+f.r)/48,(H-f.y)/(H*.3));if(fade<=0)continue;
      ctx.globalAlpha=f.a*fade;ctx.drawImage(f.l.sp,x-f.r,f.y-f.r,f.r*2,f.r*2);}
    ctx.globalAlpha=1;}
  function tick(now){
    if(!last)last=now;var dt=Math.min((now-last)/1000,.05);last=now;t+=dt;
    var wind=Math.sin(t*.13)*.6+Math.sin(t*.37+1)*.4;
    for(var i=0;i<F.length;i++){var f=F[i];
      f.y+=f.v*dt;f.ph+=f.fr*dt;f.x+=wind*f.l.wd*dt;
      if(f.y>H+f.r*2){f.y=-f.r*2;f.x=rnd(0,W);}
      if(f.x<-40)f.x+=W+80;else if(f.x>W+40)f.x-=W+80;}
    draw();raf=requestAnimationFrame(tick);}
  function run(){
    cancelAnimationFrame(raf);raf=0;last=0;
    if(!root.classList.contains('xmasc')){ctx.clearRect(0,0,cv.width,cv.height);return;}
    size();
    var quieta=calm.matches&&RESPETAR_MOVIMIENTO_REDUCIDO&&!forzar;
    if(quieta){console.info('[AK-POT nieve] En pausa: tu sistema tiene activado "reducir movimiento". Para verla animada agregá ?nieve=on a la dirección.');}
    else if(vis)console.info('[AK-POT nieve] Animando '+F.length+' copos.');
    if(quieta||!vis||d.hidden){draw();return;}
    raf=requestAnimationFrame(tick);}
  window.xcRefresh=run;
  if('ResizeObserver' in window){var to;new ResizeObserver(function(){clearTimeout(to);to=setTimeout(function(){if(root.classList.contains('xmasc'))size();},120);}).observe(hero);}
  else addEventListener('resize',function(){size();});
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;run();},{threshold:0}).observe(hero);
  d.addEventListener('visibilitychange',run);
  if(calm.addEventListener)calm.addEventListener('change',run);
  run();
})();
