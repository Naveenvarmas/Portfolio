// src/data/constants.js
// ─── All static data for Naveen Varma Portfolio ───────────────────

export const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const PROFILE_IMG =
  'https://drive.google.com/uc?export=view&id=1mqPKHtzYM37jy3GQqwzPuXiepIdpvnO6'

export const NAV_SECTIONS = ['profile', 'about', 'technologies', 'projects']

// ── Orbit nodes around the profile avatar ──
export const ORBIT_NODES = [
  { id: 0, name: 'React',    src: `${CDN}/react/react-original.svg`,            desc: 'Component-based UI library for dynamic frontends' },
  { id: 1, name: 'Node.js',  src: `${CDN}/nodejs/nodejs-original.svg`,           desc: 'JavaScript runtime for fast server-side apps' },
  { id: 2, name: 'Express',  src: `${CDN}/express/express-original.svg`,         desc: 'Minimal web framework for Node.js REST APIs', invert: true },
  { id: 3, name: 'MongoDB',  src: `${CDN}/mongodb/mongodb-original.svg`,         desc: 'NoSQL database used with Atlas cloud integration' },
  { id: 4, name: 'JS',       src: `${CDN}/javascript/javascript-original.svg`,   desc: 'Core language powering the full-stack development' },
  { id: 5, name: 'Java',     src: `${CDN}/java/java-original.svg`,               desc: 'Object-oriented backend programming language' },
  { id: 6, name: 'Tailwind', src: `${CDN}/tailwindcss/tailwindcss-original.svg`, desc: 'Utility-first CSS framework for rapid UI design' },
  { id: 7, name: 'Git',      src: `${CDN}/git/git-original.svg`,                 desc: 'Version control & code collaboration platform' },
]

// ── Technology tabs ──
export const TECH_TABS = [
  {
    id: 'frontend', label: 'Frontend', icon: '🎨',
    skills: [
      { name: 'React.js',     src: `${CDN}/react/react-original.svg`,            pct: 92 },
      { name: 'Tailwind CSS', src: `${CDN}/tailwindcss/tailwindcss-original.svg`, pct: 90 },
      { name: 'JavaScript',   src: `${CDN}/javascript/javascript-original.svg`,   pct: 95 },
      { name: 'HTML5',        src: `${CDN}/html5/html5-original.svg`,             pct: 88 },
      { name: 'CSS3',         src: `${CDN}/css3/css3-original.svg`,               pct: 86 },
    ],
    icons: [
      { name: 'React.js',     src: `${CDN}/react/react-original.svg`,            tip: 'Component-based UI library for dynamic frontends.' },
      { name: 'Tailwind CSS', src: `${CDN}/tailwindcss/tailwindcss-original.svg`, tip: 'Utility-first framework for rapid UI design.' },
      { name: 'JavaScript',   src: `${CDN}/javascript/javascript-original.svg`,   tip: 'Core language. ES6+ features used throughout.' },
      { name: 'HTML5',        src: `${CDN}/html5/html5-original.svg`,             tip: 'Semantic markup for web structure.' },
      { name: 'CSS3',         src: `${CDN}/css3/css3-original.svg`,               tip: 'Flexbox, Grid, animations & responsive design.' },
    ],
  },
  {
    id: 'backend', label: 'Backend', icon: '⚙️',
    skills: [
      { name: 'Node.js',    src: `${CDN}/nodejs/nodejs-original.svg`,   pct: 88 },
      { name: 'Express.js', src: `${CDN}/express/express-original.svg`, pct: 85, invert: true },
      { name: 'Java',       src: `${CDN}/java/java-original.svg`,       pct: 82 },
      { name: 'REST APIs',  emoji: '🔌',                                  pct: 83 },
    ],
    icons: [
      { name: 'Node.js',    src: `${CDN}/nodejs/nodejs-original.svg`,   tip: 'JS runtime for fast server-side applications.' },
      { name: 'Express.js', src: `${CDN}/express/express-original.svg`, tip: 'Minimal Node.js framework for REST APIs.', invert: true },
      { name: 'Java',       src: `${CDN}/java/java-original.svg`,       tip: 'OOP backend language used in full-stack training.' },
      { name: 'REST APIs',  emoji: '🔌',                                  tip: 'Designed & consumed RESTful endpoints via Axios.' },
    ],
    experience: true,
  },
  {
    id: 'database', label: 'Database', icon: '🗄️',
    skills: [
      { name: 'MongoDB',     src: `${CDN}/mongodb/mongodb-original.svg`, pct: 85 },
      { name: 'MySQL',       src: `${CDN}/mysql/mysql-original.svg`,     pct: 78 },
      { name: 'Atlas Cloud', emoji: '☁️',                                  pct: 80 },
    ],
    icons: [
      { name: 'MongoDB',     src: `${CDN}/mongodb/mongodb-original.svg`, tip: 'NoSQL document database. Used with Atlas cloud.' },
      { name: 'MySQL',       src: `${CDN}/mysql/mysql-original.svg`,     tip: 'Relational DBMS for structured data storage.' },
      { name: 'Atlas Cloud', emoji: '☁️',                                  tip: 'Cloud-hosted MongoDB used in MERN projects.' },
    ],
  },
  {
    id: 'devtools', label: 'Dev Tools', icon: '🛠️',
    skills: [
      { name: 'Git',     src: `${CDN}/git/git-original.svg`,        pct: 90 },
      { name: 'GitHub',  src: `${CDN}/github/github-original.svg`,  pct: 90, invert: true },
      { name: 'Postman', src: `${CDN}/postman/postman-original.svg`, pct: 85 },
      { name: 'VS Code', src: `${CDN}/vscode/vscode-original.svg`,   pct: 88 },
      { name: 'Render',  emoji: '☁️',                                  pct: 75 },
    ],
    icons: [
      { name: 'Git',     src: `${CDN}/git/git-original.svg`,        tip: 'Distributed version control for source code.' },
      { name: 'GitHub',  src: `${CDN}/github/github-original.svg`,  tip: 'Code hosting, collaboration & open source.', invert: true },
      { name: 'Postman', src: `${CDN}/postman/postman-original.svg`, tip: 'API testing, documentation & debugging tool.' },
      { name: 'VS Code', src: `${CDN}/vscode/vscode-original.svg`,   tip: 'Primary code editor with rich extensions.' },
      { name: 'Render',  emoji: '☁️',                                  tip: 'Cloud platform used to deploy both MERN projects.' },
    ],
  },
  {
    id: 'statetools', label: 'State & API', icon: '🔄',
    skills: [
      { name: 'React Query', emoji: '🔄', pct: 80 },
      { name: 'Zustand',     emoji: '🗃️', pct: 78 },
      { name: 'Axios',       emoji: '📡', pct: 83 },
    ],
    icons: [
      { name: 'React Query', emoji: '🔄', tip: 'Server state management — caching, sync, updates.' },
      { name: 'Zustand',     emoji: '🗃️', tip: 'Lightweight global state management for React.' },
      { name: 'Axios',       emoji: '📡', tip: 'Promise-based HTTP client for REST API calls.' },
      { name: 'REST APIs',   emoji: '🔌', tip: 'Built & integrated RESTful APIs across projects.' },
    ],
  },
]

