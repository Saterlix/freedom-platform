// seed.js - Demo data seeder for FreeDom marketplace
import { Storage } from '../storage.js';
import { Auth } from '../auth.js';

export function shouldSeed() {
  // Force re-seed if the seed version is not 'v3' (Unique usernames system)
  return localStorage.getItem('freedom_seeded_version') !== 'v3' || localStorage.getItem('freedom_seeded') !== 'true';
}

export function seedData() {
  // Pre-compute password hash for 'demo123'
  const passwordHash = Auth.hashPassword('demo123');

  // ─── Stable timestamps ───────────────────────────────────────────
  const now = new Date();
  const daysAgo = (d) => new Date(now - d * 86400000).toISOString();

  // ─── USERS ───────────────────────────────────────────────────────
  const users = [
    {
      id: 'user_1',
      name: 'Alex Morgan',
      username: 'alex_morgan',
      email: 'alex@example.com',
      password_hash: passwordHash,
      role: 'freelancer',
      plan: 'pro',
      avatar: null,
      avatar_color: '#6C5CE7',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript'],
      categories: ['Development'],
      bio: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud-native architectures. Every project I take on gets my full dedication — clean code, thoughtful design, and reliable delivery.',
      portfolio: [
        { title: 'E-commerce Platform', url: 'https://portfolio.example.com/ecommerce', image: null },
        { title: 'SaaS Dashboard', url: 'https://portfolio.example.com/dashboard', image: null }
      ],
      rating: 4.9,
      reviews_count: 47,
      completed_projects: 47,
      balance: 12500,
      response_time: '< 1 hour',
      is_verified: true,
      is_online: true,
      location: 'San Francisco, USA',
      hourly_rate: 75,
      title: 'Full Stack Developer',
      created_at: daysAgo(320),
      last_seen: daysAgo(0)
    },
    {
      id: 'user_2',
      name: 'Sarah Chen',
      username: 'sarah_chen',
      email: 'sarah@example.com',
      password_hash: passwordHash,
      role: 'freelancer',
      plan: 'free',
      avatar: null,
      avatar_color: '#00B894',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Branding', 'Prototyping'],
      categories: ['Design'],
      bio: 'Creative UI/UX designer who turns complex ideas into elegant, user-centered interfaces. With a background in cognitive psychology and 6 years in product design, I craft experiences that are both beautiful and intuitive.',
      portfolio: [
        { title: 'Banking App Redesign', url: 'https://portfolio.example.com/banking', image: null },
        { title: 'Travel Platform UX', url: 'https://portfolio.example.com/travel', image: null }
      ],
      rating: 4.8,
      reviews_count: 31,
      completed_projects: 31,
      balance: 5400,
      response_time: '< 2 hours',
      is_verified: true,
      is_online: true,
      location: 'London, UK',
      hourly_rate: 65,
      title: 'UI/UX Designer',
      created_at: daysAgo(280),
      last_seen: daysAgo(0)
    },
    {
      id: 'user_3',
      name: 'Marcus Johnson',
      username: 'marcus_j',
      email: 'marcus@example.com',
      password_hash: passwordHash,
      role: 'freelancer',
      plan: 'pro',
      avatar: null,
      avatar_color: '#E17055',
      skills: ['SEO', 'Google Ads', 'Content Marketing', 'Social Media', 'Analytics'],
      categories: ['Marketing'],
      bio: 'Results-driven digital marketing expert specializing in growth strategies that deliver measurable ROI. I have helped 50+ businesses scale their online presence through SEO, paid ads, and data-driven content marketing.',
      portfolio: [
        { title: 'SaaS Growth Case Study', url: 'https://portfolio.example.com/saas-growth', image: null }
      ],
      rating: 4.7,
      reviews_count: 28,
      completed_projects: 28,
      balance: 3200,
      response_time: '< 1 hour',
      is_verified: true,
      is_online: false,
      location: 'New York, USA',
      hourly_rate: 55,
      title: 'Digital Marketing Expert',
      created_at: daysAgo(240),
      last_seen: daysAgo(1)
    },
    {
      id: 'user_4',
      name: 'Emma Wilson',
      username: 'emma_wilson',
      email: 'emma@example.com',
      password_hash: passwordHash,
      role: 'freelancer',
      plan: 'free',
      avatar: null,
      avatar_color: '#0984E3',
      skills: ['Copywriting', 'Blog Posts', 'SEO Writing', 'Technical Writing'],
      categories: ['Writing'],
      bio: 'Words are my craft. I write compelling copy that converts, blog posts that rank, and technical content that simplifies the complex. Over 500 articles published across leading tech and business publications.',
      portfolio: [
        { title: 'Tech Blog Portfolio', url: 'https://portfolio.example.com/tech-blog', image: null },
        { title: 'SaaS Copywriting Samples', url: 'https://portfolio.example.com/saas-copy', image: null }
      ],
      rating: 4.6,
      reviews_count: 52,
      completed_projects: 52,
      balance: 2100,
      response_time: '< 3 hours',
      is_verified: true,
      is_online: true,
      location: 'Toronto, Canada',
      hourly_rate: 40,
      title: 'Content Writer',
      created_at: daysAgo(350),
      last_seen: daysAgo(0)
    },
    {
      id: 'user_5',
      name: 'David Kim',
      username: 'david_kim',
      email: 'david@example.com',
      password_hash: passwordHash,
      role: 'freelancer',
      plan: 'pro',
      avatar: null,
      avatar_color: '#FDCB6E',
      skills: ['After Effects', 'Premiere Pro', 'Motion Graphics', '3D Animation'],
      categories: ['Video & Animation'],
      bio: 'Award-winning video editor and motion designer with a passion for visual storytelling. From sleek product demos to cinematic brand films, I bring ideas to life through motion and color.',
      portfolio: [
        { title: 'Product Launch Reel', url: 'https://portfolio.example.com/reel', image: null }
      ],
      rating: 4.9,
      reviews_count: 23,
      completed_projects: 23,
      balance: 8900,
      response_time: '< 2 hours',
      is_verified: true,
      is_online: true,
      location: 'Seoul, South Korea',
      hourly_rate: 80,
      title: 'Video Editor & Motion Designer',
      created_at: daysAgo(200),
      last_seen: daysAgo(0)
    },
    {
      id: 'user_6',
      name: 'TechStart Inc',
      username: 'techstart',
      email: 'techstart@example.com',
      password_hash: passwordHash,
      role: 'client',
      plan: 'business',
      avatar: null,
      avatar_color: '#D63031',
      skills: [],
      categories: [],
      bio: 'Fast-growing startup building the next generation of developer tools. We are always looking for talented freelancers to help us scale quickly and deliver world-class products.',
      portfolio: [],
      rating: 4.8,
      reviews_count: 12,
      completed_projects: 15,
      balance: 25000,
      response_time: '< 1 hour',
      is_verified: true,
      is_online: true,
      location: 'Austin, USA',
      hourly_rate: 0,
      title: 'Tech Startup',
      created_at: daysAgo(300),
      last_seen: daysAgo(0)
    },
    {
      id: 'user_7',
      name: 'GrowthLab Agency',
      username: 'growthlab',
      email: 'growthlab@example.com',
      password_hash: passwordHash,
      role: 'client',
      plan: 'free',
      avatar: null,
      avatar_color: '#00CEC9',
      skills: [],
      categories: [],
      bio: 'Full-service marketing agency helping brands grow through creative campaigns, performance marketing, and content strategy. We partner with top freelancers worldwide.',
      portfolio: [],
      rating: 4.5,
      reviews_count: 8,
      completed_projects: 10,
      balance: 8000,
      response_time: '< 4 hours',
      is_verified: true,
      is_online: false,
      location: 'Chicago, USA',
      hourly_rate: 0,
      title: 'Marketing Agency',
      created_at: daysAgo(260),
      last_seen: daysAgo(2)
    },
    {
      id: 'user_8',
      name: 'InnovateCorp',
      username: 'innovate_corp',
      email: 'innovate@example.com',
      password_hash: passwordHash,
      role: 'both',
      plan: 'business',
      avatar: null,
      avatar_color: '#E84393',
      skills: ['Project Management', 'Technical Consulting'],
      categories: ['Business'],
      bio: 'Innovation-driven technology company building cutting-edge solutions for enterprise clients. We hire freelancers for specialized projects and also offer consulting services.',
      portfolio: [],
      rating: 4.7,
      reviews_count: 14,
      completed_projects: 18,
      balance: 42000,
      response_time: '< 2 hours',
      is_verified: true,
      is_online: true,
      location: 'Berlin, Germany',
      hourly_rate: 0,
      title: 'Tech Company',
      created_at: daysAgo(340),
      last_seen: daysAgo(0)
    }
  ];

  localStorage.setItem('freedom_users', JSON.stringify(users));

  // ─── PROJECTS ────────────────────────────────────────────────────
  const projects = [
    {
      id: 'project_1',
      title: 'E-commerce Platform Redesign',
      description: 'We need a complete redesign of our e-commerce platform. The project includes a modern React frontend, Node.js backend integration, and a polished UI/UX overhaul. Must support responsive design, product filtering, cart system, and checkout flow.',
      client_id: 'user_6',
      budget: 50000000,
      budget_type: 'fixed',
      skills: ['React', 'Node.js', 'UI/UX'],
      category: 'Development',
      status: 'open',
      duration: '2-4 weeks',
      proposals_count: 4,
      assigned_to: null,
      created_at: daysAgo(5)
    },
    {
      id: 'project_2',
      title: 'Mobile App UI/UX Design',
      description: 'Looking for an experienced UI/UX designer to create a complete mobile app design for our fintech product. Deliverables include user flows, wireframes, high-fidelity mockups in Figma, and an interactive prototype. Must follow iOS and Android design guidelines.',
      client_id: 'user_8',
      budget: 40000000,
      budget_type: 'fixed',
      skills: ['Figma', 'Mobile Design'],
      category: 'Design',
      status: 'open',
      duration: '2-3 weeks',
      proposals_count: 3,
      assigned_to: null,
      created_at: daysAgo(3)
    },
    {
      id: 'project_3',
      title: 'SEO Optimization Campaign',
      description: 'We need a comprehensive SEO audit and optimization campaign for our agency website. This includes keyword research, on-page optimization, technical SEO fixes, content strategy recommendations, and Google Analytics setup with custom reporting dashboards.',
      client_id: 'user_7',
      budget: 15000000,
      budget_type: 'fixed',
      skills: ['SEO', 'Google Analytics'],
      category: 'Marketing',
      status: 'open',
      duration: '1-2 weeks',
      proposals_count: 2,
      assigned_to: null,
      created_at: daysAgo(7)
    },
    {
      id: 'project_4',
      title: 'Brand Identity Package',
      description: 'Looking for a talented designer to create a complete brand identity for our new product line. Includes logo design, color palette, typography system, brand guidelines document, business card design, and social media templates.',
      client_id: 'user_6',
      budget: 30000000,
      budget_type: 'fixed',
      skills: ['Branding', 'Logo Design', 'Illustrator'],
      category: 'Design',
      status: 'open',
      duration: '2-3 weeks',
      proposals_count: 2,
      assigned_to: null,
      created_at: daysAgo(4)
    },
    {
      id: 'project_5',
      title: 'Technical Blog Content',
      description: 'We need 10 high-quality technical blog posts about cloud computing, DevOps practices, and modern software development. Each post should be 1500-2000 words, well-researched, SEO-optimized, and written for a developer audience.',
      client_id: 'user_8',
      budget: 10000000,
      budget_type: 'fixed',
      skills: ['Technical Writing', 'SEO Writing'],
      category: 'Writing',
      status: 'open',
      duration: '3-4 weeks',
      proposals_count: 1,
      assigned_to: null,
      created_at: daysAgo(6)
    },
    {
      id: 'project_6',
      title: 'Product Explainer Video',
      description: 'Create a 90-second animated explainer video for our SaaS product launch. Should include scriptwriting support, professional voiceover, motion graphics, and a modern visual style that matches our brand guidelines.',
      client_id: 'user_7',
      budget: 25000000,
      budget_type: 'fixed',
      skills: ['After Effects', 'Motion Graphics'],
      category: 'Video & Animation',
      status: 'open',
      duration: '1-2 weeks',
      proposals_count: 1,
      assigned_to: null,
      created_at: daysAgo(2)
    },
    {
      id: 'project_7',
      title: 'API Development & Integration',
      description: 'Build a RESTful API with Python/FastAPI for our internal tools platform. Must include user authentication, role-based access control, rate limiting, comprehensive documentation, and AWS deployment. Integration with our existing PostgreSQL database.',
      client_id: 'user_6',
      budget: 70000000,
      budget_type: 'fixed',
      skills: ['Python', 'REST API', 'AWS'],
      category: 'Development',
      status: 'in_progress',
      duration: '4-6 weeks',
      proposals_count: 3,
      assigned_to: 'user_1',
      created_at: daysAgo(21)
    },
    {
      id: 'project_8',
      title: 'Social Media Marketing',
      description: 'Manage and grow our social media presence across Instagram, Twitter/X, and LinkedIn. Includes content calendar creation, post design and copywriting, community engagement, monthly analytics reports, and growth strategy.',
      client_id: 'user_7',
      budget: 12000000,
      budget_type: 'monthly',
      skills: ['Social Media', 'Content Creation'],
      category: 'Marketing',
      status: 'open',
      duration: '3 months',
      proposals_count: 1,
      assigned_to: null,
      created_at: daysAgo(8)
    },
    {
      id: 'project_9',
      title: 'Landing Page Development',
      description: 'Build a high-converting landing page for our new product launch. Must be fully responsive, lightning-fast, and include animations, a lead capture form, testimonials section, and integration with our email marketing platform.',
      client_id: 'user_8',
      budget: 15000000,
      budget_type: 'fixed',
      skills: ['HTML', 'CSS', 'JavaScript'],
      category: 'Development',
      status: 'open',
      duration: '1 week',
      proposals_count: 2,
      assigned_to: null,
      created_at: daysAgo(1)
    },
    {
      id: 'project_10',
      title: 'Data Dashboard Development',
      description: 'Develop an interactive data visualization dashboard using React and D3.js. The dashboard should connect to our Python backend API and display real-time metrics, charts, and KPI cards with filtering and export capabilities.',
      client_id: 'user_6',
      budget: 50000000,
      budget_type: 'fixed',
      skills: ['React', 'D3.js', 'Python'],
      category: 'Development',
      status: 'open',
      duration: '3-5 weeks',
      proposals_count: 2,
      assigned_to: null,
      created_at: daysAgo(9)
    },
    {
      id: 'project_11',
      title: 'WordPress Website',
      description: 'Built a professional WordPress website for our agency with custom theme development, WooCommerce integration, contact forms, blog section, and SEO-optimized structure. Delivered on time and exceeding expectations.',
      client_id: 'user_7',
      budget: 20000000,
      budget_type: 'fixed',
      skills: ['WordPress', 'PHP', 'CSS'],
      category: 'Development',
      status: 'completed',
      duration: '2 weeks',
      proposals_count: 5,
      assigned_to: 'user_1',
      created_at: daysAgo(60),
      completed_at: daysAgo(45)
    },
    {
      id: 'project_12',
      title: 'AI Chatbot Development',
      description: 'Build an intelligent customer support chatbot powered by NLP and machine learning. Should handle common customer queries, integrate with our existing ticketing system, support multi-language responses, and learn from interaction history.',
      client_id: 'user_8',
      budget: 100000000,
      budget_type: 'fixed',
      skills: ['Python', 'NLP', 'Machine Learning'],
      category: 'AI & Machine Learning',
      status: 'open',
      duration: '6-8 weeks',
      proposals_count: 1,
      assigned_to: null,
      created_at: daysAgo(10)
    },
    {
      id: 'project_13',
      title: 'Podcast Editing & Production',
      description: 'Weekly podcast editing and production for a tech podcast. Includes audio cleanup, intro/outro music mixing, noise reduction, leveling, show notes creation, and publishing to major platforms.',
      client_id: 'user_8',
      budget: 6000000,
      budget_type: 'monthly',
      skills: ['Audio Editing', 'Podcast Production'],
      category: 'Music & Audio',
      status: 'open',
      duration: '6 months',
      proposals_count: 0,
      assigned_to: null,
      created_at: daysAgo(3)
    }
  ];

  localStorage.setItem('freedom_projects', JSON.stringify(projects));

  // ─── SERVICES ────────────────────────────────────────────────────
  const services = [
    {
      id: 'service_1',
      freelancer_id: 'user_1',
      title: 'Full Stack Web Application',
      description: 'I will build a complete web application with React frontend and Node.js backend. Includes responsive design, user authentication, database integration, REST API, deployment setup, and 30 days of post-launch support.',
      price: 25000000,
      delivery_days: 14,
      category: 'Development',
      skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
      revisions: 3,
      orders_count: 18,
      rating: 4.9,
      status: 'active',
      created_at: daysAgo(180)
    },
    {
      id: 'service_2',
      freelancer_id: 'user_1',
      title: 'REST API Development',
      description: 'Professional REST API development with Node.js or Python. Includes comprehensive documentation, authentication, rate limiting, input validation, error handling, and automated testing.',
      price: 15000000,
      delivery_days: 7,
      category: 'Development',
      skills: ['Node.js', 'Python', 'REST API', 'PostgreSQL'],
      revisions: 2,
      orders_count: 12,
      rating: 4.8,
      status: 'active',
      created_at: daysAgo(150)
    },
    {
      id: 'service_3',
      freelancer_id: 'user_2',
      title: 'Complete UI/UX Design Package',
      description: 'End-to-end UI/UX design for web and mobile applications. Includes user research, persona creation, user flows, wireframes, high-fidelity mockups, interactive prototypes, and a complete design system in Figma.',
      price: 18000000,
      delivery_days: 10,
      category: 'Design',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      revisions: 5,
      orders_count: 14,
      rating: 4.9,
      status: 'active',
      created_at: daysAgo(200)
    },
    {
      id: 'service_4',
      freelancer_id: 'user_2',
      title: 'Mobile App Design',
      description: 'Beautiful and functional mobile app designs for iOS and Android. Pixel-perfect screens, component library, interaction animations, and complete handoff-ready Figma file with developer specs.',
      price: 12000000,
      delivery_days: 7,
      category: 'Design',
      skills: ['Figma', 'Mobile Design', 'iOS', 'Android'],
      revisions: 4,
      orders_count: 9,
      rating: 4.8,
      status: 'active',
      created_at: daysAgo(160)
    },
    {
      id: 'service_5',
      freelancer_id: 'user_3',
      title: 'SEO Audit & Strategy',
      description: 'Comprehensive SEO audit of your website with actionable strategy recommendations. Includes technical SEO analysis, keyword research, competitor analysis, content gap analysis, and a prioritized action plan.',
      price: 8000000,
      delivery_days: 5,
      category: 'Marketing',
      skills: ['SEO', 'Google Analytics', 'Keyword Research'],
      revisions: 2,
      orders_count: 15,
      rating: 4.7,
      status: 'active',
      created_at: daysAgo(190)
    },
    {
      id: 'service_6',
      freelancer_id: 'user_3',
      title: 'Google Ads Campaign Setup',
      description: 'Complete Google Ads campaign setup and optimization. Includes keyword research, ad copy creation, landing page recommendations, conversion tracking setup, and a two-week optimization period.',
      price: 6000000,
      delivery_days: 3,
      category: 'Marketing',
      skills: ['Google Ads', 'PPC', 'Analytics'],
      revisions: 2,
      orders_count: 10,
      rating: 4.6,
      status: 'active',
      created_at: daysAgo(140)
    },
    {
      id: 'service_7',
      freelancer_id: 'user_4',
      title: 'Blog Content Package (10 Posts)',
      description: 'Ten professionally written, SEO-optimized blog posts (1000-1500 words each). Includes keyword research, topic ideation, meta descriptions, internal linking strategy, and royalty-free images.',
      price: 5000000,
      delivery_days: 14,
      category: 'Writing',
      skills: ['Blog Posts', 'SEO Writing', 'Copywriting'],
      revisions: 3,
      orders_count: 22,
      rating: 4.6,
      status: 'active',
      created_at: daysAgo(220)
    },
    {
      id: 'service_8',
      freelancer_id: 'user_5',
      title: 'Professional Video Editing',
      description: 'Professional video editing for YouTube, social media, or corporate content. Includes color grading, audio mixing, transitions, text overlays, motion graphics, and export in multiple formats.',
      price: 10000000,
      delivery_days: 5,
      category: 'Video & Animation',
      skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
      revisions: 3,
      orders_count: 11,
      rating: 4.9,
      status: 'active',
      created_at: daysAgo(170)
    },
    {
      id: 'service_9',
      freelancer_id: 'user_5',
      title: 'Motion Graphics Intro/Outro',
      description: 'Custom animated intro and outro for your YouTube channel or brand videos. Includes logo animation, kinetic typography, sound design, and delivery in 4K resolution with transparent backgrounds.',
      price: 4000000,
      delivery_days: 3,
      category: 'Video & Animation',
      skills: ['After Effects', 'Motion Graphics', '3D Animation'],
      revisions: 4,
      orders_count: 16,
      rating: 4.8,
      status: 'active',
      created_at: daysAgo(130)
    }
  ];

  localStorage.setItem('freedom_services', JSON.stringify(services));

  // ─── PROPOSALS ───────────────────────────────────────────────────
  const proposals = [
    // Project 1: E-commerce Platform Redesign
    {
      id: 'proposal_1',
      project_id: 'project_1',
      freelancer_id: 'user_1',
      cover_letter: 'I have extensive experience building e-commerce platforms with React and Node.js. I recently completed a similar project that increased conversion rates by 35%. I would love to bring that expertise to your redesign. I can start immediately and deliver within 3 weeks.',
      bid_amount: 4500,
      delivery_days: 21,
      status: 'pending',
      created_at: daysAgo(4)
    },
    {
      id: 'proposal_2',
      project_id: 'project_1',
      freelancer_id: 'user_2',
      cover_letter: 'As a UI/UX designer with deep e-commerce experience, I can handle the design aspect of your platform redesign. I specialize in creating intuitive shopping experiences that drive engagement and sales.',
      bid_amount: 3500,
      delivery_days: 18,
      status: 'pending',
      created_at: daysAgo(4)
    },
    {
      id: 'proposal_3',
      project_id: 'project_1',
      freelancer_id: 'user_4',
      cover_letter: 'I can contribute compelling product descriptions and UX copy for your e-commerce redesign. Great copy is essential for conversion — let me help make your products shine.',
      bid_amount: 3000,
      delivery_days: 14,
      status: 'pending',
      created_at: daysAgo(3)
    },
    {
      id: 'proposal_4',
      project_id: 'project_1',
      freelancer_id: 'user_5',
      cover_letter: 'I can create stunning product videos and motion graphics for your e-commerce platform. Engaging visuals are key to converting visitors into buyers.',
      bid_amount: 4000,
      delivery_days: 25,
      status: 'pending',
      created_at: daysAgo(2)
    },

    // Project 2: Mobile App UI/UX Design
    {
      id: 'proposal_5',
      project_id: 'project_2',
      freelancer_id: 'user_2',
      cover_letter: 'Mobile app design is my core specialty. I have designed 20+ fintech apps with a focus on clean data visualization and seamless user onboarding. I follow Material Design and HIG guidelines rigorously.',
      bid_amount: 3200,
      delivery_days: 14,
      status: 'pending',
      created_at: daysAgo(2)
    },
    {
      id: 'proposal_6',
      project_id: 'project_2',
      freelancer_id: 'user_1',
      cover_letter: 'While I am primarily a developer, I have strong design skills and can deliver both the UI/UX design and a working prototype. This would give you a head start on development.',
      bid_amount: 3800,
      delivery_days: 18,
      status: 'pending',
      created_at: daysAgo(2)
    },
    {
      id: 'proposal_7',
      project_id: 'project_2',
      freelancer_id: 'user_5',
      cover_letter: 'I can create engaging micro-interactions and animated transitions for your mobile app that will make the UX feel premium and polished.',
      bid_amount: 2800,
      delivery_days: 12,
      status: 'pending',
      created_at: daysAgo(1)
    },

    // Project 3: SEO Optimization Campaign
    {
      id: 'proposal_8',
      project_id: 'project_3',
      freelancer_id: 'user_3',
      cover_letter: 'SEO is my bread and butter. I have delivered 50+ successful SEO campaigns, consistently achieving first-page rankings within 3 months. My approach is data-driven and white-hat compliant.',
      bid_amount: 1200,
      delivery_days: 10,
      status: 'pending',
      created_at: daysAgo(6)
    },
    {
      id: 'proposal_9',
      project_id: 'project_3',
      freelancer_id: 'user_4',
      cover_letter: 'I specialize in SEO content writing that ranks. I can create optimized content and help with on-page SEO as part of your optimization campaign.',
      bid_amount: 900,
      delivery_days: 12,
      status: 'pending',
      created_at: daysAgo(5)
    },

    // Project 4: Brand Identity Package
    {
      id: 'proposal_10',
      project_id: 'project_4',
      freelancer_id: 'user_2',
      cover_letter: 'Brand identity design is one of my strongest services. I take a strategic approach — starting with understanding your audience and positioning before diving into visuals. Every element will be purposeful.',
      bid_amount: 2500,
      delivery_days: 18,
      status: 'pending',
      created_at: daysAgo(3)
    },
    {
      id: 'proposal_11',
      project_id: 'project_4',
      freelancer_id: 'user_5',
      cover_letter: 'I can bring your brand to life with animated logo reveals and motion brand guidelines that will set you apart in the digital space.',
      bid_amount: 2200,
      delivery_days: 15,
      status: 'pending',
      created_at: daysAgo(2)
    },

    // Project 5: Technical Blog Content
    {
      id: 'proposal_12',
      project_id: 'project_5',
      freelancer_id: 'user_4',
      cover_letter: 'Technical writing is my specialty. I have written for publications like TechCrunch, Smashing Magazine, and Dev.to. My posts combine deep technical knowledge with engaging storytelling.',
      bid_amount: 800,
      delivery_days: 25,
      status: 'pending',
      created_at: daysAgo(5)
    },

    // Project 6: Product Explainer Video
    {
      id: 'proposal_13',
      project_id: 'project_6',
      freelancer_id: 'user_5',
      cover_letter: 'I specialize in creating compelling explainer videos that simplify complex products. My recent SaaS explainer video helped the client increase sign-ups by 40%. I will deliver a polished video within 10 days.',
      bid_amount: 2000,
      delivery_days: 10,
      status: 'pending',
      created_at: daysAgo(1)
    },

    // Project 9: Landing Page Development
    {
      id: 'proposal_14',
      project_id: 'project_9',
      freelancer_id: 'user_1',
      cover_letter: 'I build high-performance landing pages that score 95+ on PageSpeed Insights. Clean HTML, modern CSS animations, and optimized JavaScript — your page will be fast, beautiful, and conversion-optimized.',
      bid_amount: 1200,
      delivery_days: 5,
      status: 'pending',
      created_at: daysAgo(1)
    },
    {
      id: 'proposal_15',
      project_id: 'project_9',
      freelancer_id: 'user_2',
      cover_letter: 'I will design and code a stunning landing page with a focus on UX best practices and conversion optimization. My landing pages consistently achieve 5%+ conversion rates.',
      bid_amount: 1100,
      delivery_days: 6,
      status: 'pending',
      created_at: daysAgo(1)
    },

    // Project 10: Data Dashboard Development
    {
      id: 'proposal_16',
      project_id: 'project_10',
      freelancer_id: 'user_1',
      cover_letter: 'Data dashboards are my sweet spot — I have built 10+ real-time dashboards with React and D3.js. I understand data visualization best practices and can create an intuitive, performant dashboard for your team.',
      bid_amount: 4200,
      delivery_days: 28,
      status: 'pending',
      created_at: daysAgo(8)
    },

    // Project 12: AI Chatbot Development
    {
      id: 'proposal_17',
      project_id: 'project_12',
      freelancer_id: 'user_1',
      cover_letter: 'I have experience building NLP-powered chatbots using Python, Transformers, and cloud AI services. I can build an intelligent chatbot that integrates seamlessly with your ticketing system.',
      bid_amount: 7500,
      delivery_days: 45,
      status: 'pending',
      created_at: daysAgo(9)
    },

    // Project 8: Social Media Marketing
    {
      id: 'proposal_18',
      project_id: 'project_8',
      freelancer_id: 'user_3',
      cover_letter: 'Social media growth is a core part of my digital marketing expertise. I have managed accounts that grew from 0 to 50K followers organically. I will create a strategy tailored to your brand and audience.',
      bid_amount: 1000,
      delivery_days: 30,
      status: 'pending',
      created_at: daysAgo(7)
    }
  ];

  localStorage.setItem('freedom_proposals', JSON.stringify(proposals));

  // ─── REVIEWS ─────────────────────────────────────────────────────
  const reviews = [
    {
      id: 'review_1',
      reviewer_id: 'user_6',
      reviewee_id: 'user_1',
      project_id: 'project_11',
      rating: 5,
      comment: 'Alex is an outstanding developer. He delivered our WordPress site ahead of schedule and went above and beyond with custom features we had not even asked for. Communication was flawless throughout. Highly recommended!',
      created_at: daysAgo(44)
    },
    {
      id: 'review_2',
      reviewer_id: 'user_1',
      reviewee_id: 'user_6',
      project_id: 'project_11',
      rating: 5,
      comment: 'TechStart is a fantastic client to work with. Clear requirements, prompt feedback, and they truly value quality work. Would love to collaborate again on future projects.',
      created_at: daysAgo(44)
    },
    {
      id: 'review_3',
      reviewer_id: 'user_8',
      reviewee_id: 'user_2',
      project_id: null,
      service_id: 'service_3',
      rating: 5,
      comment: 'Sarah completely transformed our product design. Her user research uncovered insights we had never considered, and the final designs were pixel-perfect. Our user engagement increased by 60% after launch.',
      created_at: daysAgo(30)
    },
    {
      id: 'review_4',
      reviewer_id: 'user_7',
      reviewee_id: 'user_3',
      project_id: null,
      service_id: 'service_5',
      rating: 5,
      comment: 'Marcus delivered an incredibly thorough SEO audit. His strategy helped us rank for 15 new keywords within two months. The ROI on his services is exceptional.',
      created_at: daysAgo(25)
    },
    {
      id: 'review_5',
      reviewer_id: 'user_6',
      reviewee_id: 'user_3',
      project_id: null,
      service_id: 'service_6',
      rating: 4,
      comment: 'Great Google Ads setup. Marcus knows his way around PPC campaigns. Our cost per acquisition dropped by 30%. Only minor delays in delivery, but the results speak for themselves.',
      created_at: daysAgo(40)
    },
    {
      id: 'review_6',
      reviewer_id: 'user_8',
      reviewee_id: 'user_4',
      project_id: null,
      service_id: 'service_7',
      rating: 5,
      comment: 'Emma writes with clarity and authority. The blog posts she delivered were well-researched, engaging, and perfectly optimized for our target keywords. She is now our go-to writer.',
      created_at: daysAgo(20)
    },
    {
      id: 'review_7',
      reviewer_id: 'user_7',
      reviewee_id: 'user_4',
      project_id: null,
      service_id: 'service_7',
      rating: 4,
      comment: 'High-quality writing with excellent SEO integration. Emma understands content strategy and delivers consistently polished work. Turnaround time could be slightly faster.',
      created_at: daysAgo(35)
    },
    {
      id: 'review_8',
      reviewer_id: 'user_6',
      reviewee_id: 'user_5',
      project_id: null,
      service_id: 'service_8',
      rating: 5,
      comment: 'David is a video editing wizard. The product video he created for us was cinematic quality — stunning motion graphics, perfect pacing, and incredible attention to detail. Worth every penny.',
      created_at: daysAgo(15)
    },
    {
      id: 'review_9',
      reviewer_id: 'user_8',
      reviewee_id: 'user_5',
      project_id: null,
      service_id: 'service_9',
      rating: 5,
      comment: 'The animated intro David created for our YouTube channel is absolutely gorgeous. Smooth animations, great sound design, and it perfectly captures our brand energy. We get compliments on it every week.',
      created_at: daysAgo(50)
    },
    {
      id: 'review_10',
      reviewer_id: 'user_7',
      reviewee_id: 'user_1',
      project_id: 'project_11',
      rating: 5,
      comment: 'Alex built our WordPress site flawlessly. Clean code, fast loading times, and a beautiful design. He even helped us set up hosting and SSL. True professional.',
      created_at: daysAgo(43)
    },
    {
      id: 'review_11',
      reviewer_id: 'user_6',
      reviewee_id: 'user_2',
      project_id: null,
      service_id: 'service_4',
      rating: 5,
      comment: 'Sarah designed a stunning mobile app interface for our product. Every screen is thoughtfully crafted with perfect spacing, typography, and color usage. The handoff file was immaculate.',
      created_at: daysAgo(55)
    },
    {
      id: 'review_12',
      reviewer_id: 'user_7',
      reviewee_id: 'user_2',
      project_id: null,
      service_id: 'service_3',
      rating: 4,
      comment: 'Great UI/UX work from Sarah. She took the time to understand our users and created designs that were both beautiful and functional. Minor revisions needed but overall excellent.',
      created_at: daysAgo(65)
    },
    {
      id: 'review_13',
      reviewer_id: 'user_8',
      reviewee_id: 'user_1',
      project_id: null,
      service_id: 'service_2',
      rating: 5,
      comment: 'The API Alex built is rock solid. Clean architecture, excellent documentation, comprehensive error handling — everything a developer could ask for. Integration with our systems was seamless.',
      created_at: daysAgo(70)
    },
    {
      id: 'review_14',
      reviewer_id: 'user_6',
      reviewee_id: 'user_4',
      project_id: null,
      service_id: 'service_7',
      rating: 5,
      comment: 'Emma delivered 10 blog posts that read like magazine articles. Each one was thoroughly researched, perfectly structured, and optimized for our target audience. Our blog traffic doubled.',
      created_at: daysAgo(80)
    },
    {
      id: 'review_15',
      reviewer_id: 'user_7',
      reviewee_id: 'user_5',
      project_id: null,
      service_id: 'service_8',
      rating: 5,
      comment: 'David turned our raw footage into a professional promotional video that blew us away. His color grading and pacing are masterful. Already planning our next project together.',
      created_at: daysAgo(28)
    },
    {
      id: 'review_16',
      reviewer_id: 'user_8',
      reviewee_id: 'user_3',
      project_id: null,
      service_id: 'service_5',
      rating: 5,
      comment: 'Thorough, data-driven, and actionable — Marcus delivered an SEO audit that gave us a clear roadmap. We implemented his top 5 recommendations and saw a 40% traffic increase in 6 weeks.',
      created_at: daysAgo(90)
    }
  ];

  localStorage.setItem('freedom_reviews', JSON.stringify(reviews));

  // ─── CONVERSATIONS & MESSAGES ────────────────────────────────────
  const conversations = [
    {
      id: 'conv_1',
      participants: ['user_1', 'user_6'],
      last_message: 'Sounds good, I will send over the API documentation by tomorrow.',
      last_message_at: daysAgo(0),
      unread_count: { user_1: 0, user_6: 1 },
      created_at: daysAgo(20)
    },
    {
      id: 'conv_2',
      participants: ['user_2', 'user_8'],
      last_message: 'The revised mockups look perfect. Let us proceed with development.',
      last_message_at: daysAgo(1),
      unread_count: { user_2: 1, user_8: 0 },
      created_at: daysAgo(15)
    },
    {
      id: 'conv_3',
      participants: ['user_3', 'user_7'],
      last_message: 'The SEO report is attached. Let me know if you have any questions.',
      last_message_at: daysAgo(2),
      unread_count: { user_3: 0, user_7: 0 },
      created_at: daysAgo(10)
    },
    {
      id: 'conv_4',
      participants: ['user_4', 'user_8'],
      last_message: 'I have outlined the content calendar for next month. Please review.',
      last_message_at: daysAgo(1),
      unread_count: { user_4: 0, user_8: 2 },
      created_at: daysAgo(8)
    },
    {
      id: 'conv_5',
      participants: ['user_5', 'user_6'],
      last_message: 'The final video render is uploading now. Should be ready in 20 minutes.',
      last_message_at: daysAgo(0),
      unread_count: { user_5: 0, user_6: 0 },
      created_at: daysAgo(5)
    },
    {
      id: 'conv_6',
      participants: ['user_1', 'user_2'],
      last_message: 'Great working with you on this project. Let us collaborate again soon!',
      last_message_at: daysAgo(3),
      unread_count: { user_1: 0, user_2: 0 },
      created_at: daysAgo(30)
    }
  ];

  localStorage.setItem('freedom_conversations', JSON.stringify(conversations));

  const messages = [
    // Conversation 1: Alex <-> TechStart (about API project)
    {
      id: 'msg_1',
      conversation_id: 'conv_1',
      sender_id: 'user_6',
      content: 'Hi Alex, we are really impressed with your proposal for the API project. Can you walk us through your approach?',
      read: true,
      created_at: daysAgo(20)
    },
    {
      id: 'msg_2',
      conversation_id: 'conv_1',
      sender_id: 'user_1',
      content: 'Thank you! I would start with a thorough requirements analysis, then set up the FastAPI project with our agreed architecture. I will use PostgreSQL with SQLAlchemy ORM and implement JWT authentication from day one.',
      read: true,
      created_at: daysAgo(20)
    },
    {
      id: 'msg_3',
      conversation_id: 'conv_1',
      sender_id: 'user_6',
      content: 'That sounds like exactly what we need. Can you have the first milestone ready by next week?',
      read: true,
      created_at: daysAgo(19)
    },
    {
      id: 'msg_4',
      conversation_id: 'conv_1',
      sender_id: 'user_1',
      content: 'Absolutely. I will have the core authentication endpoints and database schema ready for review by Friday. I will set up a staging environment on AWS so you can test directly.',
      read: true,
      created_at: daysAgo(19)
    },
    {
      id: 'msg_5',
      conversation_id: 'conv_1',
      sender_id: 'user_1',
      content: 'Sounds good, I will send over the API documentation by tomorrow.',
      read: false,
      created_at: daysAgo(0)
    },

    // Conversation 2: Sarah <-> InnovateCorp (about design work)
    {
      id: 'msg_6',
      conversation_id: 'conv_2',
      sender_id: 'user_8',
      content: 'Hi Sarah, we loved your portfolio! We are looking for a designer to own the complete UX for our new fintech product. Are you available?',
      read: true,
      created_at: daysAgo(15)
    },
    {
      id: 'msg_7',
      conversation_id: 'conv_2',
      sender_id: 'user_2',
      content: 'Thank you for reaching out! I would love to learn more about the project. Could you share the product brief and any existing brand guidelines?',
      read: true,
      created_at: daysAgo(14)
    },
    {
      id: 'msg_8',
      conversation_id: 'conv_2',
      sender_id: 'user_8',
      content: 'Sure, I just shared the brief in the project description. Key focus areas are the dashboard, onboarding flow, and transaction history. We want it to feel premium but approachable.',
      read: true,
      created_at: daysAgo(14)
    },
    {
      id: 'msg_9',
      conversation_id: 'conv_2',
      sender_id: 'user_2',
      content: 'Perfect. I have prepared initial wireframes and a mood board. Let me share the Figma link so you can review and leave comments.',
      read: true,
      created_at: daysAgo(3)
    },
    {
      id: 'msg_10',
      conversation_id: 'conv_2',
      sender_id: 'user_8',
      content: 'The revised mockups look perfect. Let us proceed with development.',
      read: false,
      created_at: daysAgo(1)
    },

    // Conversation 3: Marcus <-> GrowthLab (about SEO campaign)
    {
      id: 'msg_11',
      conversation_id: 'conv_3',
      sender_id: 'user_7',
      content: 'Marcus, we need help with our SEO. Our organic traffic has been declining for the past 3 months. Can you take a look?',
      read: true,
      created_at: daysAgo(10)
    },
    {
      id: 'msg_12',
      conversation_id: 'conv_3',
      sender_id: 'user_3',
      content: 'I would be happy to help. I will need access to your Google Analytics and Search Console to run a proper audit. Can you send me the credentials?',
      read: true,
      created_at: daysAgo(9)
    },
    {
      id: 'msg_13',
      conversation_id: 'conv_3',
      sender_id: 'user_7',
      content: 'Just sent you an invite to both accounts. Looking forward to seeing your analysis.',
      read: true,
      created_at: daysAgo(9)
    },
    {
      id: 'msg_14',
      conversation_id: 'conv_3',
      sender_id: 'user_3',
      content: 'The SEO report is attached. Let me know if you have any questions.',
      read: true,
      created_at: daysAgo(2)
    },

    // Conversation 4: Emma <-> InnovateCorp (about content)
    {
      id: 'msg_15',
      conversation_id: 'conv_4',
      sender_id: 'user_8',
      content: 'Hi Emma, we are expanding our content team and your writing samples are exactly what we are looking for. Are you available for an ongoing engagement?',
      read: true,
      created_at: daysAgo(8)
    },
    {
      id: 'msg_16',
      conversation_id: 'conv_4',
      sender_id: 'user_4',
      content: 'Thank you! I have availability for 3-4 articles per week. What topics are you focusing on? I can share some topic ideas once I understand your content strategy better.',
      read: true,
      created_at: daysAgo(7)
    },
    {
      id: 'msg_17',
      conversation_id: 'conv_4',
      sender_id: 'user_8',
      content: 'Our focus areas are cloud computing, DevOps, and AI/ML. We want thought leadership content that positions us as industry experts.',
      read: true,
      created_at: daysAgo(7)
    },
    {
      id: 'msg_18',
      conversation_id: 'conv_4',
      sender_id: 'user_4',
      content: 'I have outlined the content calendar for next month. Please review.',
      read: false,
      created_at: daysAgo(1)
    },

    // Conversation 5: David <-> TechStart (about video)
    {
      id: 'msg_19',
      conversation_id: 'conv_5',
      sender_id: 'user_6',
      content: 'David, we need a series of product demo videos for our new feature launch. Can you handle 3 videos in the next two weeks?',
      read: true,
      created_at: daysAgo(5)
    },
    {
      id: 'msg_20',
      conversation_id: 'conv_5',
      sender_id: 'user_5',
      content: 'Absolutely! I can deliver 3 videos within that timeframe. Could you share the product screenshots and any existing brand assets? I will create a storyboard for your approval first.',
      read: true,
      created_at: daysAgo(5)
    },
    {
      id: 'msg_21',
      conversation_id: 'conv_5',
      sender_id: 'user_6',
      content: 'Great, I have uploaded everything to the shared folder. The first video should focus on the onboarding flow. Keep the style consistent with our existing videos.',
      read: true,
      created_at: daysAgo(4)
    },
    {
      id: 'msg_22',
      conversation_id: 'conv_5',
      sender_id: 'user_5',
      content: 'The final video render is uploading now. Should be ready in 20 minutes.',
      read: true,
      created_at: daysAgo(0)
    },

    // Conversation 6: Alex <-> Sarah (peer collaboration)
    {
      id: 'msg_23',
      conversation_id: 'conv_6',
      sender_id: 'user_1',
      content: 'Hey Sarah, I just finished the frontend implementation based on your designs. The Figma handoff made it so easy — everything was perfectly specced.',
      read: true,
      created_at: daysAgo(30)
    },
    {
      id: 'msg_24',
      conversation_id: 'conv_6',
      sender_id: 'user_2',
      content: 'That is great to hear! I always try to make my handoffs as developer-friendly as possible. How did the responsive breakpoints work out?',
      read: true,
      created_at: daysAgo(29)
    },
    {
      id: 'msg_25',
      conversation_id: 'conv_6',
      sender_id: 'user_1',
      content: 'Flawlessly. The mobile layouts transitioned perfectly. The client is thrilled with the final product.',
      read: true,
      created_at: daysAgo(29)
    },
    {
      id: 'msg_26',
      conversation_id: 'conv_6',
      sender_id: 'user_2',
      content: 'Great working with you on this project. Let us collaborate again soon!',
      read: true,
      created_at: daysAgo(3)
    }
  ];

  localStorage.setItem('freedom_messages', JSON.stringify(messages));

  // ─── NOTIFICATIONS ───────────────────────────────────────────────
  const notifications = [
    {
      id: 'notif_1',
      user_id: 'user_1',
      type: 'proposal_accepted',
      title: 'Proposal Accepted',
      message: 'Your proposal for "API Development & Integration" has been accepted by TechStart Inc.',
      link: '#/projects/project_7',
      read: true,
      created_at: daysAgo(18)
    },
    {
      id: 'notif_2',
      user_id: 'user_1',
      type: 'new_review',
      title: 'New Review',
      message: 'TechStart Inc left you a 5-star review on "WordPress Website".',
      link: '#/reviews',
      read: true,
      created_at: daysAgo(44)
    },
    {
      id: 'notif_3',
      user_id: 'user_2',
      type: 'new_message',
      title: 'New Message',
      message: 'InnovateCorp sent you a new message about your design work.',
      link: '#/messages/conv_2',
      read: false,
      created_at: daysAgo(1)
    },
    {
      id: 'notif_4',
      user_id: 'user_6',
      type: 'new_proposal',
      title: 'New Proposal Received',
      message: 'Alex Morgan submitted a proposal for "E-commerce Platform Redesign".',
      link: '#/projects/project_1',
      read: false,
      created_at: daysAgo(4)
    },
    {
      id: 'notif_5',
      user_id: 'user_6',
      type: 'new_proposal',
      title: 'New Proposal Received',
      message: 'Sarah Chen submitted a proposal for "E-commerce Platform Redesign".',
      link: '#/projects/project_1',
      read: false,
      created_at: daysAgo(4)
    }
  ];

  localStorage.setItem('freedom_notifications', JSON.stringify(notifications));

  // ─── CATEGORIES ──────────────────────────────────────────────────
  const categories = [
    'Development',
    'Design',
    'Marketing',
    'Writing',
    'Video & Animation',
    'Music & Audio',
    'Business',
    'AI & Machine Learning'
  ];

  localStorage.setItem('freedom_categories', JSON.stringify(categories));

  // ─── Mark as seeded ──────────────────────────────────────────
  localStorage.setItem('freedom_seeded', 'true');
  localStorage.setItem('freedom_seeded_version', 'v3');

  console.log('[FreeDom] Seed data loaded successfully.');
  console.log('[FreeDom]   → 8 users');
  console.log('[FreeDom]   → 13 projects');
  console.log('[FreeDom]   → 9 services');
  console.log('[FreeDom]   → 18 proposals');
  console.log('[FreeDom]   → 16 reviews');
  console.log('[FreeDom]   → 6 conversations with 26 messages');
  console.log('[FreeDom]   → 5 notifications');
  console.log('[FreeDom]   → 8 categories');
  console.log('[FreeDom] Login with any demo user email + password: demo123');
}
