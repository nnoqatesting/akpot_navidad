/* AK-POT · Navidad "Noche de taller" (C): testigos, luces desenfocadas y mensajes */
(function(){var d=document;
 function mk(t,c,p){var e=d.createElement(t);e.className=c;if(c)e.setAttribute('aria-hidden','true');(p||d.body).appendChild(e);return e;}
 var led=mk('div','xc-led');var lg=d.querySelector('.header__logo');if(lg)mk('i','xc-hat',lg);mk('i','',led).setAttribute('aria-hidden','true');
 var bk=mk('div','xc-bokeh'),C=['255,74,85','255,178,62','56,199,121','255,178,62','255,74,85','217,180,90'];
 for(var i=0;i<9;i++){var s=mk('span','',bk),z=120+((i*47)%140),c=C[i%6];
  s.style.cssText='left:'+((i*37+8)%92)+'%;top:'+((i*53+12)%88)+'%;width:'+z+'px;height:'+z+'px;background:radial-gradient(circle,rgba('+c+',.95),rgba('+c+',0) 68%);--t:'+(38+i*6)+'s;--dx:'+((i%2?1:-1)*(30+i*6))+'px;--dy:'+((i%3?-1:1)*(24+i*5))+'px';}
 var tag=d.querySelector('.hero .tag');
 if(tag){var h=d.createElement('span');h.className='xc-hello';h.textContent='Felices fiestas';tag.parentNode.insertBefore(h,tag.nextSibling);}
 var ft=d.querySelector('.footer');
 if(ft){var f=d.createElement('div');f.className='xc-foot';f.innerHTML='Felices Fiestas de parte del equipo <b>AK-POT</b>';ft.insertBefore(f,ft.firstChild);}
})();
