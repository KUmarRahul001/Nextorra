/**
 * Portfolio / Engineering Projects — Rahul Kumar
 * Single source of truth for portfolio showcases built by Rahul Kumar.
 */

export type ProjectCategory =
  | 'AI Telephony & Automation'
  | 'ERP & Accounting'
  | 'Enterprise Engineering'
  | 'EdTech & ERP'
  | 'FinTech & Monorepo'
  | 'Cloud Infrastructure'
  | 'Web App'
  | 'Mobile App';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  isDemo: boolean;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  year?: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'eazzio-remind-telecaller',
    title: 'Eazzio Remind & Telecaller — AI Automated Voice Follow-Up Suite',
    category: 'AI Telephony & Automation',
    tags: ['Node.js', 'Python', 'SIP Trunking', 'WebRTC', 'PostgreSQL', 'LiveKit', 'Asterisk'],
    description: 'Automated outbound telecalling dialer and omni-channel reminder engine for overdue accounts, student fee collections, and customer renewal callbacks with real-time call disposition logging.',
    isDemo: false,
    images: ['/portfolio/stitch-fieldsense.png'],
    liveUrl: 'https://github.com/KUmarRahul001/social-automation',
    githubUrl: 'https://github.com/KUmarRahul001/social-automation',
    year: 2026,
    featured: true,
  },
  {
    id: 'eazzio-books',
    title: 'Eazzio-Books — Accounting & Business Finance ERP',
    category: 'ERP & Accounting',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Flutter', 'TypeScript', 'Tailwind CSS'],
    description: 'Full-stack enterprise accounting software covering customer/vendor workflows, double-entry ledgers, quotations, tax invoices, banking feeds, and audit trails.',
    isDemo: false,
    images: ['/portfolio/stitch-accounting.png', '/portfolio/eazzio-books.jpeg'],
    liveUrl: 'https://github.com/KUmarRahul001/Eazzio-Books',
    githubUrl: 'https://github.com/KUmarRahul001/Eazzio-Books',
    year: 2026,
    featured: true,
  },
  {
    id: 'eazzio-payroll-ffms',
    title: 'Eazzio Payroll & FFMS — Field Force Telemetry & Employee Management',
    category: 'Enterprise Engineering',
    tags: ['Next.js', 'Node.js', 'Flutter', 'PostgreSQL', 'Google Maps API', 'Docker'],
    description: 'Real-time GPS tracking for field personnel, dynamic polygonal geofencing with breach alerts, selfie biometric shift check-in, and automated payroll calculations.',
    isDemo: false,
    images: ['/portfolio/eazzio-payroll.png', '/portfolio/stitch-fieldsense.png'],
    liveUrl: 'https://github.com/KUmarRahul001/Eazzio-Payroll',
    githubUrl: 'https://github.com/KUmarRahul001/Eazzio-Payroll',
    year: 2026,
    featured: true,
  },
  {
    id: 'eazzio-school-erp',
    title: 'Eazzio-School — AI-Assisted Educational ERP Platform',
    category: 'EdTech & ERP',
    tags: ['React', 'TypeScript', 'Vite', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Glassmorphism educational management ERP featuring 4 distinct role workspaces (Principal, Teacher, Student, Accountant), live roll call sheets, fee ledgers, and attendance shortage alerts.',
    isDemo: false,
    images: ['/portfolio/stitch-eazzio-school.png', '/portfolio/eazzio-school.png'],
    liveUrl: 'https://github.com/KUmarRahul001/Eazzio-School',
    githubUrl: 'https://github.com/KUmarRahul001/Eazzio-School',
    year: 2026,
    featured: true,
  },
  {
    id: 'kc-invest-monorepo',
    title: 'KC Invest — Multiuser Client & Investment Management Platform',
    category: 'FinTech & Monorepo',
    tags: ['TypeScript', 'Fastify', 'Turborepo', 'React', 'Drizzle ORM', 'PostgreSQL', 'Playwright'],
    description: 'High-throughput monorepo architecture with Fastify REST APIs, Drizzle ORM schemas, and 5 separate portals for client onboarding, sales pipelines, admin controls, and partner deliverables.',
    isDemo: false,
    images: ['/portfolio/stitch-a2z-solifix.png', '/portfolio/kc-invest.png'],
    liveUrl: 'https://github.com/KUmarRahul001',
    githubUrl: 'https://github.com/KUmarRahul001',
    year: 2026,
    featured: true,
  },
  {
    id: 'eazzio-mail-suite',
    title: 'Eazzio Mail — High-Volume Transactional & Inbound Mail Suite',
    category: 'Cloud Infrastructure',
    tags: ['Node.js', 'TypeScript', 'Prisma ORM', 'WebSockets', 'Fastify', 'Docker'],
    description: 'Carrier-grade email processing engine with headless SMTP integration, real-time OTP verification, batch EML ingestion, IMAP polling, and WebSocket-driven live inbox notifications.',
    isDemo: false,
    images: ['/portfolio/stitch-eazzio-mail.png', '/portfolio/eazzio-mail.png'],
    liveUrl: 'https://github.com/KUmarRahul001',
    githubUrl: 'https://github.com/KUmarRahul001',
    year: 2026,
    featured: true,
  },
];

/** Projects suitable for the homepage featured section. */
export const featuredProjects = projects.filter((p) => p.featured);

/** Categories available for filtering in the portfolio section. */
export const projectCategories: ProjectCategory[] = [
  'AI Telephony & Automation',
  'ERP & Accounting',
  'Enterprise Engineering',
  'EdTech & ERP',
  'FinTech & Monorepo',
  'Cloud Infrastructure',
];
