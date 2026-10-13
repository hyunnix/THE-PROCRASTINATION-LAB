'use strict';

// These weights illustrate a rule; they are not psychological measurements.
const DEFAULTS = Object.freeze({ difficulty: 6, motivation: 4, distraction: 5 });
const PRESETS = Object.freeze({
  deadline: { difficulty: 9, motivation: 5, distraction: 8 },
  morning: { difficulty: 3, motivation: 9, distraction: 2 },
  scroll: { difficulty: 6, motivation: 2, distraction: 10 }
});
const STATES = {
  ready: { label: 'READY TO BEGIN', message: "Okay, let's do this!", support: 'Starting feels possible right now.', decorations: ['♡', '✧'] },
  hesitating: { label: 'HESITATING', message: "Maybe I'll start in five minutes...", support: "You're thinking about starting, but something is holding you back.", decorations: ['…', '?'] },
  avoiding: { label: 'AVOIDING', message: 'Suddenly, cleaning my desk sounds important.', support: 'Starting feels difficult in this situation.', decorations: ['z', 'z Z'] }
};
const inputs = Object.fromEntries(Object.keys(DEFAULTS).map(key => [key, document.getElementById(key)]));
const presetButtons = [...document.querySelectorAll('[data-preset]')];
let announcementTimer;

function calculateReadiness({ difficulty, motivation, distraction }) {
  return Math.max(0, Math.min(100, 50 + motivation * 6 - difficulty * 4 - distraction * 4));
}

function getState(score) {
  return score >= 65 ? 'ready' : score >= 35 ? 'hesitating' : 'avoiding';
}

function render() {
  const values = {};
  for (const [key, input] of Object.entries(inputs)) {
    values[key] = Number(input.value);
    const output = document.getElementById(`${key}-value`);
    output.replaceChildren(document.createTextNode(input.value));
    const denominator = document.createElement('span');
    denominator.textContent = '/10';
    output.append(denominator);
    input.style.setProperty('--fill', `${((values[key] - 1) / 9) * 100}%`);
  }
  const score = calculateReadiness(values);
  const state = getState(score);
  const reaction = STATES[state];
  document.getElementById('score').textContent = score;
  document.getElementById('readiness-meter').setAttribute('aria-valuenow', score);
  document.querySelector('.progress-fill').style.width = `${score}%`;
  document.querySelector('.observation').dataset.state = state;
  document.getElementById('state-label').textContent = reaction.label;
  document.getElementById('reaction-message').textContent = reaction.message;
  document.getElementById('reaction-support').textContent = reaction.support;
  document.querySelector('.deco-left').textContent = reaction.decorations[0];
  document.querySelector('.deco-right').textContent = reaction.decorations[1];
  presetButtons.forEach(button => {
    const preset = PRESETS[button.dataset.preset];
    button.setAttribute('aria-pressed', Object.keys(DEFAULTS).every(key => values[key] === preset[key]));
  });
  // Keep the visible output immediate; coalesce spoken score updates while dragging.
  clearTimeout(announcementTimer);
  announcementTimer = setTimeout(() => {
    document.getElementById('announcement').textContent = `Fictional readiness: ${score} percent. ${reaction.label}. ${reaction.message} ${reaction.support}`;
  }, 180);
}

function applyValues(values) {
  Object.entries(values).forEach(([key, value]) => { inputs[key].value = value; });
  render();
}

Object.values(inputs).forEach(input => input.addEventListener('input', render));
presetButtons.forEach(button => button.addEventListener('click', () => applyValues(PRESETS[button.dataset.preset])));
document.getElementById('reset').addEventListener('click', () => applyValues(DEFAULTS));
applyValues(DEFAULTS);
