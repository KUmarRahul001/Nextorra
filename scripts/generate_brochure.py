import base64
import os
import subprocess
import pymupdf

with open('frontend/public/brand/logo-horizontal-clean.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')
logo_src = f"data:image/png;base64,{logo_b64}"

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rahnoxa — Corporate Brochure &amp; Capabilities Deck (2026)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 portrait;
      margin: 0;
    }}
    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    body {{
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11.5px;
    }}

    .page {{
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      padding: 16mm 18mm 20mm 18mm;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }}

    /* Global Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 3.5mm;
      margin-bottom: 5mm;
    }}
    .brand-wrap {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .brand-logo {{
      height: 28px;
      width: auto;
      object-fit: contain;
    }}
    .brand-sub {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #475569;
      text-transform: uppercase;
      border-left: 1.5px solid #cbd5e1;
      padding-left: 10px;
      line-height: 1.2;
    }}
    .header-badge {{
      text-align: right;
    }}
    .badge-pill {{
      display: inline-block;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.05em;
    }}
    .badge-sub {{
      font-size: 8px;
      color: #64748b;
      margin-top: 2px;
      font-weight: 500;
    }}

    /* Running Footer */
    .footer {{
      position: absolute;
      bottom: 11mm;
      left: 18mm;
      right: 18mm;
      border-top: 1px solid #e2e8f0;
      padding-top: 2.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8px;
      font-family: 'JetBrains Mono', monospace;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }}
    .footer strong {{
      color: #0f172a;
    }}
    .footer-right {{
      display: flex;
      gap: 14px;
      align-items: center;
    }}
    .page-num {{
      background: #f1f5f9;
      color: #1e293b;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 700;
    }}

    /* Typography Utilities */
    .eyebrow {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      font-weight: 700;
      color: #2563eb;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }}
    .eyebrow::before {{
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #2563eb;
      border-radius: 50%;
    }}
    .h1-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 21px;
      font-weight: 700;
      line-height: 1.18;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-bottom: 5px;
    }}
    .h2-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 700;
      line-height: 1.25;
      color: #0f172a;
      letter-spacing: -0.015em;
      margin-bottom: 3px;
    }}
    .lead-p {{
      font-size: 10px;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 4mm;
    }}

    /* Page 1 Specifics */
    .hero-banner {{
      background: #0f172a;
      color: #ffffff;
      border-radius: 10px;
      padding: 6.5mm 8mm;
      margin-bottom: 4.5mm;
      border-left: 4px solid #2563eb;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
    }}
    .hero-eyebrow {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      letter-spacing: 0.18em;
      color: #38bdf8;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 4px;
    }}
    .hero-headline {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }}
    .hero-headline span {{
      color: #60a5fa;
    }}
    .hero-desc {{
      font-size: 10.5px;
      color: #cbd5e1;
      line-height: 1.55;
      max-width: 96%;
    }}

    /* Stat Cards 4-grid */
    .stats-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3mm;
      margin-bottom: 4.5mm;
    }}
    .stat-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 3mm 3mm;
      text-align: center;
    }}
    .stat-num {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #1d4ed8;
      line-height: 1;
      margin-bottom: 2px;
    }}
    .stat-lbl {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }}

    /* Pillar 3-grid */
    .pillars-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3.5mm;
      margin-bottom: 4.5mm;
    }}
    .pillar-card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 4mm 4mm;
      border-top: 3px solid #2563eb;
    }}
    .pillar-num {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 3px;
    }}
    .pillar-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }}
    .pillar-body {{
      font-size: 9px;
      color: #475569;
      line-height: 1.5;
    }}

    /* Execution Capacity Table / Box */
    .capacity-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 3.5mm 5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }}
    .cap-item {{
      flex: 1;
    }}
    .cap-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
    }}
    .cap-desc {{
      font-size: 8.5px;
      color: #64748b;
      line-height: 1.4;
    }}

    /* Page 2 & Page 3 & Page 4 Cards */
    .grid-2x3 {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 1fr;
      gap: 3.5mm;
    }}
    .grid-3x2 {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
      gap: 3.5mm;
    }}

    .bento-card {{
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 3.5mm 4mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .bento-header {{
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 2.5mm;
    }}
    .icon-badge {{
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      flex-shrink: 0;
    }}
    .card-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.3;
    }}
    .card-desc {{
      font-size: 8.8px;
      color: #475569;
      line-height: 1.45;
      margin-bottom: 2.5mm;
    }}
    .tech-pill {{
      display: inline-block;
      background: #f1f5f9;
      color: #334155;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5px;
      font-weight: 600;
      padding: 1.5px 5px;
      border-radius: 3px;
      margin-bottom: 2.5mm;
      border: 1px solid #e2e8f0;
    }}
    .bullet-list {{
      list-style: none;
      margin-top: auto;
      border-top: 1px dashed #e2e8f0;
      padding-top: 2mm;
    }}
    .bullet-item {{
      font-size: 8.2px;
      color: #334155;
      line-height: 1.35;
      margin-bottom: 1.5px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
    }}
    .bullet-item::before {{
      content: '✓';
      color: #10b981;
      font-weight: 800;
      font-size: 8.5px;
      flex-shrink: 0;
    }}
    .badge-delivery {{
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5px;
      font-weight: 700;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 1.5px 5px;
      border-radius: 3px;
      margin-top: 2px;
    }}

    /* Process 3-column timeline */
    .process-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3.5mm;
      margin-bottom: 4mm;
    }}
    .process-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 7px;
      padding: 3mm 3.5mm;
    }}
    .process-step {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 2px;
    }}
    .process-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
    }}
    .process-desc {{
      font-size: 8.2px;
      color: #475569;
      line-height: 1.4;
    }}

    /* Contact Callout Box */
    .contact-banner {{
      background: #0f172a;
      color: #ffffff;
      border-radius: 8px;
      padding: 4mm 5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid #38bdf8;
    }}
    .contact-cta {{
      flex: 1.2;
    }}
    .contact-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }}
    .contact-desc {{
      font-size: 8.5px;
      color: #94a3b8;
    }}
    .contact-details {{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      text-align: right;
    }}
    .contact-link {{
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
    }}
    .contact-row {{
      color: #cbd5e1;
    }}
  </style>
