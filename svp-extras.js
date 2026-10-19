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
    /* Official links: adds the TS Registrations dashboard link inside the existing "Registration & Stamps" card. Adds only. */
    (function(){
      var URL_='https://registration.telangana.gov.in/RSDB/docsRegistered.htm';
      function add(){
        var cards=document.querySelectorAll('.svx-gov-card');
        for(var i=0;i<cards.length;i++){
          var c=cards[i],h=c.querySelector('h4');
          if(!h||h.textContent.indexOf('Registration')!==0||c.querySelector('#svp-regdash'))continue;
          var br=document.createElement('br');
          var a=document.createElement('a');a.id='svp-regdash';a.className='svx-open';a.href=URL_;a.target='_blank';a.rel='noopener noreferrer';
          a.textContent='\u0C24\u0C46\u0C32\u0C02\u0C17\u0C3E\u0C23 \u0C30\u0C3F\u0C1C\u0C3F\u0C38\u0C4D\u0C1F\u0C4D\u0C30\u0C47\u0C37\u0C28\u0C4D\u0C32\u0C41 - \u0C05\u0C27\u0C3F\u0C15\u0C3E\u0C30\u0C3F\u0C15 \u0C21\u0C3E\u0C37\u0C4D\u200C\u0C2C\u0C4B\u0C30\u0C4D\u0C21\u0C4D / TS Registrations Dashboard \u2197';
          c.appendChild(br);c.appendChild(a);
        }
      }
      var p=false;
      new MutationObserver(function(){if(p)return;p=true;setTimeout(function(){p=false;try{add()}catch(e){}},300)}).observe(document.body,{childList:true,subtree:true});
      add();
    })();
    /* Compass: small pill opens a live compass (phone sensor) with N/E/S/W and a "plot faces" helper. Adds only. */
    (function(){
      if(document.getElementById('svp-compass-link'))return;
      var pill=document.createElement('button');pill.id='svp-compass-link';pill.type='button';
      pill.textContent='\uD83E\uDDED Compass \u00B7 \u0C26\u0C3F\u0C36\u0C32\u0C41';
      pill.setAttribute('style','position:fixed;right:12px;bottom:190px;z-index:54;background:#092744;color:#9df0c0;border:1px solid #35d49a;border-radius:999px;padding:6px 12px;font:600 12px system-ui,sans-serif;white-space:nowrap;line-height:1.3;margin:0;box-sizing:border-box;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer');
      document.body.appendChild(pill);
      var DIRS=[['N','\u0C09\u0C24\u0C4D\u0C24\u0C30\u0C02',0],['NE','\u0C08\u0C36\u0C3E\u0C28\u0C4D\u0C2F\u0C02',45],['E','\u0C24\u0C42\u0C30\u0C4D\u0C2A\u0C41',90],['SE','\u0C06\u0C17\u0C4D\u0C28\u0C47\u0C2F\u0C02',135],['S','\u0C26\u0C15\u0C4D\u0C37\u0C3F\u0C23\u0C02',180],['SW','\u0C28\u0C48\u0C30\u0C43\u0C24\u0C3F',225],['W','\u0C2A\u0C21\u0C2E\u0C30',270],['NW','\u0C35\u0C3E\u0C2F\u0C35\u0C4D\u0C2F\u0C02',315]];
      var ov=null,heading=null,listening=false,timer=null,target=null;
      function card(h){var i=Math.round(h/45)%8;return DIRS[i]}
      function norm(a){return ((a%360)+360)%360}
      function render(){
        if(!ov)return;
        var d=ov.querySelector('#svp-c-dial'),t=ov.querySelector('#svp-c-txt'),g=ov.querySelector('#svp-c-guide');
        if(heading===null)return;
        d.style.transform='rotate('+(-heading)+'deg)';
        var c=card(heading);t.textContent=Math.round(heading)+'\u00B0 \u00B7 '+c[0]+' ('+c[1]+')';
        if(target!==null){var diff=norm(target-heading);if(diff>180)diff-=360;var ad=Math.abs(diff);
          g.textContent=ad<=10?'\u2705 \u0C2E\u0C40\u0C30\u0C41 \u0C06 \u0C26\u0C3F\u0C36\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41 / You are facing it':(diff>0?'\u21BB Turn right ':'\u21BA Turn left ')+Math.round(ad)+'\u00B0'}
        else g.textContent='';
      }
      function onOri(e){
        var h=null;
        if(typeof e.webkitCompassHeading==='number'&&!isNaN(e.webkitCompassHeading))h=e.webkitCompassHeading;
        else if(e.alpha!==null&&e.alpha!==undefined&&(e.absolute||e.type==='deviceorientationabsolute'))h=norm(360-e.alpha);
        if(h===null)return;
        heading=h;clearTimeout(timer);var m=ov&&ov.querySelector('#svp-c-msg');if(m)m.textContent='';render();
      }
      function start(){
        var m=ov.querySelector('#svp-c-msg');
        function go(){
          if(!listening){listening=true;window.addEventListener('deviceorientationabsolute',onOri,true);window.addEventListener('deviceorientation',onOri,true)}
          m.textContent='\u0C38\u0C46\u0C28\u0C4D\u0C38\u0C30\u0C4D \u0C1A\u0C42\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C02... Reading sensor...';
          clearTimeout(timer);timer=setTimeout(function(){if(heading===null)m.textContent='\u0C08 device \u0C32\u0C4B compass sensor \u0C26\u0C4A\u0C30\u0C15\u0C32\u0C47\u0C26\u0C41. \u0C2B\u0C4B\u0C28\u0C4D \u0C32\u0C4B Chrome/Safari \u0C32\u0C4B \u0C24\u0C46\u0C30\u0C35\u0C02\u0C21\u0C3F, location/motion permission \u0C07\u0C35\u0C4D\u0C35\u0C02\u0C21\u0C3F. Compass sensor not available on this device or permission denied.'},3000);
        }
        try{
          if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
            DeviceOrientationEvent.requestPermission().then(function(r){if(r==='granted')go();else m.textContent='Permission denied. Settings > Safari > Motion & Orientation Access \u0C06\u0C28\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.'}).catch(function(){m.textContent='Permission error. Please try again.'});
          }else go();
        }catch(err){m.textContent='Compass not supported here.'}
      }
      function close(){if(ov){ov.remove();ov=null}window.removeEventListener('deviceorientationabsolute',onOri,true);window.removeEventListener('deviceorientation',onOri,true);listening=false;heading=null;target=null;clearTimeout(timer)}
      function open(){
        if(ov)return;
        ov=document.createElement('div');ov.id='svp-compass';
        ov.setAttribute('style','position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(3,10,20,.85);backdrop-filter:blur(6px)');
        var opts='<option value="">\u2014</option>'+DIRS.map(function(d){return '<option value="'+d[2]+'">'+d[0]+' \u00B7 '+d[1]+'</option>'}).join('');
        ov.innerHTML='<div role="dialog" aria-modal="true" aria-label="Compass" style="max-width:380px;width:100%;color:#e8f1fb;font:15px system-ui,sans-serif;text-align:center;background:linear-gradient(160deg,rgba(18,50,79,.97),rgba(5,11,20,.98));border:1px solid #35d49a;border-radius:16px;padding:18px;box-shadow:0 0 28px rgba(53,212,154,.2)">'
        +'<h2 style="margin:0 0 4px;font-size:19px;color:#f2c75c">\uD83E\uDDED Compass \u00B7 \u0C26\u0C3F\u0C36\u0C32\u0C41</h2>'
        +'<p style="margin:0 0 10px;font-size:12px;color:#b9cbe0">\u0C2A\u0C4D\u0C32\u0C3E\u0C1F\u0C4D \u0C26\u0C17\u0C4D\u0C17\u0C30 \u0C28\u0C3F\u0C32\u0C2C\u0C21\u0C3F \u0C2B\u0C4B\u0C28\u0C4D \u0C2A\u0C4D\u0C32\u0C47\u0C28\u0C4D\u0C17\u0C3E \u0C2A\u0C1F\u0C4D\u0C1F\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F. Stand at the plot, hold the phone flat.</p>'
        +'<div style="position:relative;width:220px;height:220px;margin:6px auto"><div style="position:absolute;left:50%;top:-6px;transform:translateX(-50%);color:#ff6b6b;font-size:16px">\u25BC</div>'
        +'<div id="svp-c-dial" style="width:220px;height:220px;border-radius:50%;border:2px solid #35d4ff;position:relative;background:radial-gradient(circle,#0b2238,#050b14);transition:transform .15s linear">'
        +'<b style="position:absolute;left:50%;top:6px;transform:translateX(-50%);color:#ff6b6b;font-size:20px">N</b>'
        +'<b style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#f2c75c;font-size:18px">E</b>'
        +'<b style="position:absolute;left:50%;bottom:6px;transform:translateX(-50%);color:#f2c75c;font-size:18px">S</b>'
        +'<b style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#f2c75c;font-size:18px">W</b>'
        +'<div style="position:absolute;left:50%;top:30px;bottom:50%;width:3px;margin-left:-1.5px;background:#ff6b6b;border-radius:2px"></div></div></div>'
        +'<div id="svp-c-txt" style="font-size:22px;font-weight:700;color:#7fe3ff;min-height:30px">\u2014</div>'
        +'<div id="svp-c-msg" style="font-size:12px;color:#ffb3b3;min-height:16px;margin:4px 0"></div>'
        +'<button id="svp-c-start" type="button" style="width:100%;min-height:46px;border:0;border-radius:10px;background:#0b5c3b;color:#fff;font:700 15px system-ui,sans-serif;margin-top:4px">Start compass \u00B7 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F</button>'
        +'<label style="display:block;margin-top:12px;font-size:13px;text-align:left">\u0C2A\u0C4D\u0C32\u0C3E\u0C1F\u0C4D facing (\u0C2E\u0C40\u0C15\u0C41 \u0C24\u0C46\u0C32\u0C3F\u0C38\u0C3F\u0C28\u0C26\u0C3F \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F) / Plot faces (pick if known)<select id="svp-c-sel" style="width:100%;margin-top:4px;padding:10px;border-radius:8px;border:1px solid #3b5a7a;background:#050c16;color:#fff;font-size:15px">'+opts+'</select></label>'
        +'<div id="svp-c-guide" style="margin-top:8px;font-size:14px;color:#9df0c0;min-height:20px"></div>'
        +'<p style="margin:8px 0 0;font-size:11px;color:#8aa3be">Phone compass can be off by some degrees near metal or electronics. Confirm plot facing from documents / Vastu expert. \u0C2B\u0C4B\u0C28\u0C4D compass \u0C32\u0C4B \u0C15\u0C4A\u0C02\u0C1A\u0C46\u0C02 \u0C24\u0C47\u0C21\u0C3E \u0C09\u0C02\u0C21\u0C35\u0C1A\u0C4D\u0C1A\u0C41.</p>'
        +'<button id="svp-c-x" type="button" style="margin-top:10px;background:none;border:1px solid #3b5a7a;color:#7fe3ff;border-radius:10px;padding:10px 16px;font-size:14px">Close \u00B7 \u0C2E\u0C42\u0C38\u0C3F\u0C35\u0C47\u0C2F\u0C02\u0C21\u0C3F</button></div>';
        document.body.appendChild(ov);
        ov.querySelector('#svp-c-x').onclick=close;
        ov.addEventListener('click',function(e){if(e.target===ov)close()});
        ov.querySelector('#svp-c-start').onclick=start;
        ov.querySelector('#svp-c-sel').onchange=function(){target=this.value===''?null:Number(this.value);render();if(target===null)ov.querySelector('#svp-c-guide').textContent=''};
      }
      pill.addEventListener('click',open);
    })();
  }catch(e){}
})();
