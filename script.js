const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

const queryInput = document.getElementById('queryInput');
const askButton = document.getElementById('askButton');
const resultCard = document.getElementById('resultCard');
const analysisStatus = document.getElementById('analysisStatus');
const statusText = document.getElementById('statusText');

const responses = [
  {
    match: 'slider',
    title: 'Three hitters show a sharp decline against breaking balls over the last 14 days.',
    metrics: [['Whiff Rate', '+18%'], ['Chase Rate', '+11%'], ['Hard Contact', '−9%']],
    text: 'Recommended action: Review first-pitch breaking ball approach and prioritize zone recognition work before the next series.'
  },
  {
    match: 'command',
    title: 'One late-inning pitcher shows a measurable command drop after pitch 22.',
    metrics: [['Zone Rate', '−13%'], ['Walk Risk', '+19%'], ['Release Spread', '+7.2cm']],
    text: 'Recommended action: Shorten warm-up exposure and prepare a matchup-based replacement before the third batter faced.'
  },
  {
    match: 'undervalued',
    title: 'Two player profiles show improving contact quality before surface results have caught up.',
    metrics: [['xwOBA Trend', '+.041'], ['Barrel Signal', '+8%'], ['Market Gap', 'High']],
    text: 'Recommended action: Flag as scouting targets and compare against salary, role availability, and defensive fit.'
  }
];

function generateInsight() {
  const query = queryInput.value.toLowerCase();
  const found = responses.find((item) => query.includes(item.match)) || responses[0];
  resultCard.style.opacity = 0.35;
  analysisStatus.hidden = false;
  const steps = ['Analyzing game data...', 'Detecting player signals...', 'Building decision context...', 'Generating Gambit insight...'];
  let i = 0;
  statusText.textContent = steps[i];
  const interval = setInterval(() => {
    i += 1;
    if (i < steps.length) statusText.textContent = steps[i];
  }, 520);
  setTimeout(() => {
    clearInterval(interval);
    analysisStatus.hidden = true;
    resultCard.innerHTML = `
      <p class="eyebrow">Gambit Insight</p>
      <h3>${found.title}</h3>
      <div class="signal-grid">
        ${found.metrics.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}
      </div>
      <p class="result-text">${found.text}</p>
    `;
    resultCard.style.opacity = 1;
  }, 2300);
}

askButton.addEventListener('click', generateInsight);
queryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generateInsight();
});

document.querySelectorAll('.sample-queries button').forEach((button) => {
  button.addEventListener('click', () => {
    queryInput.value = button.dataset.query;
    generateInsight();
  });
});
