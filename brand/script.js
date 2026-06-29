const panels = document.querySelectorAll('.ai-panel');
window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  panels.forEach((panel, index) => {
    const strength = index === 0 ? 0.8 : 0.45;
    panel.style.translate = `${x * strength}px ${y * strength}px`;
  });
});