</head>
<body>

  <!-- ================= PAGE 1: EXECUTIVE OVERVIEW ================= -->
  <div class="page">
    <div class="header">
      <div class="brand-wrap">
        <img class="brand-logo" src="{logo_src}" alt="Rahnoxa">
        <div class="brand-sub">SOFTWARE ENGINEERING FIRM</div>
      </div>
      <div class="header-badge">
        <div class="badge-pill">UDYAM-JH-06-0063496</div>
        <div class="badge-sub">Govt. of India MSME Registered</div>
      </div>
    </div>

    <div class="hero-banner">
      <div class="hero-eyebrow">OFFICIAL CORPORATE CAPABILITY DECK • 2026</div>
      <h1 class="hero-headline">Bespoke Software Engineering for <span>High-Growth Businesses</span></h1>
      <p class="hero-desc">
        Rahnoxa designs, architects, and engineers scalable web platforms, mission-critical ERP systems, mobile applications, and AI voice automation workflows. We build direct, typed, maintainable systems with zero agency overhead.
      </p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-num">100+</div>
        <div class="stat-lbl">TECHNOLOGIES &amp; TOOLS</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">14</div>
        <div class="stat-lbl">CORE SERVICES</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">100%</div>
        <div class="stat-lbl">CLIENT CODE OWNERSHIP</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">30 Days</div>
        <div class="stat-lbl">POST-LAUNCH WARRANTY</div>
      </div>
    </div>

    <div class="eyebrow">ENTERPRISE POSITIONING</div>
    <h2 class="h2-title">Single Database Authority &amp; Type-Safe Delivery</h2>
    <p class="lead-p">
      We eliminate fragmented tools, spreadsheet chaos, and fragile no-code workarounds by building tailored software directly adapted to your operational workflows.
    </p>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-num">01 / DIRECT ARCHITECT</div>
        <div class="pillar-title">Direct Senior Engineering</div>
        <div class="pillar-body">
          Collaborate 1-on-1 with the senior systems architect who models database schemas, writes the APIs, and manages deployment. Zero agency middlemen or outsourced junior engineers.
        </div>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">02 / DATABASE AUTHORITY</div>
        <div class="pillar-title">Supabase PostgreSQL ACID</div>
        <div class="pillar-body">
          Supabase PostgreSQL is our permanent relational database authority, enforcing strict Row-Level Security (RLS), ACID transactions, and zero-loss audit log preservation.
        </div>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">03 / ZERO VENDOR LOCK-IN</div>
        <div class="pillar-title">100% Client Ownership</div>
        <div class="pillar-body">
          Full Git repository transfers on day one. You own all code, configurations, database migrations, and commercial intellectual property with complete deployment documentation.
        </div>
      </div>
    </div>

    <div class="capacity-box">
      <div class="cap-item">
        <div class="cap-title">Transparent Milestone Velocity</div>
        <div class="cap-desc">Standard builds delivered in 5–7 business days; complex SaaS platforms in 2–4 phased sprint weeks.</div>
      </div>
      <div class="cap-item">
        <div class="cap-title">Dedicated Engineering Bandwidth</div>
        <div class="cap-desc">Focused sprints with direct WhatsApp and live video check-ins for continuous stakeholder alignment.</div>
      </div>
      <div class="cap-item">
        <div class="cap-title">Enterprise Uptime SLA</div>
        <div class="cap-desc">30-day post-launch technical bug-fix warranty included on every single production release.</div>
      </div>
    </div>

    <div class="footer">
      <div><strong>RAHNOXA</strong> • CAPABILITY PROFILE</div>
      <div>CONFIDENTIAL &amp; PROPRIETARY</div>
      <div class="footer-right">
        <span>JHARKHAND, INDIA</span>
        <span class="page-num">01 / 04</span>
      </div>
    </div>
  </div>

  <!-- ================= PAGE 2: WHY CHOOSE US ================= -->
  <div class="page">
    <div class="header">
      <div class="brand-wrap">
        <img class="brand-logo" src="{logo_src}" alt="Rahnoxa">
        <div class="brand-sub">SOFTWARE ENGINEERING FIRM</div>
      </div>
      <div class="header-badge">
        <div class="badge-pill">WHY CHOOSE US</div>
        <div class="badge-sub">Core Engineering Principles</div>
      </div>
    </div>

    <div class="eyebrow">GUARANTEED ARCHITECTURAL STANDARDS</div>
    <h2 class="h1-title">Why Businesses Partner With Rahnoxa</h2>
    <p class="lead-p">
      Unlike generic agencies that rely on outsourced teams and bloated templates, Rahnoxa focuses on technical precision, sustainable architecture, and dependable milestone delivery.
    </p>

    <div class="grid-2x3">
      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">01</div>
            <div>
              <div class="card-title">Custom-Built Architecture</div>
            </div>
          </div>
          <div class="card-desc">
            We tailor frontend, backend, and data models to your actual business requirements instead of forcing you into generic templates or rigid SaaS containers.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Bespoke relational schema modeled for your exact workflow</li>
          <li class="bullet-item">Zero unnecessary dependencies or runtime baggage</li>
          <li class="bullet-item">Sub-second API response times and optimized payloads</li>
        </ul>
      </div>

      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">02</div>
            <div>
              <div class="card-title">Full-Stack Capability</div>
            </div>
          </div>
          <div class="card-desc">
            From reactive web applications and mobile apps to database schemas and API integrations, we handle the complete technology scope in-house.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">End-to-end type safety from React UI to PostgreSQL</li>
          <li class="bullet-item">Cross-platform iOS and Android mobile development</li>
          <li class="bullet-item">Microservices, background cron workers, and WebSockets</li>
        </ul>
      </div>

      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">03</div>
            <div>
              <div class="card-title">Flexible Engagement Models</div>
            </div>
          </div>
          <div class="card-desc">
            Work with us on fixed-scope milestone projects, dedicated feature sprints, or ongoing technical maintenance retainers without hidden fees.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Fixed-price milestone contracts with explicit acceptance criteria</li>
          <li class="bullet-item">Staging environments for continuous stakeholder review</li>
          <li class="bullet-item">Transparent scope boundaries preventing budget creep</li>
        </ul>
      </div>

      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">04</div>
            <div>
              <div class="card-title">Clean, Maintainable Code</div>
            </div>
          </div>
          <div class="card-desc">
            We prioritize readable, well-structured TypeScript and modern frameworks to ensure you can scale and extend your software without technical debt.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Strict ESLint and TypeScript compilation guarantees</li>
          <li class="bullet-item">Automated tests verifying critical auth, APIs, and math</li>
          <li class="bullet-item">Modular architecture built for seamless team handover</li>
        </ul>
      </div>

      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">05</div>
            <div>
              <div class="card-title">Transparent Communication</div>
            </div>
          </div>
          <div class="card-desc">
            Direct communication, honest timeline estimates, and regular staging environment reviews throughout development with zero middle management.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Direct WhatsApp and video sprint check-ins</li>
          <li class="bullet-item">Live feature demos deployed to dedicated test URLs</li>
          <li class="bullet-item">Direct engineering contact without account managers</li>
        </ul>
      </div>

      <div class="bento-card">
        <div>
          <div class="bento-header">
            <div class="icon-badge">06</div>
            <div>
              <div class="card-title">Post-Launch Support &amp; SLA</div>
            </div>
          </div>
          <div class="card-desc">
            We remain available after deployment for bug fixes, performance monitoring, infrastructure scaling, and subsequent release cycles.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">30-day comprehensive technical bug fix warranty</li>
          <li class="bullet-item">Database backups, SSL certificates, and security patches</li>
          <li class="bullet-item">Optional priority maintenance retainers with 4-8h SLA</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div><strong>RAHNOXA</strong> • WHY CHOOSE US</div>
      <div>UDYAM-JH-06-0063496</div>
      <div class="footer-right">
        <span>ENGINEERING PRINCIPLES</span>
        <span class="page-num">02 / 04</span>
      </div>
    </div>
  </div>

  <!-- ================= PAGE 3: TIER 1 SOFTWARE SERVICES ================= -->
  <div class="page">
    <div class="header">
      <div class="brand-wrap">
        <img class="brand-logo" src="{logo_src}" alt="Rahnoxa">
        <div class="brand-sub">SOFTWARE ENGINEERING FIRM</div>
      </div>
      <div class="header-badge">
        <div class="badge-pill">CORE SERVICES</div>
        <div class="badge-sub">Tier 1 • Software &amp; Engineering</div>
      </div>
    </div>

    <div class="eyebrow">ENTERPRISE SOLUTIONS</div>
    <h2 class="h1-title">Software Engineering Services (Tier 1)</h2>
    <p class="lead-p">
      End-to-end custom digital systems engineered for speed, security, and commercial durability across web, mobile, and cloud environments.
    </p>

    <div class="grid-3x2">
      <div class="bento-card">
        <div>
          <div class="card-title">Modern Website Design &amp; Engineering</div>
          <div class="tech-pill">React 18 • Vite • Tailwind • SEO</div>
          <div class="card-desc">
            High-performance, mobile-first business websites engineered with modern frameworks, fast load times, and conversion-focused layouts.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Sub-second load speed with 95+ Core Web Vitals</li>
          <li class="bullet-item">Direct WhatsApp click-to-chat &amp; lead inbox</li>
          <li class="bullet-item">On-page technical SEO schema &amp; SSL setup</li>
        </ul>
        <div class="badge-delivery">Delivery: 5–7 Business Days (Express 48h)</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">Full Stack Web Applications</div>
          <div class="tech-pill">TypeScript • Node.js • Supabase Postgres</div>
          <div class="card-desc">
            Custom, scalable web applications with rich frontends, secure backend APIs, and structured relational database models built to streamline workflows.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">JWT auth, Row Level Security &amp; role permissions</li>
          <li class="bullet-item">Real-time data synchronization &amp; export pipelines</li>
          <li class="bullet-item">Automated business logic and audit logs</li>
        </ul>
        <div class="badge-delivery">Delivery: 2–4 Weeks (Phased Sprints)</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">Mobile App Development</div>
          <div class="tech-pill">Flutter • React Native • iOS &amp; Android</div>
          <div class="card-desc">
            Cross-platform mobile applications for Android and iOS sharing robust logic, native device feature access, and cloud sync.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Offline data persistence &amp; background sync</li>
          <li class="bullet-item">Push notifications, biometric auth, camera/GPS</li>
          <li class="bullet-item">Google Play &amp; Apple App Store deployment</li>
        </ul>
        <div class="badge-delivery">Delivery: 3–6 Weeks (Milestone Sprints)</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">Custom Software &amp; API Integration</div>
          <div class="tech-pill">REST APIs • Webhooks • Redis • Razorpay</div>
          <div class="card-desc">
            Bespoke automation middleware, third-party API adapters, payment gateways, and custom integrations connecting disparate tools.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">WhatsApp Business Cloud API &amp; SMS automation</li>
          <li class="bullet-item">HMAC webhook signature validation &amp; rate limiting</li>
          <li class="bullet-item">Custom payment gateway integrations</li>
        </ul>
        <div class="badge-delivery">Delivery: 5–10 Business Days</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">ERP &amp; Enterprise Applications</div>
          <div class="tech-pill">ACID Transactions • FIFO • GST Ledger</div>
          <div class="card-desc">
            Comprehensive operational platforms replacing spreadsheet chaos with unified inventory, billing, multi-branch, and staff management.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Double-entry accounting &amp; automated GST invoices</li>
          <li class="bullet-item">Real-time inventory decrement &amp; reorder alerts</li>
          <li class="bullet-item">Role-Based Access Control (RBAC) &amp; audits</li>
        </ul>
        <div class="badge-delivery">Delivery: 4–8 Weeks (Phased Rollout)</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">SaaS Platforms &amp; Desktop Software</div>
          <div class="tech-pill">Tauri • Electron • Stripe / Razorpay</div>
          <div class="card-desc">
            Commercial multi-tenant SaaS products and high-speed cross-platform desktop applications engineered for high uptime and subscription billing.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Multi-tenant schema isolation &amp; usage metering</li>
          <li class="bullet-item">Automated recurring billing &amp; plan provisioning</li>
          <li class="bullet-item">Cross-platform desktop binaries for Windows &amp; Mac</li>
        </ul>
        <div class="badge-delivery">Delivery: 4–8 Weeks (Milestone Sprints)</div>
      </div>
    </div>

    <div class="footer">
      <div><strong>RAHNOXA</strong> • TIER 1 SOFTWARE SERVICES</div>
      <div>GOVT. RECOGNIZED MSME</div>
      <div class="footer-right">
        <span>CORE ARCHITECTURE</span>
        <span class="page-num">03 / 04</span>
      </div>
    </div>
  </div>

  <!-- ================= PAGE 4: SOLUTIONS & ENGAGEMENT ================= -->
  <div class="page">
    <div class="header">
      <div class="brand-wrap">
        <img class="brand-logo" src="{logo_src}" alt="Rahnoxa">
        <div class="brand-sub">SOFTWARE ENGINEERING FIRM</div>
      </div>
      <div class="header-badge">
        <div class="badge-pill">SOLUTIONS &amp; ENGAGEMENT</div>
        <div class="badge-sub">Full Spectrum Deliverables</div>
      </div>
    </div>

    <div class="eyebrow">COMMERCIAL SERVICES &amp; DIGITAL AUTOMATION</div>
    <h2 class="h1-title">Digital Marketing, Automation &amp; Retainers</h2>
    <p class="lead-p">
      Complementary digital services, business automation tools, and ongoing maintenance care designed to accelerate business growth.
    </p>

    <div class="grid-2x3" style="margin-bottom: 4mm;">
      <div class="bento-card">
        <div>
          <div class="card-title">Voice Call &amp; IVR Telephony</div>
          <div class="tech-pill">Twilio SIP • WebSockets • IVR Routing</div>
          <div class="card-desc">
            Automated PSTN call broadcasting, interactive voice response (IVR), and real-time AI telecaller pipelines connecting Twilio, SIP, and speech models.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Multi-level IVR call routing &amp; agent forwarding</li>
          <li class="bullet-item">High-volume outbound voice broadcast notifications</li>
        </ul>
        <div class="badge-delivery">Delivery: 5–7 Days</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">B2B Lead Generation &amp; Local Dominance</div>
          <div class="tech-pill">Data Extraction • ExcelJS • Verified Contacts</div>
          <div class="card-desc">
            Automated business discovery and data intelligence engines extracting categorized B2B leads with verification scoring and phone contacts.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Local business prospecting across 50+ categories</li>
          <li class="bullet-item">Phone &amp; WhatsApp number verification pipeline</li>
        </ul>
        <div class="badge-delivery">Delivery: 3–5 Days</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">SMS Marketing &amp; Missed Call Alerts</div>
          <div class="tech-pill">DLT Compliant • 99.8% Delivery • Webhooks</div>
          <div class="card-desc">
            Transactional SMS delivery, promotional broadcast engines, and virtual missed-call numbers with instant WhatsApp lead-back responses.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Instant automated WhatsApp callback trigger</li>
          <li class="bullet-item">DLT template registration &amp; carrier compliance</li>
        </ul>
        <div class="badge-delivery">Delivery: 3–5 Days</div>
      </div>

      <div class="bento-card">
        <div>
          <div class="card-title">Technical Retainers &amp; Emergency Rescue</div>
          <div class="tech-pill">4-8h Hotfix SLA • Backups • Uptime Checks</div>
          <div class="card-desc">
            Rapid emergency website crash recovery, SSL/DNS fixes, malware sanitization, and continuous monthly software maintenance care.
          </div>
        </div>
        <ul class="bullet-list">
          <li class="bullet-item">Critical bug repairs &amp; performance tuning</li>
          <li class="bullet-item">Continuous uptime telemetry &amp; security patching</li>
        </ul>
        <div class="badge-delivery">Emergency: 24h • Retainer: Monthly</div>
      </div>
    </div>

    <div class="eyebrow">STRUCTURED ENGAGEMENT</div>
    <div class="process-grid">
      <div class="process-card">
        <div class="process-step">PHASE 01</div>
        <div class="process-title">Discovery &amp; Architecture</div>
        <div class="process-desc">Detailed requirements scoping, database schema design, API contract definition, and fixed-price milestone estimate.</div>
      </div>
      <div class="process-card">
        <div class="process-step">PHASE 02</div>
        <div class="process-title">Sprint Implementation</div>
        <div class="process-desc">Agile development cycles with continuous deployment to dedicated private staging URLs for live review.</div>
      </div>
      <div class="process-card">
        <div class="process-step">PHASE 03</div>
        <div class="process-title">Production &amp; Handover</div>
        <div class="process-desc">Production deployment, complete Git repository transfer, documentation handover, and 30-day bug warranty.</div>
      </div>
    </div>

    <div class="contact-banner">
      <div class="contact-cta">
        <div class="contact-title">Ready to Engineer Your System?</div>
        <div class="contact-desc">Consult directly with our engineering team for technical scoping, milestone pricing, and architectural review.</div>
      </div>
      <div class="contact-details">
        <div class="contact-row">PHONE: <a class="contact-link" href="tel:+918434237052">+91 8434237052</a> / <a class="contact-link" href="tel:+918434237049">8434237049</a></div>
        <div class="contact-row">EMAIL: <a class="contact-link" href="mailto:contact.rahnoxa@protonmail.com">contact.rahnoxa@protonmail.com</a></div>
        <div class="contact-row">WEB: <a class="contact-link" href="https://rahnoxa.antideploy.com">rahnoxa.antideploy.com</a></div>
      </div>
    </div>

    <div class="footer">
      <div><strong>RAHNOXA</strong> • DIGITAL AUTOMATION &amp; CONSULTATION</div>
      <div>JHARKHAND, INDIA • WORLDWIDE DELIVERY</div>
      <div class="footer-right">
        <span>GET IN TOUCH</span>
        <span class="page-num">04 / 04</span>
      </div>
    </div>
  </div>

</body>
</html>
"""

with open('/tmp/rahnoxa_brochure_fixed.html', 'w') as f:
    f.write(html_content)

print("Generated /tmp/rahnoxa_brochure_fixed.html")

# Run Chrome print-to-pdf
cmd = [
    '/usr/bin/google-chrome',
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf=/tmp/Rahnoxa_Corporate_Brochure.pdf',
    '/tmp/rahnoxa_brochure_fixed.html'
]
subprocess.run(cmd, check=True)
print("PDF printed successfully to /tmp/Rahnoxa_Corporate_Brochure.pdf")

# Inspect PDF with PyMuPDF
doc = pymupdf.open('/tmp/Rahnoxa_Corporate_Brochure.pdf')
print(f"Page count: {len(doc)}")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    pix.save(f'/tmp/fixed_page_{i+1}.png')
print("Rendered all fixed pages to /tmp/fixed_page_X.png")
