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
    title: '최근 14일 동안 변화구 대응력이 급격히 떨어진 타자 3명이 감지되었습니다.',
    metrics: [['헛스윙률', '+18%'], ['유인구 스윙률', '+11%'], ['강한 타구', '−9%']],
    text: '추천 액션: 다음 시리즈 전, 초구 변화구 대응 전략과 존 인식 훈련을 우선 점검하세요.'
  },
  {
    match: 'command',
    title: '후반 이닝에서 22구 이후 제구 지표가 뚜렷하게 떨어지는 투수 1명이 감지되었습니다.',
    metrics: [['존 투구율', '−13%'], ['볼넷 위험', '+19%'], ['릴리스 분산', '+7.2cm']],
    text: '추천 액션: 불펜 대기 시간을 줄이고, 세 번째 타자 전에 매치업 기반 교체 옵션을 준비하세요.'
  },
  {
    match: 'undervalued',
    title: '표면 성적보다 먼저 타구 질 개선 신호를 보이는 저평가 선수 2명이 감지되었습니다.',
    metrics: [['xwOBA 추세', '+.041'], ['배럴 신호', '+8%'], ['시장 괴리', '높음']],
    text: '추천 액션: 스카우팅 타깃으로 표시하고 연봉, 역할 가능성, 수비 적합성을 함께 비교하세요.'
  }
];

function generateInsight() {
  const query = queryInput.value.toLowerCase();
  const found = responses.find((item) => query.includes(item.match)) || responses[0];
  resultCard.style.opacity = 0.35;
  analysisStatus.hidden = false;
  const steps = ['경기 데이터를 분석하는 중...', '선수 신호를 감지하는 중...', '의사결정 맥락을 구성하는 중...', 'Gambit 인사이트를 생성하는 중...'];
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
      <p class="eyebrow">Gambit 인사이트</p>
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
