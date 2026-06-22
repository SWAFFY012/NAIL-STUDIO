const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  sparkle: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8 3.5-3.6" />
    </svg>
  ),
  gem: (p) => (
    <svg {...base} {...p}>
      <path d="M6 3h12l3 5-9 13L3 8l3-5z" />
      <path d="M3 8h18M9 3l3 5 3-5M12 8l0 13" />
    </svg>
  ),
  moon: (p) => (
    <svg {...base} {...p}>
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 109.8 9.8z" />
    </svg>
  ),
  star: (p) => (
    <svg {...base} fill="currentColor" stroke="none" {...p}>
      <path d="M12 2.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L12 16.9 6.5 19.1l1.4-6.1L3.2 8.8l6.2-.6L12 2.5z" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  calendar: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 3v3M16 3v3" />
    </svg>
  ),
  phone: (p) => (
    <svg {...base} {...p}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L19 13l5 2v3a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-1z" />
    </svg>
  ),
  pin: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  instagram: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (p) => (
    <svg {...base} {...p}>
      <path d="M21 4L3 11l5 2 2 6 3-4 4 3 4-14z" />
      <path d="M8 13l9-6-6 8" />
    </svg>
  ),
}
