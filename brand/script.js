const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform += ' translateY(20px)';
  setTimeout(() => {
    card.style.transition = 'opacity .9s ease, transform .9s ease';
    card.style.opacity = '1';
    card.style.transform = card.style.transform.replace(' translateY(20px)', '');
  }, 220 + i * 120);
});
