export type TechCategory = 'all' | 'frontend' | 'backend' | 'database' | 'mobile' | 'cms' | 'devops' | 'ai' | 'design_qa';

export interface TechItem {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  iconKey: string;
  color: string;
  featured: boolean;
  tag: string;
}

export const ALL_SKILLS: TechItem[] = [
  {
    "id": "react",
    "name": "React",
    "category": "frontend",
    "iconKey": "SiReact",
    "color": "#06B6D4",
    "description": "Component architecture, reactive rendering & modern SPA development",
    "featured": true,
    "tag": "UI Framework"
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "category": "frontend",
    "iconKey": "SiTypescript",
    "color": "#3178C6",
    "description": "Static compile-time type safety across interfaces & contracts",
    "featured": true,
    "tag": "Language"
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "category": "frontend",
    "iconKey": "SiJavascript",
    "color": "#F7DF1E",
    "description": "Modern ECMAScript dynamic web applications & client runtime",
    "featured": false,
    "tag": "Core Language"
  },
  {
    "id": "html5",
    "name": "HTML5",
    "category": "frontend",
    "iconKey": "SiHtml5",
    "color": "#E34F26",
    "description": "Semantic web standards, modern markup & accessibility compliance",
    "featured": false,
    "tag": "Markup"
  },
  {
    "id": "css3",
    "name": "CSS3",
    "category": "frontend",
    "iconKey": "SiCss3",
    "color": "#1572B6",
    "description": "Modern responsive layouts, Flexbox, CSS Grid & animations",
    "featured": false,
    "tag": "Styling"
  },
  {
    "id": "tailwind",
    "name": "Tailwind CSS",
    "category": "frontend",
    "iconKey": "SiTailwindcss",
    "color": "#06B6D4",
    "description": "Utility-first CSS architecture & responsive design tokens",
    "featured": true,
    "tag": "CSS Engine"
  },
  {
    "id": "bootstrap",
    "name": "Bootstrap",
    "category": "frontend",
    "iconKey": "SiBootstrap",
    "color": "#7952B3",
    "description": "Responsive grid systems and enterprise UI component kits",
    "featured": false,
    "tag": "UI Library"
  },
  {
    "id": "vue",
    "name": "Vue.js",
    "category": "frontend",
    "iconKey": "SiVuedotjs",
    "color": "#4FC08D",
    "description": "Progressive component-based frontend framework",
    "featured": false,
    "tag": "UI Framework"
  },
  {
    "id": "angular",
    "name": "Angular",
    "category": "frontend",
    "iconKey": "SiAngular",
    "color": "#DD0031",
    "description": "Enterprise single-page client architecture and dependency injection",
    "featured": true,
    "tag": "Enterprise SPA"
  },
  {
    "id": "nextjs",
    "name": "Next.js",
    "category": "frontend",
    "iconKey": "SiNextdotjs",
    "color": "#000000",
    "description": "Server-side rendering, SSG & production full-stack React",
    "featured": true,
    "tag": "Full-Stack"
  },
  {
    "id": "nuxtjs",
    "name": "Nuxt.js",
    "category": "frontend",
    "iconKey": "SiNuxtdotjs",
    "color": "#00DC82",
    "description": "Intuitive Vue.js full-stack framework with SSR support",
    "featured": false,
    "tag": "SSR Framework"
  },
  {
    "id": "svelte",
    "name": "Svelte",
    "category": "frontend",
    "iconKey": "SiSvelte",
    "color": "#FF3E00",
    "description": "Compile-step ultra-lightweight UI reactivity without virtual DOM",
    "featured": false,
    "tag": "Reactive Engine"
  },
  {
    "id": "remix",
    "name": "Remix",
    "category": "frontend",
    "iconKey": "SiRemix",
    "color": "#000000",
    "description": "Standards-focused web framework with nested dynamic routing",
    "featured": false,
    "tag": "Full-Stack"
  },
  {
    "id": "gatsby",
    "name": "Gatsby",
    "category": "frontend",
    "iconKey": "SiGatsby",
    "color": "#663399",
    "description": "Static site generator optimized for content-driven web portals",
    "featured": false,
    "tag": "Static Generator"
  },
  {
    "id": "sass",
    "name": "Sass / SCSS",
    "category": "frontend",
    "iconKey": "SiSass",
    "color": "#CC6699",
    "description": "Modular CSS preprocessor with nesting and mixins",
    "featured": false,
    "tag": "Preprocessor"
  },
  {
    "id": "vite",
    "name": "Vite",
    "category": "frontend",
    "iconKey": "SiVite",
    "color": "#646CFF",
    "description": "Next-generation lightning-fast frontend dev server and bundler",
    "featured": true,
    "tag": "Build Tool"
  },
  {
    "id": "webpack",
    "name": "Webpack",
    "category": "frontend",
    "iconKey": "SiWebpack",
    "color": "#8DD6F9",
    "description": "Production module bundler for JavaScript and asset pipelines",
    "featured": false,
    "tag": "Bundler"
  },
  {
    "id": "babel",
    "name": "Babel",
    "category": "frontend",
    "iconKey": "SiBabel",
    "color": "#F9DC3E",
    "description": "JavaScript compiler and polyfills for backwards compatibility",
    "featured": false,
    "tag": "Transpiler"
  },
  {
    "id": "redux",
    "name": "Redux Toolkit",
    "category": "frontend",
    "iconKey": "SiRedux",
    "color": "#764ABC",
    "description": "Predictable centralized state management for complex UIs",
    "featured": false,
    "tag": "State Manager"
  },
  {
    "id": "jquery",
    "name": "jQuery",
    "category": "frontend",
    "iconKey": "SiJquery",
    "color": "#0769AD",
    "description": "DOM manipulation and legacy JavaScript library maintenance",
    "featured": false,
    "tag": "Legacy Tool"
  },
  {
    "id": "php",
    "name": "PHP",
    "category": "backend",
    "iconKey": "SiPhp",
    "color": "#777BB4",
    "description": "Server-side scripting powering extensive web applications & CMS engines",
    "featured": true,
    "tag": "Server Runtime"
  },
  {
    "id": "dotnet",
    "name": ".NET / ASP.NET",
    "category": "backend",
    "iconKey": "SiDotnet",
    "color": "#512BD4",
    "description": "Enterprise high-performance C# backend web APIs & microservices",
    "featured": true,
    "tag": "Enterprise Backend"
  },
  {
    "id": "laravel",
    "name": "Laravel",
    "category": "backend",
    "iconKey": "SiLaravel",
    "color": "#FF2D20",
    "description": "Elegant PHP MVC framework with Eloquent ORM & queue workers",
    "featured": true,
    "tag": "PHP Framework"
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "category": "backend",
    "iconKey": "SiNodedotjs",
    "color": "#339933",
    "description": "Asynchronous event-driven JavaScript server runtime",
    "featured": true,
    "tag": "Runtime"
  },
  {
    "id": "express",
    "name": "Express.js",
    "category": "backend",
    "iconKey": "SiExpress",
    "color": "#000000",
    "description": "Minimalist, fast RESTful API framework for Node.js",
    "featured": true,
    "tag": "REST API"
  },
  {
    "id": "nestjs",
    "name": "NestJS",
    "category": "backend",
    "iconKey": "SiNestjs",
    "color": "#E0234E",
    "description": "Structured enterprise TypeScript backend with modular architecture",
    "featured": false,
    "tag": "TypeScript Server"
  },
  {
    "id": "python",
    "name": "Python",
    "category": "backend",
    "iconKey": "SiPython",
    "color": "#3776AB",
    "description": "Robust programming language for APIs, automation and data pipelines",
    "featured": true,
    "tag": "Core Language"
  },
  {
    "id": "django",
    "name": "Django",
    "category": "backend",
    "iconKey": "SiDjango",
    "color": "#092E20",
    "description": "Batteries-included secure Python web framework with admin dashboard",
    "featured": true,
    "tag": "Python Framework"
  },
  {
    "id": "flask",
    "name": "Flask",
    "category": "backend",
    "iconKey": "SiFlask",
    "color": "#000000",
    "description": "Lightweight WSGI Python microframework for modular microservices",
    "featured": false,
    "tag": "Microframework"
  },
  {
    "id": "fastapi",
    "name": "FastAPI",
    "category": "backend",
    "iconKey": "SiFastapi",
    "color": "#009688",
    "description": "High-performance async Python API with automatic OpenAPI docs",
    "featured": true,
    "tag": "Async API"
  },
  {
    "id": "java",
    "name": "Java",
    "category": "backend",
    "iconKey": "SiOpenjdk",
    "color": "#ED8B00",
    "description": "Enterprise object-oriented cross-platform backend programming",
    "featured": true,
    "tag": "Enterprise Stack"
  },
  {
    "id": "springboot",
    "name": "Spring Boot",
    "category": "backend",
    "iconKey": "SiSpring",
    "color": "#6DB33F",
    "description": "Production-ready enterprise Java microservices framework",
    "featured": true,
    "tag": "Microservices"
  },
  {
    "id": "golang",
    "name": "Go / Golang",
    "category": "backend",
    "iconKey": "SiGo",
    "color": "#00ADD8",
    "description": "Concurrent high-throughput compiled systems and backend services",
    "featured": true,
    "tag": "Compiled Language"
  },
  {
    "id": "rust",
    "name": "Rust",
    "category": "backend",
    "iconKey": "SiRust",
    "color": "#000000",
    "description": "Memory-safe systems programming without garbage collection overhead",
    "featured": false,
    "tag": "Systems Language"
  },
  {
    "id": "csharp",
    "name": "C# Language",
    "category": "backend",
    "iconKey": "SiDotnet",
    "color": "#239120",
    "description": "Strongly typed modern object-oriented language for enterprise solutions",
    "featured": false,
    "tag": "Language"
  },
  {
    "id": "cplusplus",
    "name": "C++",
    "category": "backend",
    "iconKey": "SiCplusplus",
    "color": "#00599C",
    "description": "High-performance computing, hardware communication & native engines",
    "featured": false,
    "tag": "Native Language"
  },
  {
    "id": "c",
    "name": "C Language",
    "category": "backend",
    "iconKey": "SiC",
    "color": "#A8B9CC",
    "description": "Low-level foundational systems programming and embedded systems",
    "featured": false,
    "tag": "Low-Level"
  },
  {
    "id": "ruby",
    "name": "Ruby on Rails",
    "category": "backend",
    "iconKey": "SiRubyonrails",
    "color": "#CC0000",
    "description": "Convention-over-configuration rapid web delivery and full-stack MVC",
    "featured": false,
    "tag": "Full-Stack"
  },
  {
    "id": "graphql",
    "name": "GraphQL",
    "category": "backend",
    "iconKey": "SiGraphql",
    "color": "#E10098",
    "description": "Client-driven query language and typed contract API execution",
    "featured": true,
    "tag": "API Standard"
  },
  {
    "id": "webrtc",
    "name": "WebRTC",
    "category": "backend",
    "iconKey": "SiWebrtc",
    "color": "#333333",
    "description": "Real-time audio, video streaming and peer-to-peer data channels",
    "featured": false,
    "tag": "Realtime Protocol"
  },
  {
    "id": "socketio",
    "name": "Socket.io",
    "category": "backend",
    "iconKey": "SiSocketdotio",
    "color": "#010101",
    "description": "Bidirectional real-time low-latency WebSocket communication",
    "featured": false,
    "tag": "WebSockets"
  },
  {
    "id": "kafka",
    "name": "Apache Kafka",
    "category": "backend",
    "iconKey": "SiApachekafka",
    "color": "#231F20",
    "description": "Distributed event streaming platform for high-throughput message pipes",
    "featured": false,
    "tag": "Event Streaming"
  },
  {
    "id": "rabbitmq",
    "name": "RabbitMQ",
    "category": "backend",
    "iconKey": "SiRabbitmq",
    "color": "#FF6600",
    "description": "Enterprise AMQP message broker for asynchronous job handling",
    "featured": false,
    "tag": "Message Broker"
  },
  {
    "id": "celery",
    "name": "Celery",
    "category": "backend",
    "iconKey": "SiCelery",
    "color": "#37814A",
    "description": "Distributed task queue for background workers and scheduled jobs",
    "featured": false,
    "tag": "Task Queue"
  },
  {
    "id": "swagger",
    "name": "Swagger / OpenAPI",
    "category": "backend",
    "iconKey": "SiSwagger",
    "color": "#85EA2D",
    "description": "Interactive API specification, validation and automated client generation",
    "featured": false,
    "tag": "API Docs"
  },
  {
    "id": "postgresql",
    "name": "PostgreSQL",
    "category": "database",
    "iconKey": "SiPostgresql",
    "color": "#4169E1",
    "description": "Relational database authority with ACID compliance and JSONB support",
    "featured": true,
    "tag": "Primary DB"
  },
  {
    "id": "mysql",
    "name": "MySQL",
    "category": "database",
    "iconKey": "SiMysql",
    "color": "#4479A1",
    "description": "Battle-tested open source relational database management system",
    "featured": true,
    "tag": "Relational DB"
  },
  {
    "id": "supabase",
    "name": "Supabase",
    "category": "database",
    "iconKey": "SiSupabase",
    "color": "#3ECF8E",
    "description": "Managed Postgres, Row Level Security, instant Auth and Edge Functions",
    "featured": true,
    "tag": "BaaS & Postgres"
  },
  {
    "id": "mongodb",
    "name": "MongoDB",
    "category": "database",
    "iconKey": "SiMongodb",
    "color": "#47A248",
    "description": "Document-oriented NoSQL database for flexible hierarchical datasets",
    "featured": true,
    "tag": "NoSQL Document"
  },
  {
    "id": "redis",
    "name": "Redis",
    "category": "database",
    "iconKey": "SiRedis",
    "color": "#DC382D",
    "description": "In-memory key-value data structure store, caching layer and pub/sub",
    "featured": true,
    "tag": "Memory Cache"
  },
  {
    "id": "mariadb",
    "name": "MariaDB",
    "category": "database",
    "iconKey": "SiMariadb",
    "color": "#003545",
    "description": "High-performance drop-in relational alternative to MySQL",
    "featured": false,
    "tag": "Relational DB"
  },
  {
    "id": "sqlite",
    "name": "SQLite",
    "category": "database",
    "iconKey": "SiSqlite",
    "color": "#003B57",
    "description": "Serverless embedded transactional SQL database engine",
    "featured": false,
    "tag": "Embedded SQL"
  },
  {
    "id": "firebase",
    "name": "Firebase Firestore",
    "category": "database",
    "iconKey": "SiFirebase",
    "color": "#FFCA28",
    "description": "Real-time cloud database and client synchronization by Google",
    "featured": false,
    "tag": "Cloud DB"
  },
  {
    "id": "elasticsearch",
    "name": "Elasticsearch",
    "category": "database",
    "iconKey": "SiElasticsearch",
    "color": "#005571",
    "description": "Distributed RESTful search engine and analytics datastore",
    "featured": false,
    "tag": "Search Engine"
  },
  {
    "id": "cassandra",
    "name": "Apache Cassandra",
    "category": "database",
    "iconKey": "SiApachecassandra",
    "color": "#1287B1",
    "description": "Distributed wide-column NoSQL store built for massive linear scalability",
    "featured": false,
    "tag": "Wide Column"
  },
  {
    "id": "neo4j",
    "name": "Neo4j Graph DB",
    "category": "database",
    "iconKey": "SiNeo4J",
    "color": "#008CC1",
    "description": "Native graph database for connected relationships and network analysis",
    "featured": false,
    "tag": "Graph Database"
  },
  {
    "id": "prisma",
    "name": "Prisma ORM",
    "category": "database",
    "iconKey": "SiPrisma",
    "color": "#2D3748",
    "description": "Next-generation type-safe database ORM and migration tool for TypeScript",
    "featured": false,
    "tag": "Type-Safe ORM"
  },
  {
    "id": "hibernate",
    "name": "Hibernate",
    "category": "database",
    "iconKey": "SiHibernate",
    "color": "#59666C",
    "description": "Enterprise Java object-relational mapping and data persistence framework",
    "featured": false,
    "tag": "Java ORM"
  },
  {
    "id": "dynamodb",
    "name": "Amazon DynamoDB",
    "category": "database",
    "iconKey": "SiAmazondynamodb",
    "color": "#4053D6",
    "description": "Fully managed key-value serverless database for high-scale applications",
    "featured": false,
    "tag": "Serverless NoSQL"
  },
  {
    "id": "couchdb",
    "name": "Apache CouchDB",
    "category": "database",
    "iconKey": "SiApachecouchdb",
    "color": "#E42528",
    "description": "JSON document database with multi-master sync and offline capabilities",
    "featured": false,
    "tag": "Document DB"
  },
  {
    "id": "memcached",
    "name": "Memcached",
    "category": "database",
    "iconKey": "SiRedis",
    "color": "#555555",
    "description": "High-performance distributed memory object caching system",
    "featured": false,
    "tag": "Cache Engine"
  },
  {
    "id": "flutter",
    "name": "Flutter",
    "category": "mobile",
    "iconKey": "SiFlutter",
    "color": "#02569B",
    "description": "Google cross-platform framework for natively compiled mobile, web & desktop",
    "featured": true,
    "tag": "Cross-Platform"
  },
  {
    "id": "reactnative",
    "name": "React Native",
    "category": "mobile",
    "iconKey": "SiReact",
    "color": "#61DAFB",
    "description": "Cross-platform mobile UI built using React and native operating system controls",
    "featured": true,
    "tag": "Cross-Platform"
  },
  {
    "id": "android",
    "name": "Android SDK",
    "category": "mobile",
    "iconKey": "SiAndroid",
    "color": "#3DDC84",
    "description": "Native Google Android OS mobile application development environment",
    "featured": true,
    "tag": "Native Android"
  },
  {
    "id": "ios",
    "name": "iOS Swift",
    "category": "mobile",
    "iconKey": "SiApple",
    "color": "#000000",
    "description": "Native Apple iOS and iPadOS application development with Swift",
    "featured": true,
    "tag": "Native iOS"
  },
  {
    "id": "kotlin",
    "name": "Kotlin",
    "category": "mobile",
    "iconKey": "SiKotlin",
    "color": "#7F52FF",
    "description": "Modern concise first-class language for native Android development",
    "featured": false,
    "tag": "Android Native"
  },
  {
    "id": "swift",
    "name": "Swift",
    "category": "mobile",
    "iconKey": "SiSwift",
    "color": "#F05138",
    "description": "Fast, secure programming language for Apple ecosystems (iOS, macOS)",
    "featured": false,
    "tag": "Apple Native"
  },
  {
    "id": "dart",
    "name": "Dart",
    "category": "mobile",
    "iconKey": "SiDart",
    "color": "#0175C2",
    "description": "Client-optimized object language powering Flutter applications",
    "featured": false,
    "tag": "Client Language"
  },
  {
    "id": "ionic",
    "name": "Ionic Framework",
    "category": "mobile",
    "iconKey": "SiIonic",
    "color": "#3880FF",
    "description": "Cross-platform mobile app development using open web technologies",
    "featured": true,
    "tag": "Hybrid Mobile"
  },
  {
    "id": "capacitor",
    "name": "Capacitor",
    "category": "mobile",
    "iconKey": "SiCapacitor",
    "color": "#119EFF",
    "description": "Cross-platform native runtime powering progressive web applications",
    "featured": false,
    "tag": "PWA Runtime"
  },
  {
    "id": "cordova",
    "name": "Apache Cordova",
    "category": "mobile",
    "iconKey": "SiApachecordova",
    "color": "#E8E8E8",
    "description": "Hybrid mobile container for running web code with device access",
    "featured": false,
    "tag": "Hybrid Wrapper"
  },
  {
    "id": "electron",
    "name": "Electron.js",
    "category": "mobile",
    "iconKey": "SiElectron",
    "color": "#47848F",
    "description": "Cross-platform desktop software powered by JavaScript, HTML & CSS",
    "featured": false,
    "tag": "Desktop Apps"
  },
  {
    "id": "tauri",
    "name": "Tauri",
    "category": "mobile",
    "iconKey": "SiTauri",
    "color": "#24C8DB",
    "description": "Lightweight, memory-efficient native desktop wrapper built with Rust",
    "featured": false,
    "tag": "Desktop Apps"
  },
  {
    "id": "wordpress",
    "name": "WordPress",
    "category": "cms",
    "iconKey": "SiWordpress",
    "color": "#21759B",
    "description": "World-leading CMS for websites, publishing portals and custom plugins",
    "featured": true,
    "tag": "Open-Source CMS"
  },
  {
    "id": "woocommerce",
    "name": "WooCommerce",
    "category": "cms",
    "iconKey": "SiWoo",
    "color": "#96588A",
    "description": "Customizable e-commerce engine integrated directly into WordPress",
    "featured": true,
    "tag": "E-Commerce"
  },
  {
    "id": "shopify",
    "name": "Shopify",
    "category": "cms",
    "iconKey": "SiShopify",
    "color": "#7AB55C",
    "description": "Global e-commerce storefronts, Liquid templates and custom apps",
    "featured": true,
    "tag": "Headless Commerce"
  },
  {
    "id": "magento",
    "name": "Adobe Magento",
    "category": "cms",
    "iconKey": "SiMagento",
    "color": "#EE672F",
    "description": "Enterprise high-scale multi-currency multi-vendor e-commerce platform",
    "featured": true,
    "tag": "Enterprise Commerce"
  },
  {
    "id": "drupal",
    "name": "Drupal",
    "category": "cms",
    "iconKey": "SiDrupal",
    "color": "#0678BE",
    "description": "Enterprise content management framework with granular access controls",
    "featured": false,
    "tag": "Enterprise CMS"
  },
  {
    "id": "joomla",
    "name": "Joomla",
    "category": "cms",
    "iconKey": "SiJoomla",
    "color": "#5091CD",
    "description": "Open-source web content management system for portals and intranets",
    "featured": false,
    "tag": "CMS Portal"
  },
  {
    "id": "prestashop",
    "name": "PrestaShop",
    "category": "cms",
    "iconKey": "SiPrestashop",
    "color": "#DF0067",
    "description": "Customizable European open-source e-commerce platform",
    "featured": false,
    "tag": "E-Commerce"
  },
  {
    "id": "webflow",
    "name": "Webflow",
    "category": "cms",
    "iconKey": "SiWebflow",
    "color": "#4353FF",
    "description": "Visual CMS and responsive design system production platform",
    "featured": false,
    "tag": "Visual CMS"
  },
  {
    "id": "strapi",
    "name": "Strapi CMS",
    "category": "cms",
    "iconKey": "SiStrapi",
    "color": "#2F2E8B",
    "description": "Open-source headless CMS with customizable REST & GraphQL endpoints",
    "featured": false,
    "tag": "Headless CMS"
  },
  {
    "id": "ghost",
    "name": "Ghost CMS",
    "category": "cms",
    "iconKey": "SiGhost",
    "color": "#738A94",
    "description": "Modern headless publishing platform designed for media & newsletters",
    "featured": false,
    "tag": "Publishing"
  },
  {
    "id": "contentful",
    "name": "Contentful",
    "category": "cms",
    "iconKey": "SiContentful",
    "color": "#2478CC",
    "description": "Enterprise composable content platform for multi-channel publishing",
    "featured": false,
    "tag": "Headless CMS"
  },
  {
    "id": "sanity",
    "name": "Sanity.io",
    "category": "cms",
    "iconKey": "SiSanity",
    "color": "#F03E2F",
    "description": "Structured content studio with real-time collaborative editing",
    "featured": false,
    "tag": "Content Studio"
  },
  {
    "id": "docker",
    "name": "Docker",
    "category": "devops",
    "iconKey": "SiDocker",
    "color": "#2496ED",
    "description": "Containerization standard ensuring reproducible execution environments",
    "featured": true,
    "tag": "Containers"
  },
  {
    "id": "kubernetes",
    "name": "Kubernetes",
    "category": "devops",
    "iconKey": "SiKubernetes",
    "color": "#326CE5",
    "description": "Automated container cluster orchestration, failover & autoscaling",
    "featured": true,
    "tag": "Orchestration"
  },
  {
    "id": "aws",
    "name": "AWS Cloud",
    "category": "devops",
    "iconKey": "SiAmazonwebservices",
    "color": "#FF9900",
    "description": "Global cloud infrastructure (EC2, S3, RDS, Lambda, VPC)",
    "featured": true,
    "tag": "Cloud Provider"
  },
  {
    "id": "gcp",
    "name": "Google Cloud (GCP)",
    "category": "devops",
    "iconKey": "SiGooglecloud",
    "color": "#4285F4",
    "description": "Google enterprise cloud (Cloud Run, GKE, BigQuery, IAM)",
    "featured": false,
    "tag": "Cloud Provider"
  },
  {
    "id": "cloudflare",
    "name": "Cloudflare",
    "category": "devops",
    "iconKey": "SiCloudflare",
    "color": "#F38020",
    "description": "Global edge network, CDN caching, DDoS protection and Workers",
    "featured": true,
    "tag": "Edge & CDN"
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "category": "devops",
    "iconKey": "SiVercel",
    "color": "#000000",
    "description": "Frontend edge cloud optimized for Next.js, preview deployments & serverless",
    "featured": false,
    "tag": "Edge Hosting"
  },
  {
    "id": "netlify",
    "name": "Netlify",
    "category": "devops",
    "iconKey": "SiNetlify",
    "color": "#00C7B7",
    "description": "Composable web platform with continuous Git deployment pipelines",
    "featured": false,
    "tag": "Static Hosting"
  },
  {
    "id": "git",
    "name": "Git",
    "category": "devops",
    "iconKey": "SiGit",
    "color": "#F05032",
    "description": "Distributed source control, branch workflows and merge coordination",
    "featured": true,
    "tag": "Version Control"
  },
  {
    "id": "github",
    "name": "GitHub Actions",
    "category": "devops",
    "iconKey": "SiGithub",
    "color": "#181717",
    "description": "Automated CI/CD workflows, unit testing and package publishing",
    "featured": true,
    "tag": "CI/CD Pipelines"
  },
  {
    "id": "gitlab",
    "name": "GitLab CI/CD",
    "category": "devops",
    "iconKey": "SiGitlab",
    "color": "#FC6D26",
    "description": "Integrated DevSecOps pipelines from code commit to production",
    "featured": false,
    "tag": "DevOps Platform"
  },
  {
    "id": "bitbucket",
    "name": "Bitbucket",
    "category": "devops",
    "iconKey": "SiBitbucket",
    "color": "#0052CC",
    "description": "Enterprise Git code management integrated with Jira pipelines",
    "featured": false,
    "tag": "Code Repository"
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "category": "devops",
    "iconKey": "SiTerraform",
    "color": "#7B42BC",
    "description": "Declarative Infrastructure as Code (IaC) across multi-cloud",
    "featured": false,
    "tag": "IaC"
  },
  {
    "id": "ansible",
    "name": "Ansible",
    "category": "devops",
    "iconKey": "SiAnsible",
    "color": "#EE0000",
    "description": "Agentless server configuration automation and infrastructure deployment",
    "featured": false,
    "tag": "Config Automation"
  },
  {
    "id": "jenkins",
    "name": "Jenkins CI",
    "category": "devops",
    "iconKey": "SiJenkins",
    "color": "#D24939",
    "description": "Extensible automation server for continuous integration pipelines",
    "featured": false,
    "tag": "Build Server"
  },
  {
    "id": "nginx",
    "name": "Nginx",
    "category": "devops",
    "iconKey": "SiNginx",
    "color": "#009639",
    "description": "High-performance HTTP reverse proxy, SSL termination & load balancer",
    "featured": true,
    "tag": "Reverse Proxy"
  },
  {
    "id": "apache",
    "name": "Apache HTTP",
    "category": "devops",
    "iconKey": "SiApache",
    "color": "#D22128",
    "description": "Modular, dependable enterprise web server with virtual host routing",
    "featured": false,
    "tag": "Web Server"
  },
  {
    "id": "linux",
    "name": "Linux / Ubuntu",
    "category": "devops",
    "iconKey": "SiLinux",
    "color": "#FCC624",
    "description": "Production operating system environments and shell administration",
    "featured": true,
    "tag": "Operating System"
  },
  {
    "id": "helm",
    "name": "Helm Kubernetes",
    "category": "devops",
    "iconKey": "SiHelm",
    "color": "#0F1689",
    "description": "Package manager for defining and upgrading Kubernetes application charts",
    "featured": false,
    "tag": "Package Manager"
  },
  {
    "id": "openai",
    "name": "OpenAI API & LLMs",
    "category": "ai",
    "iconKey": "SiOpenai",
    "color": "#412991",
    "description": "Integration of GPT-4, embeddings and generative AI intelligent workflows",
    "featured": true,
    "tag": "LLM & AI"
  },
  {
    "id": "tensorflow",
    "name": "TensorFlow",
    "category": "ai",
    "iconKey": "SiTensorflow",
    "color": "#FF6F00",
    "description": "End-to-end machine learning platform for neural network deployment",
    "featured": false,
    "tag": "Machine Learning"
  },
  {
    "id": "pytorch",
    "name": "PyTorch",
    "category": "ai",
    "iconKey": "SiPytorch",
    "color": "#EE4C2C",
    "description": "Deep learning research framework for production computer vision & NLP",
    "featured": true,
    "tag": "Deep Learning"
  },
  {
    "id": "huggingface",
    "name": "Hugging Face",
    "category": "ai",
    "iconKey": "SiHuggingface",
    "color": "#FFD21E",
    "description": "Open-weights AI models, tokenizers and transformers integration",
    "featured": false,
    "tag": "Model Hub"
  },
  {
    "id": "pandas",
    "name": "Pandas",
    "category": "ai",
    "iconKey": "SiPandas",
    "color": "#150458",
    "description": "High-performance data frames and structured analytical pipelines",
    "featured": false,
    "tag": "Data Science"
  },
  {
    "id": "numpy",
    "name": "NumPy",
    "category": "ai",
    "iconKey": "SiNumpy",
    "color": "#013243",
    "description": "Numerical scientific computing with multi-dimensional array mathematics",
    "featured": false,
    "tag": "Scientific Matrix"
  },
  {
    "id": "scikitlearn",
    "name": "Scikit-Learn",
    "category": "ai",
    "iconKey": "SiScikitlearn",
    "color": "#F7931E",
    "description": "Supervised and unsupervised statistical machine learning algorithms",
    "featured": false,
    "tag": "Statistical ML"
  },
  {
    "id": "jupyter",
    "name": "Jupyter Notebooks",
    "category": "ai",
    "iconKey": "SiJupyter",
    "color": "#F37626",
    "description": "Interactive computational notebooks for data exploration and modeling",
    "featured": false,
    "tag": "Data Notebook"
  },
  {
    "id": "spark",
    "name": "Apache Spark",
    "category": "ai",
    "iconKey": "SiApachespark",
    "color": "#E25A1C",
    "description": "Distributed cluster-computing framework for large-scale data analytics",
    "featured": false,
    "tag": "Big Data"
  },
  {
    "id": "opencv",
    "name": "OpenCV",
    "category": "ai",
    "iconKey": "SiOpencv",
    "color": "#5C3EE8",
    "description": "Real-time computer vision, image processing and video pattern analysis",
    "featured": false,
    "tag": "Computer Vision"
  },
  {
    "id": "figma",
    "name": "Figma",
    "category": "design_qa",
    "iconKey": "SiFigma",
    "color": "#F24E1E",
    "description": "Collaborative UI/UX wireframing, interactive prototyping & design systems",
    "featured": true,
    "tag": "Design System"
  },
  {
    "id": "photoshop",
    "name": "Adobe Photoshop",
    "category": "design_qa",
    "iconKey": "SiAdobephotoshop",
    "color": "#31A8FF",
    "description": "Professional raster image manipulation and graphic asset creation",
    "featured": true,
    "tag": "Creative Suite"
  },
  {
    "id": "illustrator",
    "name": "Adobe Illustrator",
    "category": "design_qa",
    "iconKey": "SiAdobeillustrator",
    "color": "#FF9A00",
    "description": "Vector graphic design, digital brand assets and custom typography",
    "featured": true,
    "tag": "Vector Design"
  },
  {
    "id": "adobexd",
    "name": "Adobe XD",
    "category": "design_qa",
    "iconKey": "SiAdobexd",
    "color": "#FF61F6",
    "description": "User experience design, screen transitions and prototype testing",
    "featured": false,
    "tag": "Prototyping"
  },
  {
    "id": "jest",
    "name": "Jest",
    "category": "design_qa",
    "iconKey": "SiJest",
    "color": "#C21325",
    "description": "Zero-config JavaScript testing framework with code coverage analysis",
    "featured": true,
    "tag": "Unit Testing"
  },
  {
    "id": "cypress",
    "name": "Cypress",
    "category": "design_qa",
    "iconKey": "SiCypress",
    "color": "#17202C",
    "description": "Fast, reliable browser end-to-end user journey test automation",
    "featured": true,
    "tag": "E2E Testing"
  },
  {
    "id": "selenium",
    "name": "Selenium",
    "category": "design_qa",
    "iconKey": "SiSelenium",
    "color": "#43B02A",
    "description": "Automated cross-browser functional testing across operating systems",
    "featured": false,
    "tag": "QA Automation"
  },
  {
    "id": "postman",
    "name": "Postman",
    "category": "design_qa",
    "iconKey": "SiPostman",
    "color": "#FF6C37",
    "description": "Automated API testing suites, mock servers and collection monitors",
    "featured": true,
    "tag": "API Testing"
  },
  {
    "id": "stripe",
    "name": "Stripe",
    "category": "design_qa",
    "iconKey": "SiStripe",
    "color": "#008CDD",
    "description": "Credit card payment checkout, subscriptions and marketplace payouts",
    "featured": true,
    "tag": "Payment Gateway"
  },
  {
    "id": "paypal",
    "name": "PayPal",
    "category": "design_qa",
    "iconKey": "SiPaypal",
    "color": "#003087",
    "description": "Worldwide digital payment processing and gateway integrations",
    "featured": false,
    "tag": "Payment Processing"
  },
  {
    "id": "twilio",
    "name": "Twilio",
    "category": "design_qa",
    "iconKey": "SiTwilio",
    "color": "#F22F46",
    "description": "Programmable SMS notifications, voice calling and two-factor authentication",
    "featured": false,
    "tag": "Communications"
  },
  {
    "id": "sendgrid",
    "name": "SendGrid",
    "category": "design_qa",
    "iconKey": "SiSendgrid",
    "color": "#1A82E2",
    "description": "Cloud-based transactional email delivery API and template management",
    "featured": false,
    "tag": "Email Delivery"
  },
  {
    "id": "grafana",
    "name": "Grafana",
    "category": "design_qa",
    "iconKey": "SiGrafana",
    "color": "#F46800",
    "description": "Real-time telemetry, server health dashboards and visual metric alerts",
    "featured": false,
    "tag": "Telemetry"
  },
  {
    "id": "prometheus",
    "name": "Prometheus",
    "category": "design_qa",
    "iconKey": "SiPrometheus",
    "color": "#E6522C",
    "description": "Open-source monitoring and alerting toolkit with PromQL queries",
    "featured": false,
    "tag": "Monitoring"
  }
];
