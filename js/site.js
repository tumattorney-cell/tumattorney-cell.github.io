(function(){
  var d=document,b=d.body;
  var lang=(b.getAttribute('data-lang')||'th');
  var isEn=lang==='en';
  // Thai text inside mono labels: drop wide tracking
  d.querySelectorAll('.mono,.eyebrow,.caption span,.col .top span,.col .k,.card .k,.facts dt,.nap dt,.facts .h span,.contact-lines small,.ft h6,.grouph span,.list-mini span,.f,.tag,.stats small,.t th,.side .grp,.matrix-wrap h5,.detail .k,.axis span,.months span,.ins .mono span,.ins .mono b,.ins .more,.sig small,.win-title,.tfoot span,.legal span,.more-link,.col-link,.mock-label,.dg-head span,.form label,.article-meta,.crumbs,.post .i,table.kv th,.card .more').forEach(function(el){if(/[\u0E00-\u0E7F]/.test(el.textContent))el.classList.add('th-mono')});
  // matrix cells (risk-map mockup)
  var mx=d.getElementById('mx');
  if(mx){var heat=[3,3,4,5,5,2,3,3,4,5,1,2,3,3,4,1,1,2,3,3,0,1,1,2,3];
    var col=['rgba(86,184,132,.05)','rgba(86,184,132,.10)','rgba(201,162,75,.08)','rgba(201,162,75,.14)','rgba(200,96,63,.14)','rgba(200,96,63,.24)'];
    var first=mx.firstChild;
    heat.forEach(function(h){var i=d.createElement('i');i.style.background=col[h];mx.insertBefore(i,first)});
  }
  // mobile menu
  var btn=d.querySelector('.burger');
  var openLab=isEn?'Open menu':'เปิดเมนู';
  var closeLab=isEn?'Close menu':'ปิดเมนู';
  function setMenu(o){b.classList.toggle('menu-open',o);if(btn){btn.setAttribute('aria-expanded',o?'true':'false');btn.setAttribute('aria-label',o?closeLab:openLab)}}
  if(btn){
    btn.addEventListener('click',function(){setMenu(!b.classList.contains('menu-open'))});
    d.querySelectorAll('.mnav a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
    d.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
    window.addEventListener('resize',function(){if(window.innerWidth>1120)setMenu(false)});
  }
  // contact form -> mailto
  var f=d.getElementById('contact-form');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(n){return (f.elements[n]&&f.elements[n].value||'').trim()};
    var subj, body;
    if(isEn){
      subj='LAKP enquiry — '+(v('topic')||'Contact LAKP');
      body=['Name: '+v('name'),'Organisation/role: '+v('org'),'Email or phone for reply: '+v('reply'),'Topic: '+v('topic'),'','Brief details:',v('msg')].join('\n');
    }else{
      subj='ติดต่อ LAKP — '+(v('topic')||'ติดต่อ LAKP');
      body=['ชื่อ: '+v('name'),'องค์กร/ตำแหน่ง: '+v('org'),'อีเมลหรือเบอร์ติดต่อกลับ: '+v('reply'),'เรื่องที่สนใจ: '+v('topic'),'','รายละเอียดโดยสังเขป:',v('msg')].join('\n');
    }
    window.location.href='mailto:center@legaladvisor-lakp.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  })}
  // reveal
  var rv=d.querySelectorAll('.rv');
  if(/[?&]static/.test(location.search)||!('IntersectionObserver' in window)){d.documentElement.classList.add('no-anim');return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  rv.forEach(function(el){if(el.closest('.hero')){setTimeout(function(){el.classList.add('in')},60)}else io.observe(el)});
})();

(function(){var v=new URLSearchParams(window.location.search).get("service");var f=document.querySelector("[name=topic]");if(f&&["Project","Retainer","Setup"].indexOf(v)!==-1&&!f.value)f.value=v;})();
