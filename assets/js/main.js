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

// Reinforce the homepage as the canonical identity page for Sergio Lopez Dubon.
// This keeps the existing visual design while making the name, role and linked
// profiles explicit for browsers and search engines that execute JavaScript.
if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
  document.title = 'Sergio Lopez Dubon | Applied AI Scientist & Research Software';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      'content',
      'Sergio Lopez Dubon is an applied AI scientist and research software engineer specialising in digital twins, scientific machine learning, anomaly detection, sensor-data QA/QC and engineering systems.'
    );
  }

  const heroHeading = document.querySelector('.hero h1');
  if (heroHeading) {
    heroHeading.textContent = 'Sergio Lopez Dubon';
  }

  const heroLead = document.querySelector('.hero .lead');
  if (heroLead) {
    heroLead.textContent = 'Applied AI scientist and research software engineer developing machine-learning, digital-twin and reproducible software workflows for sensor-rich engineering and environmental systems.';
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sergioald.github.io/#website',
        url: 'https://sergioald.github.io/',
        name: 'Sergio Lopez Dubon',
        alternateName: 'Sergio Lopez Dubon Portfolio'
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://sergioald.github.io/#profile',
        url: 'https://sergioald.github.io/',
        name: 'Sergio Lopez Dubon | Applied AI Scientist',
        isPartOf: { '@id': 'https://sergioald.github.io/#website' },
        mainEntity: { '@id': 'https://sergioald.github.io/#person' }
      },
      {
        '@type': 'Person',
        '@id': 'https://sergioald.github.io/#person',
        name: 'Sergio Lopez Dubon',
        alternateName: 'sergioald',
        url: 'https://sergioald.github.io/',
        image: 'https://avatars.githubusercontent.com/u/46924516?v=4',
        jobTitle: 'Applied AI Scientist and Research Fellow',
        affiliation: {
          '@type': 'Organization',
          name: 'The University of Edinburgh'
        },
        sameAs: [
          'https://github.com/sergioald',
          'https://www.linkedin.com/in/sergio-lopez-dubon/',
          'https://orcid.org/0000-0003-0663-607X',
          'https://www.research.ed.ac.uk/en/persons/sergio-lopez-dubon/',
          'https://scholar.google.com/citations?user=0-u25RgAAAAJ'
        ],
        knowsAbout: [
          'Applied artificial intelligence',
          'Digital twins',
          'Scientific machine learning',
          'Anomaly detection',
          'Sensor data',
          'Structural health monitoring',
          'Hydrology',
          'Research software engineering'
        ]
      }
    ]
  };

  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify(structuredData);
  document.head.appendChild(jsonLd);
}
