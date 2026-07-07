const body = document.body;
const toggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

// Explicit choice (from a previous visit) always wins. Otherwise, follow the
// visitor's OS-level preference instead of defaulting to dark for everyone.
const useLight = savedTheme ? savedTheme === 'light' : prefersLight;

if (useLight) {
  body.classList.add('light');
}

function syncToggleState() {
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(body.classList.contains('light')));
  }
}
syncToggleState();

if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    syncToggleState();
  });
}
