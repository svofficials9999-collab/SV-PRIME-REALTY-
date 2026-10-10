/* SV PRIME REALTY - small add-on features loaded after the main app. Add only; never replace app features. */
(function(){
  try{
    if(!document.getElementById('svp-aduri-link')){
      var a=document.createElement('a');
      a.id='svp-aduri-link';
      a.href='./aduri-dream-valley.html';
      a.textContent='Aduri Dream Valley \u00B7 Shadnagar \u2197';
      a.setAttribute('style','position:fixed;right:12px;bottom:112px;z-index:54;background:#092744;color:#f2c75c;border:1px solid #dfad39;border-radius:999px;padding:6px 12px;font:600 12px system-ui,sans-serif;text-decoration:none;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.25)');
      document.body.appendChild(a);
    }
    /* Enquiry upgrade: adds a "Send on WhatsApp" button + thank-you screen to the existing Contact form. Adds only; the original form and Copy/Open buttons stay. */
    (function(){
      var NUM='919177226638',busy=false;
      function field(form,start){
        var ls=form.querySelectorAll('label');
        for(var i=0;i<ls.length;i++){
          var t=(ls[i].firstChild&&ls[i].firstChild.nodeValue||ls[i].textContent||'').trim();
          if(t.toLowerCase().indexOf(start.toLowerCase())===0){var el=ls[i].querySelector('input,select,textarea');return el?(el.value||'').replace(/\s+/g,' ').trim():''}
        }
        return '';
      }
      function thanks(url){
        var o=document.getElementById('svp-ty');if(o)o.remove();
        o=document.createElement('div');o.id='svp-ty';
        o.setAttribute('style','position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(3,10,20,.82);backdrop-filter:blur(6px)');
        o.innerHTML='<div role="dialog" aria-modal="true" style="max-width:400px;width:100%;text-align:center;color:#e8f1fb;font:16px system-ui,sans-serif;background:linear-gradient(160deg,rgba(18,50,79,.95),rgba(5,11,20,.97));border:1px solid #35d4ff;border-radius:16px;padding:22px;box-shadow:0 0 28px rgba(53,212,255,.25)"><div style="font-size:46px">&#9989;</div><h2 style="margin:6px 0;color:#f2c75c;font-size:22px">\u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41! Thank you!</h2><p style="margin:8px 0">\u0C2E\u0C47\u0C2E\u0C41 \u0C24\u0C4D\u0C35\u0C30\u0C32\u0C4B call \u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C3E\u0C02.<br>We will call you soon.</p><p style="margin:8px 0;font-size:13px;color:#b9cbe0">WhatsApp \u0C32\u0C4B Send \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F\u0C28\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C2E\u0C3E \u0C26\u0C17\u0C4D\u0C17\u0C30\u0C15\u0C41 \u0C1A\u0C47\u0C30\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F. Your details reach us once you tap Send in WhatsApp.</p><a id="svp-ty-wa" target="_blank" rel="noopener noreferrer" style="display:block;margin-top:12px;padding:13px;border-radius:12px;background:#1b7a46;color:#fff;font-weight:700;text-decoration:none">WhatsApp open \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F \u00B7 Open WhatsApp</a><button id="svp-ty-x" type="button" style="margin-top:10px;background:none;border:1px solid #3b5a7a;color:#7fe3ff;border-radius:10px;padding:10px 16px;font-size:14px">Close \u00B7 \u0C2E\u0C42\u0C38\u0C3F\u0C35\u0C47\u0C2F\u0C02\u0C21\u0C3F</button></div>';
        document.body.appendChild(o);
        o.querySelector('#svp-ty-wa').href=url;
        o.querySelector('#svp-ty-x').onclick=function(){o.remove()};
      }
      function send(form,msgEl){
        var n=field(form,'Name'),m=field(form,'Mobile'),d=m.replace(/\D/g,'');
        if(d.length===12&&d.indexOf('91')===0)d=d.slice(2);
        if(!n||d.length<10){msgEl.textContent='\u0C2A\u0C47\u0C30\u0C41, 10 \u0C05\u0C02\u0C15\u0C46\u0C32 mobile number \u0C30\u0C3E\u0C2F\u0C02\u0C21\u0C3F / Please enter name and a 10-digit mobile number.';msgEl.style.color='#b42318';return}
        if(busy)return;busy=true;setTimeout(function(){busy=false},4000);msgEl.textContent='';
        var rows=[['Name / \u0C2A\u0C47\u0C30\u0C41',n],['Mobile',d.length===10?'+91 '+d:m],['WhatsApp',field(form,'WhatsApp number')],['Looking to',field(form,'Buy / Sell')],['Property type',field(form,'Property type')],['Area / Location',field(form,'Location')],['Budget',field(form,'Budget')],['Size',field(form,'Size')],['Preferred date',field(form,'Preferred date')],['Requirement',field(form,'Requirement')]];
        var t='Hello SV PRIME REALTY, new plot/property enquiry:';
        rows.forEach(function(r){if(r[1])t+='\n'+r[0]+': '+r[1]});
        var u='https://wa.me/'+NUM+'?text='+encodeURIComponent(t);
        thanks(u);
        var w=null;try{w=window.open(u,'_blank','noopener,noreferrer')}catch(e){}
        if(!w){setTimeout(function(){location.href=u},900)}
      }
      function enhance(){
        var form=document.querySelector('form.lead-form');
        if(!form||!form.querySelector('.lead-handoff')||document.getElementById('svp-wa-send'))return;
        var box=document.createElement('div');box.id='svp-wa-box';box.setAttribute('style','margin:14px 0');
        var b=document.createElement('button');b.type='button';b.id='svp-wa-send';
        b.textContent='WhatsApp \u0C32\u0C4B \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F \u00B7 Send on WhatsApp';
        b.setAttribute('style','width:100%;min-height:48px;border:0;border-radius:10px;background:#0b5c3b;color:#fff;font:700 16px system-ui,sans-serif;cursor:pointer');
        var m=document.createElement('p');m.setAttribute('role','alert');m.setAttribute('style','margin:6px 0 0;font-size:13px');
        var s=document.createElement('p');s.setAttribute('style','margin:6px 0 0;font-size:12px;color:#5d6a75');s.textContent='Opens WhatsApp with these details filled in. Tap Send there. \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C2E\u0C41\u0C02\u0C26\u0C47 \u0C30\u0C3E\u0C38\u0C3F \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.';
        b.addEventListener('click',function(){send(form,m)});
        box.appendChild(b);box.appendChild(m);box.appendChild(s);
        var h=form.querySelector('.lead-handoff');h.parentNode.insertBefore(box,h);
      }
      var pend=false;
      new MutationObserver(function(){if(pend)return;pend=true;setTimeout(function(){pend=false;try{enhance()}catch(e){}},200)}).observe(document.body,{childList:true,subtree:true});
      enhance();
    })();
  }catch(e){}
})();
