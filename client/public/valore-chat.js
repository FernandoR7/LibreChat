(function () {
  var IVORY = '#f4efe7', COPPER = '#c97533';
  var SIM = '<svg viewBox="0 0 512 512" style="width:34px;height:34px;flex:0 0 auto" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="72" fill="#f4efe7"/><path d="M128 148L252 250L170 287L170 359C170 386 194 410 221 410L221 439C177 439 141 403 141 359V179L128 148Z" fill="#073b59"/><path d="M384 178V344L260 452V352C260 300 287 261 333 233C354 220 371 202 384 178Z" fill="#073b59"/><path d="M214 430V338C214 292 236 258 281 230C321 205 345 175 356 133L411 133V185L374 185C361 208 344 226 321 240C286 263 268 291 268 330V430H214Z" fill="#c97533"/><path d="M194 421V334C194 279 220 239 266 211C304 188 327 162 338 122H366C354 175 327 215 285 240C244 264 222 298 222 345V421H194Z" fill="#d0c1a7"/></svg>';
  function marca() {
    if (document.getElementById('valore-brand')) return;
    var nav = document.querySelector('aside nav') || document.querySelector('nav');
    if (!nav) return;
    var d = document.createElement('div');
    d.id = 'valore-brand';
    d.style.cssText = 'display:flex;align-items:center;gap:11px;padding:14px 16px 12px;flex:0 0 auto';
    d.innerHTML = SIM + '<span style="font-family:Sora,sans-serif;font-weight:600;font-size:18px;letter-spacing:0.12em;color:' + IVORY + '">VALO<span style="color:' + COPPER + '">R</span>E</span>';
    nav.insertBefore(d, nav.firstChild);
  }
  function footer() {
    document.querySelectorAll('a[href*="ibreChat"], a[href*="ibrechat"]').forEach(function (a) {
      var box = a.closest('div');
      if (box) box.style.display = 'none';
    });
  }
  function go() { try { marca(); footer(); } catch (e) {} }
  new MutationObserver(go).observe(document.body, { childList: true, subtree: true });
  go();
})();
