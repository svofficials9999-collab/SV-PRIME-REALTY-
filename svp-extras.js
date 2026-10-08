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
  }catch(e){}
})();