// ── Projects ──
export const PROJECTS = [
  {
    num: '01',
    name: 'ThinkBoard',
    year: '2025 · MERN Notes Management App',
    desc: 'Full-stack notes management app with CRUD operations via RESTful APIs, Zustand for global state, React Query for server state, and MongoDB Atlas. Deployed live on Render.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Zustand', 'Tailwind', 'Render'],
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=75&fit=crop',
    imgAlt: 'ThinkBoard Notes App',
    stackIcons: [
      `${CDN}/react/react-original.svg`,
      `${CDN}/nodejs/nodejs-original.svg`,
      `${CDN}/mongodb/mongodb-original.svg`,
    ],
    live: 'https://mern-thinkboard-w3ti.onrender.com/',
    github: 'https://github.com/Naveenvarmas/Mern-Thinkboard',
  },
  {
    num: '02',
    name: 'MERN Product Store',
    year: '2025 · Full Stack CRUD Application',
    desc: 'Product management app with REST APIs built using Node.js & Express.js. Modern React frontend with Zustand & React Query. Deployed on Render with full production config.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'React Query', 'REST API', 'Render'],
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&q=75&fit=crop',
    imgAlt: 'MERN Product Store',
    stackIcons: [
      `${CDN}/react/react-original.svg`,
      `${CDN}/express/express-original.svg`,
      `${CDN}/mongodb/mongodb-original.svg`,
    ],
    live: 'https://mern-product-store-kiz1.onrender.com/',
    github: 'https://github.com/Naveenvarmas/MERN-Product-Store',
  },
  {
    num: '03',
    name: 'Real-Time Chat Application',
    year: '2026 · Full Stack CHAT Application',
    desc: 'Product management app with REST APIs built using Node.js & Express.js. Modern React frontend with Zustand & React Query. Deployed on Render with full production config.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Zustand','Socket.io','Tailwind.css','Daisy-Ui', 'REST API', 'Render'],
    img: 'https://s3-alpha.figma.com/hub/file/4556150764/93ed97e9-4722-4f2b-81d0-5ad290bd8f79-cover.png',
    imgAlt: 'MERN Product Store',
    stackIcons: [
      `${CDN}/react/react-original.svg`,
      `${CDN}/express/express-original.svg`,
      `${CDN}/mongodb/mongodb-original.svg`,
    ],
    live: 'https://mern-product-store-kiz1.onrender.com/',
    github: 'https://github.com/Naveenvarmas/MERN-Product-Store',
  },
]

// ── About section info & services ──
export const INFO_ITEMS = [
  { label: 'Location', value: 'Bhimavaram, India' },
  { label: 'Email',    value: 'sagirajunaveenvarma@gmail.com', small: true },
  { label: 'Phone',    value: '+91 9392368439' },
  { label: 'Status',   value: 'Open to Work ✓', green: true },
]

export const SERVICES = [
  { num:'01', icon:'🌐', name:'Custom Web Development',  desc:'Tailored websites built with modern stacks. Fully responsive and fast.',            bg:'rgba(0,212,255,.1)', delay:80  },
  { num:'02', icon:'⚙️', name:'Full-Stack Applications', desc:'End-to-end web apps from frontend to backend, scalable and secure.',                  bg:'rgba(124,58,237,.1)',delay:160 },
  { num:'03', icon:'🔌', name:'API Development',         desc:'RESTful APIs for clean, secure data communication between services.',                  bg:'rgba(0,229,160,.1)', delay:240 },
  { num:'04', icon:'🗄️', name:'Database Design',         desc:'MongoDB & MySQL schema design with Atlas cloud integration.',                          bg:'rgba(251,146,60,.1)',delay:320 },
]

// ── Stat boxes ──
export const STATS = [
  { n: '2',    l: 'Live Apps' },
  { n: 'MERN', l: 'Stack'    },
  { n: '7.3',  l: 'CGPA'     },
  { n: '2025', l: 'Grad'     },
]
