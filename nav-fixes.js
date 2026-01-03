// Mobile menu toggle so nav stays reachable on small screens
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('header nav');
  if(!toggle || !nav) return;

  toggle.addEventListener('click', function(){
    nav.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked (improves UX during overlays)
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      if(nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
});
