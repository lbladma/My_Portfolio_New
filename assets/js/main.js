document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-navigation');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded')==='true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      nav.style.display = expanded?'':'block';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target=document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); if(window.innerWidth<1000 && nav){nav.style.display='';navToggle.setAttribute('aria-expanded','false');}}});
  });

  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      status.textContent='';
      const name=form.name?.value.trim();
      const email=form.email?.value.trim();
      const message=form.message?.value.trim();
      if(name.length<2){status.textContent='Enter your name (2+ chars)';status.style.color='crimson';form.name.focus();return;}
      if(!/^\S+@\S+\.\S+$/.test(email)){status.textContent='Valid email required';status.style.color='crimson';form.email.focus();return;}
      if(message.length<10){status.textContent='Message too short';status.style.color='crimson';form.message.focus();return;}
      status.textContent='Message validated (Formspree endpoint needed)';status.style.color='#2b6cb0';
    });
  }
});
