(function(){
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.site-nav-toggle');
  var links = document.querySelector('.site-nav-links');
  var scrim = document.querySelector('.site-nav-scrim');
  if (!nav) return;

  function onScroll(){
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  function closeMenu(){
    toggle.classList.remove('open');
    links.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu(){
    toggle.classList.add('open');
    links.classList.add('open');
    if (scrim) scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (toggle && links) {
    toggle.addEventListener('click', function(){
      if (links.classList.contains('open')) closeMenu();
      else openMenu();
    });
  }
  if (scrim) scrim.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });
})();
