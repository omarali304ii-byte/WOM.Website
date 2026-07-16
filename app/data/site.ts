export const companyName = "Word of Mouth";
export const companyDescriptor = "Digital Marketing Solution";
export const websiteUrl = "https://wordofmoutheg.com";

export const emailAddress = "info@wordofmoutheg.com";
export const phoneNumber = "+20 155 334 2722";
export const phoneHref = "tel:+201553342722";
export const whatsappHref = "https://wa.me/201553342722";
export const addressLine = "10 Ibn Bassam, Al Matar, El Nozha, Cairo Governorate, Egypt";
export const mapsHref = "https://maps.app.goo.gl/xKZ9wtDdmKWo4HbU8";

export const emailHref =
  "mailto:info@wordofmoutheg.com?subject=New%20project%20enquiry&body=Hello%20Word%20of%20Mouth%2C%0A%0AHere%20is%20a%20little%20about%20the%20project%3A%0A%0A";

export const navigation = [
  { href: "/#top", label: "Home", id: "top" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#process", label: "Process", id: "process" },
  { href: "/#insights", label: "Insights", id: "insights" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;

export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/wordofmouth.dm" },
  { name: "Instagram", href: "https://www.instagram.com/wordofmouth.dm" },
  { name: "YouTube", href: "https://www.youtube.com/@wordofmouth-g6w" },
  { name: "TikTok", href: "https://www.tiktok.com/@word.of.mouth1" },
] as const;

export const partnerBadges = ["Google Premier Partner", "Meta Marketing Partner"] as const;

export const heroPhrases = [
  "Strategy that gives brands direction",
  "Creativity that captures attention",
  "Marketing focused on real growth",
  "Digital experiences built to perform",
] as const;

export const services = [
  {
    index: "01",
    title: "Animated Video Production",
    tagline: "Turn complex ideas into motion people understand.",
    copy: "We create animated videos that simplify messages, capture attention, and communicate ideas clearly. From explainers and branded animations to social-first content, every video is designed to keep viewers engaged and move them toward action.",
    signal: "Puts the signal in motion",
    icon: "sparkles",
  },
  {
    index: "02",
    title: "Social Media Management",
    tagline: "A stronger presence without the daily pressure.",
    copy: "We manage the full social media process, including strategy, content planning, publishing, moderation, reporting, and continuous optimization. Our goal is not simply to post regularly. We build trust, grow communities, strengthen brand consistency, and turn attention into meaningful business opportunities.",
    signal: "Keeps the signal talking",
    icon: "message-circle",
  },
  {
    index: "03",
    title: "Website Design and Hosting",
    tagline: "Websites built to perform—not just look good.",
    copy: "We design and develop fast, secure, responsive, and conversion-focused websites that reflect the brand and support its business goals. From structure and user experience to development, hosting, and ongoing support, we create digital platforms that can grow with the business.",
    signal: "Gives the signal a home",
    icon: "monitor",
  },
  {
    index: "04",
    title: "Brand Identity",
    tagline: "Give your business a clear and recognizable identity.",
    copy: "We create visual identities that communicate the right personality across every customer touchpoint. Our work may include logos, color systems, typography, visual direction, brand guidelines, and the supporting assets required to maintain a consistent brand presence.",
    signal: "Gives the signal a face",
    icon: "fingerprint",
  },
  {
    index: "05",
    title: "Content Writing and SEO",
    tagline: "Content that connects with people and performs in search.",
    copy: "We create clear, strategic, search-optimized content that communicates the brand’s value and helps potential customers find it. Our content approach balances audience needs, search intent, brand authority, readability, and conversion.",
    signal: "Makes the signal findable",
    icon: "search",
  },
  {
    index: "06",
    title: "Product Photography",
    tagline: "Present every product at its best.",
    copy: "We produce high-quality, detail-focused product photography for websites, e-commerce platforms, advertising campaigns, catalogs, and social media. Each image is created to improve presentation, strengthen perceived value, and help customers make purchasing decisions.",
    signal: "Frames the signal",
    icon: "camera",
  },
  {
    index: "07",
    title: "Video Production",
    tagline: "Create stories that audiences can see, feel, and remember.",
    copy: "We manage video production from the initial concept and script to filming, editing, sound, color, and final delivery. Whether the goal is a commercial, social media campaign, brand film, product video, or corporate production, every piece is developed around a clear communication objective.",
    signal: "Films the signal",
    icon: "video",
  },
  {
    index: "08",
    title: "Google Ads",
    tagline: "Every click measured. Every campaign optimized.",
    copy: "We plan, build, manage, and optimize performance-focused Google Ads campaigns. Campaign decisions are guided by lead quality, conversion data, cost efficiency, return on investment, and the potential for sustainable growth—not vanity traffic.",
    signal: "Amplifies the signal",
    icon: "mouse-pointer-click",
  },
  {
    index: "09",
    title: "CRM Systems",
    tagline: "Organize your leads and create a smarter sales process.",
    copy: "We implement and customize CRM systems that help businesses track leads, organize customer information, automate repetitive workflows, and gain better visibility over their sales pipelines. The result is a more structured operation and fewer opportunities lost between marketing and sales.",
    signal: "Tracks where the signal lands",
    icon: "workflow",
  },
] as const;

// The agency manifesto (kept verbatim from the owner's approved copy).
export const manifesto = {
  heading: "A digital experience agency built to",
  headingEm: "inspire, engage, and grow brands.",
  lede: "We do more than create attractive designs or publish content.",
  body: [
    "We study the business, understand the audience, and build connected digital experiences that support real commercial goals. Every strategy, visual, campaign, and platform is created to help the brand communicate better and grow with confidence.",
    "By combining strategic thinking, creativity, technology, and industry experience, we transform business challenges into clear and effective digital solutions.",
  ],
  principles: [
    "Your goals shape the strategy.",
    "Your audience shapes the message.",
    "Your results shape what comes next.",
  ],
} as const;

// Character scene content, authored by the owner in the brand mockup.
export const characterTraits = [
  { word: "Bold", note: "We don’t follow trends. We set the tone." },
  { word: "Loud", note: "We speak up. We get attention." },
  { word: "Focused", note: "Clear vision. Smarter decisions." },
  { word: "Fearless", note: "We challenge the norm to create real impact." },
] as const;

export const characterValues = [
  { name: "Creative Intelligence", copy: "Ideas with meaning. Creativity with purpose.", icon: "lightbulb" },
  { name: "Strategic Focus", copy: "Every idea is backed by strategy and insight.", icon: "crosshair" },
  { name: "Attention Driven", copy: "We cut through noise and make brands unmissable.", icon: "megaphone" },
  { name: "Results Obsessed", copy: "We measure what matters and deliver what counts.", icon: "trending-up" },
  { name: "Human Connection", copy: "Behind every brand, real people. Real impact.", icon: "heart" },
] as const;

export const cultureNotes = [
  "Always curious",
  "Always learning",
  "Always creating",
  "Always you",
] as const;

export const quoteServiceOptions = [
  ...services.map((service) => service.title),
  "Multiple Services",
  "Not Sure Yet",
] as const;

export const budgetOptions = [
  "Under EGP 25,000",
  "EGP 25,000–50,000",
  "EGP 50,000–100,000",
  "EGP 100,000–250,000",
  "EGP 250,000+",
  "Let’s discuss",
] as const;

export const contactMethodOptions = ["Phone", "Email", "WhatsApp"] as const;

export const clients = [
  { name: "EgyptAir", file: "/clients/egyptair.png" },
  { name: "Mercedes-Benz", file: "/clients/mercedes-benz.png" },
  { name: "noon", file: "/clients/noon.png" },
  { name: "TMG", file: "/clients/tmg.png" },
  { name: "Zaneta", file: "/clients/zaneta.png" },
  { name: "Royal Lab", file: "/clients/royallab.png" },
  { name: "Marka", file: "/clients/marka.png" },
  { name: "Healthy", file: "/clients/healthy.png" },
  { name: "Sea Star", file: "/clients/sea-star.png" },
] as const;

// Figures published by Word of Mouth. Keep this as the single editable source.
export const stats = [
  { value: 840, suffix: "+", label: "Ongoing Projects" },
  { value: 2900, suffix: "+", label: "Happy Clients" },
  { value: 11, suffix: "+", label: "Years of Experience" },
  { value: 3700, suffix: "+", label: "Completed Projects" },
] as const;

export const projects = [
  {
    slug: "ezeefresh-branding",
    name: "Ezeefresh",
    discipline: "Branding",
    summary: "A fresh visual identity designed to create a clear, recognizable, and flexible brand presence.",
    image: "/projects/ezeefresh-branding.webp",
    width: 548,
    height: 546,
    industry: "",
    overview: "A fresh visual identity designed to create a clear, recognizable, and flexible brand presence.",
    challenge: "",
    approach: "",
    creativeDirection: "A clear and flexible visual identity system.",
    servicesDelivered: ["Brand Identity"],
    solution: "A refreshed branding system designed for consistent use across customer touchpoints.",
  },
  {
    slug: "kasbra-website",
    name: "KASBRA",
    discipline: "Website",
    summary: "A modern digital platform designed to present the business clearly and create a smoother online experience.",
    image: "/projects/kasbra-website.webp",
    width: 492,
    height: 430,
    industry: "",
    overview: "A modern digital platform designed to present the business clearly and create a smoother online experience.",
    challenge: "",
    approach: "",
    creativeDirection: "A clear, modern, and easy-to-navigate digital experience.",
    servicesDelivered: ["Website Design and Hosting"],
    solution: "A responsive website structured to communicate the business more clearly.",
  },
  {
    slug: "royal-lab-social-media",
    name: "Royal Lab",
    discipline: "Social Media",
    summary: "A social media direction designed to communicate medical information clearly while maintaining a consistent and trustworthy presence.",
    image: "/projects/royallab-social.webp",
    width: 585,
    height: 480,
    industry: "Healthcare",
    overview: "A social media direction designed to communicate medical information clearly while maintaining a consistent and trustworthy presence.",
    challenge: "",
    approach: "",
    creativeDirection: "A consistent visual language for clear, trustworthy communication.",
    servicesDelivered: ["Social Media Management"],
    solution: "A repeatable social content direction built around clarity and trust.",
  },
  {
    slug: "zaneta-media-production",
    name: "Zaneta",
    discipline: "Media Production",
    summary: "Premium media production created to present the fragrance brand through atmosphere, detail, and visual storytelling.",
    image: "/projects/zaneta-media.webp",
    width: 545,
    height: 485,
    industry: "Fragrance",
    overview: "Premium media production created to present the fragrance brand through atmosphere, detail, and visual storytelling.",
    challenge: "",
    approach: "",
    creativeDirection: "Atmospheric product storytelling focused on material, light, and detail.",
    servicesDelivered: ["Video Production", "Product Photography"],
    solution: "A premium visual production system for presenting the fragrance brand.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    name: "Share Your Vision",
    copy: "Every great project begins with understanding your story. We listen to your goals, challenges, audience, current position, and expectations. This gives us the context required to create the right direction rather than relying on assumptions.",
  },
  {
    number: "02",
    name: "Strategy and Planning",
    copy: "We transform what we learn into a practical project plan. The plan defines the priorities, deliverables, creative direction, timeline, budget, responsibilities, and success criteria so that everyone moves forward with clarity.",
  },
  {
    number: "03",
    name: "From Idea to Reality",
    copy: "Our team turns the strategy into real work. Depending on the project, this may include research, branding, content, design, production, development, campaign setup, testing, and final delivery.",
  },
  {
    number: "04",
    name: "Results and Growth",
    copy: "Delivery is not the end of the relationship. We review performance, learn from real data, identify opportunities, and continue improving the work to support stronger long-term results.",
  },
] as const;

export const insights = [
  {
    index: "01",
    title: "Best Marketing Company in 2026: How to Choose the Right Partner",
    excerpt: "Learn what to evaluate before hiring a marketing agency, including strategic thinking, communication, relevant experience, transparency, execution quality, and the ability to connect marketing activity with business goals.",
    image: "/editorial/insight-marketing-partner.webp",
    href: "https://wordofmoutheg.com/best_marketing_company_in_2025/",
  },
  {
    index: "02",
    title: "Facebook and Google Ads for Business: How to Get Better Results in 2026",
    excerpt: "Understand the different roles of Facebook Ads and Google Ads, when to use each platform, and how businesses can improve targeting, creative quality, conversion tracking, and campaign performance.",
    image: "/editorial/insight-ads-conversion.webp",
    href: "https://wordofmoutheg.com/what-do-you-need/",
  },
  {
    index: "03",
    title: "How a Marketing Agency Uses Data to Grow Your Business in 2026",
    excerpt: "Discover how customer behavior, campaign performance, lead quality, sales information, and market insights can guide better marketing decisions and reveal new growth opportunities.",
    image: "/editorial/insight-data-growth.webp",
    href: "https://wordofmoutheg.com/how-a-marketing-agency-uses-data-to-grow-your-business-in-2025/",
  },
] as const;

export const insightsIndexHref = "https://wordofmoutheg.com/blog/";

// ISO codes render as designed "postal stamp" marks — emoji flags fall back
// to bare letter pairs on Windows and clash with the editorial system.
export const regions = [
  { name: "Egypt", code: "EG" },
  { name: "Iraq", code: "IQ" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Kuwait", code: "KW" },
  { name: "United Arab Emirates", code: "AE" },
] as const;

// Generic market chatter used only by the Scene 02 visual effect.
export const noiseFragments = [
  "50% OFF EVERYTHING",
  "New drop →",
  "Follow for more",
  "We’re different",
  "Link in bio",
  "BIG announcement",
  "Limited time only",
  "#trending",
  "Buy now",
  "Just launched ✦",
  "Don’t miss out",
  "Sale ends tonight",
  "Look here",
  "Subscribe",
  "As seen everywhere",
  "Best in class",
  "Game-changing",
  "Sound on",
] as const;
