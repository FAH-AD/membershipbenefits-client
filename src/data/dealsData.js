export const categories = [
  { id: 'all', name: 'All Deals', icon: '⚡', count: 609 },
  { id: 'ai', name: 'AI', icon: '🤖', count: 16 },
  { id: 'project-management', name: 'Project Management', icon: '📋', count: 14 },
  { id: 'data', name: 'Data Software', icon: '🗄️', count: 12 },
  { id: 'customer', name: 'Customer Software', icon: '💬', count: 12 },
  { id: 'development', name: 'Development', icon: '⚙️', count: 16 },
  { id: 'marketing', name: 'Marketing', icon: '📣', count: 16 },
  { id: 'finance', name: 'Finance', icon: '💰', count: 13 },
  { id: 'communications', name: 'Communications', icon: '📡', count: 12 },
  { id: 'sales', name: 'Sales', icon: '🎯', count: 14 },
  { id: 'business', name: 'Business', icon: '🏢', count: 11 },
  { id: 'it', name: 'IT Software', icon: '🖥️', count: 12 },
  { id: 'hr', name: 'Human Resources', icon: '👥', count: 10 },
  { id: 'operations', name: 'Operations', icon: '🔄', count: 12 },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🎨', count: 10 },
];

export const deals = [
  {
    id: 'notion',
    name: 'Notion',
    category: 'ai',
    categoryName: 'AI & Productivity',
    logo: 'N',
    logoStyle: { background: 'var(--n9)', color: 'var(--w)', fontSize: '20px', fontWeight: '900' },
    tag: 'PREMIUM',
    tagClass: 'pm',
    bgClass: 'bg-a',
    description: 'The all-in-one workspace for your notes, tasks, wikis, and databases. Enhanced with powerful AI capabilities.',
    offer: '6 months free',
    offerDetail: '6 months free on the Business plan with Unlimited AI',
    subText: 'on Business Plan',
    savings: 'Save up to $12,000',
    rating: '4.9/5',
    users: '16k+ users',
    dealsContent: {
      title: 'This deal is reserved for small businesses meeting the following eligibility criteria:',
      items: [
        'Early stages up to Series A',
        'A small team of no more than 25 employees',
        'Referred by a startup partner (which is us!)',
        'A new customer of Notion'
      ],
      description: 'Leveraging this coupon code equips you a one-year free subscription to Notion\'s Business plan, usually priced at $15 per seat per month, saving you up to $12,000. You also receive unlimited AI generation at no cost, enhancing your ability to engage and manage team work effectively.'
    },
    pricingContent: [
      { name: 'Plus Plan', price: '$10 /user/month (annual)' },
      { name: 'Business Plan', price: '$15 /user/month (annual)' },
      { name: 'Notion AI Add-on', price: '$8 /user/month' },
      { name: 'Enterprise', price: 'Custom Pricing' }
    ],
    faqContent: [
      { q: 'Is this deal for new users only?', a: 'Yes, this specific startup offer is valid only for new Notion customers.' },
      { q: 'Can I use this with other discounts?', a: 'Typically, this offer cannot be combined with other promotional credits.' }
    ]
  },
  {
    id: 'monday-com',
    name: 'Monday.com',
    category: 'project-management',
    categoryName: 'Project Management',
    logo: 'MON',
    logoStyle: { background: 'var(--w)', color: '#6161FF', fontSize: '16px', fontWeight: '900' },
    tag: 'NEW',
    tagClass: 'nw',
    bgClass: 'bg-b',
    description: 'A cloud-based Work OS, where teams create workflow apps in minutes to run their processes, projects, and everyday work.',
    offer: '1 month free',
    offerDetail: '1 month free on any plan (Unlimited users/boards)',
    subText: 'Unlimited users',
    savings: 'Save up to $80',
    rating: '4.7/5',
    users: '10k+ reviews',
    dealsContent: {
      title: 'Boost your team\'s productivity with Monday.com:',
      items: [
        'Unlimited boards and items',
        'Customizable workflows for any industry',
        '200+ templates to get started quickly',
        'Advanced automation and integrations'
      ],
      description: 'Monday.com is a Work OS that powers teams to run projects and workflows with confidence. It\'s a simple but intuitive tool for teams to shape workflows, plan, run, and track their processes, projects, and everyday work.'
    },
    pricingContent: [
      { name: 'Basic', price: '$9 /seat/month' },
      { name: 'Standard', price: '$12 /seat/month' },
      { name: 'Pro', price: '$19 /seat/month' },
      { name: 'Enterprise', price: 'Custom Quote' }
    ],
    faqContent: [
      { q: 'Can I change plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time from your account settings.' },
      { q: 'Is there a free trial?', a: 'Monday.com offers a 14-day free trial, which can be extended with our exclusive members-only deal.' }
    ]
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'data',
    categoryName: 'Data & Operations',
    logo: 'AIR',
    logoStyle: { background: '#ef3340', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'POPULAR',
    tagClass: '',
    bgClass: 'bg-g',
    description: 'Connect everything, achieve anything. Airtable is a low-code platform for building collaborative apps.',
    offer: '$1,000 credits',
    offerDetail: '$1,000 in credits for 1 year (Valid for any plan)',
    subText: 'for 12 months',
    savings: 'Save up to $1,000',
    rating: '4.6/5',
    users: '5k+ users',
    dealsContent: {
      title: 'Build your own custom business apps with Airtable:',
      items: [
        'Relational database power without code',
        'Custom interfaces for your data and teams',
        'Advanced automations and syncing capabilities',
        'Enterprise-grade security and permissions'
      ],
      description: 'Airtable enables any team, regardless of technical skill, to build exactly what they need to manage their unique workflows. From product roadmaps to production tracking, Airtable connects your data, workflows, and teams.'
    },
    pricingContent: [
      { name: 'Team Plan', price: '$20 /seat/month' },
      { name: 'Business Plan', price: '$45 /seat/month' },
      { name: 'Enterprise', price: 'Custom Pricing' },
      { name: 'Airtable AI Add-on', price: '+$6 /seat/month' }
    ],
    faqContent: [
      { q: 'Are these credits recurring?', a: 'No, the $1,000 credit is a one-time grant that must be used within 12 months.' },
      { q: 'Can existing customers apply?', a: 'The startup deal is primarily for new customers or those on a free plan.' }
    ]
  },
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'customer',
    categoryName: 'Customer Software',
    logo: 'INT',
    logoStyle: { background: '#0057ff', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'PREMIUM',
    tagClass: 'pm',
    bgClass: 'bg-a',
    description: 'The complete AI-first customer service platform. Deliver better, faster support with an AI agent, help desk, and proactive support tools.',
    offer: '1 year free',
    offerDetail: '1 year free on the Advanced plan (Unlimited support)',
    subText: 'Advanced Plan',
    savings: 'Save up to $3,108',
    rating: '4.4/5',
    users: '2k+ reviews',
    dealsContent: {
      title: 'Automate your support with Intercom\'s AI-first platform:',
      items: [
        'Shared inbox, ticketing, and chatbot workflows',
        'Fin AI agent for instant customer resolutions',
        'Outbound messaging and in-product support',
        'Advanced customer data orchestration'
      ],
      description: 'Intercom is the complete AI-first customer service platform that helps you deliver better, faster support. It combines an AI agent, help desk, and proactive support tools into one powerful platform.'
    },
    pricingContent: [
      { name: 'Starter', price: 'From $74 /month' },
      { name: 'Pro', price: 'Custom Quote' },
      { name: 'Premium', price: 'Custom Quote' },
      { name: 'Fin AI Agent', price: '$0.99 per resolution' }
    ],
    faqContent: [
      { q: 'What happens after the first year?', a: 'After 12 months, you\'ll transition to standard pricing with a continued legacy discount for eligible startups.' },
      { q: 'Does this include the AI features?', a: 'Most startup deals include access to core AI features, though Fin resolutions may have tiered pricing.' }
    ]
  },
  {
    id: 'aws-activate',
    name: 'AWS Activate',
    category: 'development',
    categoryName: 'Cloud & Infrastructure',
    logo: 'AWS',
    logoStyle: { background: 'var(--w)', color: 'var(--n9)', fontSize: '16px', fontWeight: '900' },
    tag: 'MAX SAVINGS',
    tagClass: 'pm',
    bgClass: 'bg-a',
    description: 'Get your startup up and running with AWS Activate, providing you with the tools and resources you need to get started on AWS.',
    offer: '$100k credits',
    offerDetail: 'Up to $100,000 in credits for cloud infrastructure',
    subText: 'Cloud Credits',
    savings: 'Save up to $100k',
    rating: '4.9/5',
    users: 'Worldwide',
    dealsContent: {
      title: 'Scale your startup with AWS Activate credits:',
      items: [
        'Up to $100,000 in promotional credits',
        'Access to AWS business and data services',
        'Elastic scaling and enterprise-grade security',
        'Specialized startup support and office hours'
      ],
      description: 'Amazon Web Services (AWS) is the world\'s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.'
    },
    pricingContent: [
      { name: 'Pay-as-you-go', price: 'Variable based on usage' },
      { name: 'Savings Plans', price: 'Up to 72% discount' },
      { name: 'Free Tier', price: '$0 (various service limits)' },
      { name: 'Spot Instances', price: 'Up to 90% discount' }
    ],
    faqContent: [
      { q: 'Are credits stackable?', a: 'No, Activate credits typically do not stack with other major AWS credit programs.' },
      { q: 'What services are covered?', a: 'Almost all AWS services including EC2, S3, RDS, and Lambda are covered by credits.' }
    ]
  },
  {
    id: 'semrush',
    name: 'Semrush',
    category: 'marketing',
    categoryName: 'Marketing & SEO',
    logo: 'SEM',
    logoStyle: { background: '#ff642d', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'POPULAR',
    tagClass: '',
    bgClass: 'bg-g',
    description: 'Get measurable results from online marketing. Do SEO, content marketing, competitor research, PPC and social media marketing from just one platform.',
    offer: '1 month free',
    offerDetail: '1 month free on the Guru plan (Full SEO & PPC Toolkit)',
    subText: 'Guru Plan',
    savings: 'Save up to $250',
    rating: '4.5/5',
    users: '10k+ users',
    dealsContent: {
      title: 'Master your market with Semrush\'s all-in-one marketing toolkit:',
      items: [
        'Keyword research and technical SEO audits',
        'Competitive analysis and market insights',
        'Content marketing and social media management',
        'PPC and paid advertising research tools'
      ],
      description: 'Semrush is a leading online visibility management SaaS platform that allows businesses globally to run search engine optimization, pay-per-click, content, social media, and competitive research campaigns.'
    },
    pricingContent: [
      { name: 'Pro Plan', price: '$129.95 /month' },
      { name: 'Guru Plan', price: '$249.95 /month' },
      { name: 'Business Plan', price: '$499.95 /month' }
    ],
    faqContent: [
      { q: 'Can I cancel during the trial?', a: 'Yes, you can cancel at any time during the 30-day trial to avoid being charged.' },
      { q: 'Does this include all features?', a: 'The Guru plan includes content marketing tools, historical data, and extended limits compared to the Pro plan.' }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'finance',
    categoryName: 'Finance & Payments',
    logo: 'STR',
    logoStyle: { background: '#635bff', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'NEW',
    tagClass: 'nw',
    bgClass: 'bg-b',
    description: 'Financial infrastructure for the internet. Millions of companies of all sizes use Stripe online and in person to accept payments, send payouts, and manage their businesses online.',
    offer: '$50k fee waived',
    offerDetail: 'Fees waived on first $50,000 in volume',
    subText: 'No fees on first $50k',
    savings: 'Save up to $1,500',
    rating: '4.8/5',
    users: 'Global Standard',
    dealsContent: {
      title: 'Launch and scale your internet business with Stripe:',
      items: [
        'Waived transaction fees on your first 20-50k volume',
        'Global payments support across 135+ currencies',
        'Comprehensive billing, invoicing, and subscription tools',
        'Enterprise-grade fraud protection with Stripe Radar'
      ],
      description: 'Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world\'s largest to the most ambitious startups—use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.'
    },
    pricingContent: [
      { name: 'Cards & Digital Wallets', price: '2.9% + 30¢ per transaction' },
      { name: 'International Cards', price: '+1.5% and 1% conversion fee' },
      { name: 'ACH Direct Debit', price: '0.8% (capped at $5.00)' },
      { name: 'Billing (Invoicing)', price: '0.5% - 0.7% per paid invoice' }
    ],
    faqContent: [
      { q: 'Is there a monthly fee?', a: 'No, Stripe only charges for what you use, with no setup or monthly fees.' },
      { q: 'Does this cover Atlas?', a: 'Stripe Atlas for company incorporation is typically a separate one-time fee of $500.' }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'communications',
    categoryName: 'Communications',
    logo: 'SLK',
    logoStyle: { background: '#4a154b', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'POPULAR',
    tagClass: '',
    bgClass: 'bg-g',
    description: 'Slack is a new way to communicate with your team. It’s faster, better organized, and more secure than email.',
    offer: '25% off',
    offerDetail: '25% off for 12 months (Pro & Business+ plans)',
    subText: 'for 12 months',
    savings: 'Save up to $1,000',
    rating: '4.8/5',
    users: '20k+ reviews',
    dealsContent: {
      title: 'Communicate faster and keep your team in sync with Slack:',
      items: [
        'Organized channels for projects, teams, and topics',
        'Real-time messaging, huddles, and video clips',
        'Deep integrations with 2,400+ tools like Jira, Google Drive, and Zoom',
        'Advanced search and AI-powered thread summaries'
      ],
      description: 'Slack is a new way to communicate with your team. It’s faster, better organized, and more secure than email. Slack brings all your team communication into one place, whether you\'re at your desk or on the go.'
    },
    pricingContent: [
      { name: 'Pro', price: '$7.25 /user/month' },
      { name: 'Business+', price: '$12.50 /user/month' },
      { name: 'Enterprise Grid', price: 'Custom Pricing' },
      { name: 'Slack AI Add-on', price: '$10 /user/month' }
    ],
    faqContent: [
      { q: 'What happens after 12 months?', a: 'Your subscription will renew at the standard list price, but you can switch to a free plan at any time.' },
      { q: 'Is there a limit on users?', a: 'No, you can add as many users as you need, but the discount is typically capped at a certain seat count for startups.' }
    ]
  },
  {
    id: 'apollo-io',
    name: 'Apollo.io',
    category: 'sales',
    categoryName: 'Sales & Prospecting',
    logo: 'APL',
    logoStyle: { background: '#0046fe', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'NEW',
    tagClass: 'nw',
    bgClass: 'bg-b',
    description: 'The leading go-to-market platform for outbound sales teams. Find lead, build pipeline, and close deals efficiently.',
    offer: '20% off',
    offerDetail: '20% off for 12 months on any plan',
    subText: 'for 12 months',
    savings: 'Save up to $200',
    rating: '4.8/5',
    users: '6k+ reviews',
    dealsContent: {
      title: 'Find, contact, and close your ideal customers with Apollo.io:',
      items: [
        'World-class leads database with 275M+ contacts',
        'AI-powered sales intelligence and prospecting',
        'Advanced multi-channel sequencing and email automation',
        'Full-funnel analytics and CRM integration'
      ],
      description: 'Apollo.io is the leading go-to-market platform for outbound sales teams. It provides the data, insights, and engagement tools needed to find lead, build pipeline, and close deals efficiently.'
    },
    pricingContent: [
      { name: 'Basic Plan', price: '$49 /user/month' },
      { name: 'Professional Plan', price: '$79 /user/month' },
      { name: 'Organization Plan', price: '$119 /user/month' }
    ],
    faqContent: [
      { q: 'Does this include mobile numbers?', a: 'Yes, Professional and Organization plans include higher mobile number and email credit limits.' },
      { q: 'Can I use this with a free account?', a: 'Yes, you can apply the discount when upgrading from a free account to a paid plan.' }
    ]
  },
  {
    id: 'typeform',
    name: 'Typeform',
    category: 'business',
    categoryName: 'Business & Forms',
    logo: 'TF',
    logoStyle: { background: '#262627', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'POPULAR',
    tagClass: '',
    bgClass: 'bg-g',
    description: 'Typeform transforms static forms and surveys into interactive experiences.',
    offer: '40% off',
    offerDetail: '40% off for 12 months (Any Annual plan)',
    subText: 'on Annual Plans',
    savings: 'Save up to $400',
    rating: '4.7/5',
    users: '3k+ reviews',
    dealsContent: {
      title: 'Engage your audience with conversational forms by Typeform:',
      items: [
        'Guided conversations that feel more human',
        'Higher completion rates through smart logic and design',
        'Videoask integration for personalized video feedback',
        'Seamless workflows with CRM and marketing tool sync'
      ],
      description: 'Typeform transforms static forms and surveys into interactive experiences. It\'s the standard for businesses that care about their brand and want to provide a premium experience for leur respondents.'
    },
    pricingContent: [
      { name: 'Basic Plan', price: '$25 /month' },
      { name: 'Plus Plan', price: '$50 /month' },
      { name: 'Business Plan', price: '$83 /month' },
      { name: 'Enterprise', price: 'Custom Quote' }
    ],
    faqContent: [
      { q: 'Can I use logic jumps on all plans?', a: 'Logic jumps are available on paid plans, starting with Basic.' },
      { q: 'Is there a response limit?', a: 'Yes, each plan has a specific monthly response limit (e.g., 100 for Basic, 1k for Plus, 10k for Business).' }
    ]
  },
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure',
    category: 'it',
    categoryName: 'IT & Cloud',
    logo: 'AZR',
    logoStyle: { background: 'var(--w)', color: '#0078d4', fontSize: '16px', fontWeight: '900' },
    tag: 'MAX SAVINGS',
    tagClass: 'pm',
    bgClass: 'bg-a',
    description: 'Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges.',
    offer: '$150k credits',
    offerDetail: 'Up to $150,000 in credits over 2 years',
    subText: 'Cloud Credits',
    savings: 'Save up to $150k',
    rating: '4.8/5',
    users: 'Enterprise Grade',
    dealsContent: {
      title: 'Innovate at scale with Microsoft Azure\'s cloud platform:',
      items: [
        'Up to $150,000 in promotional credits',
        'Access to world-class AI services and developer tools',
        'Seamless integration with the Microsoft ecosystem',
        'Global availability with 60+ regions worldwide'
      ],
      description: 'Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges. It’s the freedom to build, manage, and deploy applications on a massive, global network using your favorite tools and frameworks.'
    },
    pricingContent: [
      { name: 'Pay-As-You-Go', price: 'Variable based on usage' },
      { name: 'Azure Reservations', price: 'Up to 72% discount' },
      { name: 'Free Account', price: '$0 (25+ services always free)' },
      { name: 'Spot Instances', price: 'Up to 90% discount' }
    ],
    faqContent: [
      { q: 'Are credits only for new users?', a: 'Founders Hub is designed for startups in early stages, typically for companies under 7 years old.' },
      { q: 'Can I use credits for OpenAI on Azure?', a: 'Yes, Azure credits can be used for Azure OpenAI Service and other cognitive services.' }
    ]
  },
  {
    id: 'indeed',
    name: 'Indeed',
    category: 'hr',
    categoryName: 'Human Resources',
    logo: 'IN',
    logoStyle: { background: '#2164f3', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'POPULAR',
    tagClass: '',
    bgClass: 'bg-g',
    description: 'Indeed is the #1 job site in the world. It\'s the most powerful tool for companies to attract talent.',
    offer: '€100 credits',
    offerDetail: '€100 in free ad credits for job sponsorship',
    subText: 'Ad Credits',
    savings: 'Save €100',
    rating: '4.6/5',
    users: '350M+ visitors',
    dealsContent: {
      title: 'Find your next hire with Indeed\'s recruitment platform:',
      items: [
        'Access to millions of job seekers globally',
        'Sponsored job postings for increased visibility',
        'Applicant tracking and screening tools',
        'Data-driven hiring insights and performance metrics'
      ],
      description: 'Indeed is the #1 job site in the world with over 350M+ unique visitors every month. It\'s the most powerful tool for companies to attract, interview, and hire talent efficiently.'
    },
    pricingContent: [
      { name: 'Free Job Posting', price: '$0 (Standard organic search)' },
      { name: 'Sponsored Jobs', price: 'Daily budget (from $5/day)' },
      { name: 'Indeed Resume', price: 'Subscription based' },
      { name: 'Indeed Hiring Platform', price: 'Custom Quote' }
    ],
    faqContent: [
      { q: 'Are organic posts really free?', a: 'Most jobs can be posted for free, but sponsoring them ensures they stay visible much longer.' },
      { q: 'When do the credits expire?', a: 'Promotional credits typically expire within 30-90 days of account activation.' }
    ]
  },
  {
    id: 'willo',
    name: 'Willo',
    category: 'operations',
    categoryName: 'Operations',
    logo: 'WI',
    logoStyle: { background: '#5522ff', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'NEW',
    tagClass: 'nw',
    bgClass: 'bg-b',
    description: 'Screen candidates faster with Willo\'s video interview platform.',
    offer: '50% off',
    offerDetail: '1 month free + 50% off for 6 months (Any plan)',
    subText: 'for 6 months',
    savings: 'Save 50% for 6 mo',
    rating: '4.9/5',
    users: '1k+ reviews',
    dealsContent: {
      title: 'Screen candidates faster with Willo\'s video interview platform:',
      items: [
        'Structured asynchronous video interviews',
        'Reduce first-round screening time by up to 80%',
        'Seamless collaboration for hiring managers and teams',
        'Mobile-friendly candidate experience across 130+ countries'
      ],
      description: 'Willo is the world’s leading video interviewing platform for high-growth businesses. It helps you find, screen, and hire the best talent faster than ever before.'
    },
    pricingContent: [
      { name: 'Starter Plan', price: 'From $45 /month' },
      { name: 'Professional Plan', price: '$200 /month' },
      { name: 'Business Plan', price: '$500 /month' },
      { name: 'Enterprise', price: 'Custom Quote' }
    ],
    faqContent: [
      { q: 'Is there a limit on interviews?', a: 'Paid plans typically include generous limits on the number of active interviews and candidate responses.' },
      { q: 'Can I use my own branding?', a: 'Yes, Professional and Business plans include full branding controls for a white-labeled experience.' }
    ]
  },
  {
    id: 'remote',
    name: 'Remote',
    category: 'hr',
    categoryName: 'Human Resources',
    logo: 'RMT',
    logoStyle: { background: '#ff4b2b', color: 'var(--w)', fontSize: '16px', fontWeight: '900' },
    tag: 'PREMIUM',
    tagClass: 'pm',
    bgClass: 'bg-a',
    description: 'Hire, pay, and manage your global team with Remote.',
    offer: '15% off',
    offerDetail: '15% discount on EOR & Contractor Management',
    subText: 'for 1 Year',
    savings: 'Save 15% for 1 Year',
    rating: '4.8/5',
    users: 'Global Leaders',
    dealsContent: {
      title: 'Hire, pay, and manage your global team with Remote:',
      items: [
        'Employer of Record (EOR) services in 150+ countries',
        'Seamless contractor management and payments',
        'Localized payroll, benefits, and tax compliance',
        'IP protection and secure legal frameworks'
      ],
      description: 'Remote makes it easy to hire anyone, anywhere. We handle localized payroll, benefits, taxes, and compliance so you can focus on building your business.'
    },
    pricingContent: [
      { name: 'Contractor Management', price: '$29 /month per contractor' },
      { name: 'Employer of Record', price: 'From $599 /month per employee' },
      { name: 'Global Payroll', price: 'Custom Quote' },
      { name: 'Remote HRIS', price: 'Free (for local teams)' }
    ],
    faqContent: [
      { q: 'What countries are covered?', a: 'Remote owns entities in 150+ countries, ensuring full compliance and no third-party markups.' },
      { q: 'Is there a setup fee?', a: 'No, there are no setup fees for Contractor Management or EOR services.' }
    ]
  }
];
