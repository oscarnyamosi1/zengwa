// ============================================================
// ZENGWA MISSION CONNECT — CENTRALIZED DUMMY DATA
// All mock/static data for frontend pages lives here.
// ============================================================

// ─── TYPES ───────────────────────────────────────────────────

export interface Campaign {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  badge: string;
  badgeColor: string;
  currency: string;
  description: string;
  updates: number;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  image: string;
  alt: string;
  story: string;
  sponsored: boolean;
  monthlyAmount: number;
  currency: string;
  interests: string[];
  location: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  progress: number;
  budget: number;
  spent: number;
  currency: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  beneficiaries: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  alt: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  alt: string;
  attendees: number;
  capacity: number;
  free: boolean;
  price?: number;
  currency?: string;
}

export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  alt: string;
  image: string;
  album: string;
  date: string;
  likes: number;
}

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  hours: number;
  skills: string[];
  location: string;
  joined: string;
  testimonial: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  quote: string;
  country: string;
  flag: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  alt: string;
  type: string;
}

export interface DonationRecord {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  campaign: string;
  method: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  anonymous: boolean;
}

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
  prayers: number;
  answered: boolean;
}

export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  commitment: string;
  skills: string[];
  openings: number;
  location: string;
  category: string;
}

export interface DashboardUser {
  id: string;
  name: string;
  initials: string;
  role: 'Super Admin' | 'Finance' | 'Project Manager' | 'Volunteer Coordinator' | 'Donor' | 'Sponsor';
  email: string;
  avatar?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
}

// ─── CAMPAIGNS ────────────────────────────────────────────────

export const companyCommunicationChannel = {
  email:"info@zengwaconnect.org",
  phone:"+254 700 123 456",
  facebook:"facebooklink",
  x:"x.com",
  location:"Zengwa Village, Marsabit County, Northern Kenya",
  instagram:"instagram.com",
  youtube:"youtubre.com",
  tiktok:"tiktok.com",
}

export const campaigns: Campaign[] = [
{
  id: 'camp-001',
  title: 'Zengwa Primary School Block B',
  category: 'Education',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea8fffc7-1784313313635.png",
  alt: 'Construction workers building a new school classroom block with concrete walls and iron roof in rural Kenya',
  raised: 1240000,
  goal: 1800000,
  donors: 248,
  daysLeft: 42,
  badge: 'Urgent',
  badgeColor: 'bg-danger text-white',
  currency: 'KES',
  description: 'We are building a second classroom block to accommodate 200 additional students who currently study under trees. The new block will have 4 classrooms, a library, and sanitation facilities.',
  updates: 8
},
{
  id: 'camp-002',
  title: 'Clean Water Borehole — Zengwa Village',
  category: 'Water & Health',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1839c4d53-1772094706028.png",
  alt: 'African woman drawing clean water from a newly installed borehole pump surrounded by community members',
  raised: 680000,
  goal: 900000,
  donors: 156,
  daysLeft: 18,
  badge: 'Featured',
  badgeColor: 'bg-primary text-white',
  currency: 'KES',
  description: 'Providing clean, safe drinking water to over 1,500 community members who currently walk 8km daily to fetch water from a contaminated river.',
  updates: 5
},
{
  id: 'camp-003',
  title: 'Child Sponsorship — 50 Students',
  category: 'Sponsorship',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_127400d6a-1763296439452.png",
  alt: 'Group of smiling Kenyan school children in green uniforms standing outside a classroom holding books',
  raised: 325000,
  goal: 500000,
  donors: 89,
  daysLeft: 60,
  badge: 'Active',
  badgeColor: 'bg-accent/20 text-primary',
  currency: 'KES',
  description: 'Sponsor a child\'s education for a full year — covering school fees, uniforms, books, meals, and healthcare. Change a life forever.',
  updates: 12
},
{
  id: 'camp-004',
  title: 'Community Health Outreach 2026',
  category: 'Health',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12bc7169c-1773142299522.png",
  alt: 'Medical volunteer in white coat examining a young child at a rural health outreach clinic in Africa',
  raised: 145000,
  goal: 400000,
  donors: 64,
  daysLeft: 90,
  badge: 'New',
  badgeColor: 'bg-gold/20 text-warning',
  currency: 'KES',
  description: 'Mobile health clinics bringing medical care, vaccinations, and health education to 5 remote villages in Marsabit County.',
  updates: 3
},
{
  id: 'camp-005',
  title: 'Church Planting — Marsabit North',
  category: 'Church',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe854a69-1765652592467.png",
  alt: 'Small congregation gathered under a thatched roof church structure in a remote African village during Sunday service',
  raised: 92000,
  goal: 250000,
  donors: 41,
  daysLeft: 120,
  badge: 'Active',
  badgeColor: 'bg-accent/20 text-primary',
  currency: 'KES',
  description: 'Planting 3 new churches in unreached communities in Northern Kenya, each with a trained pastor and discipleship program.',
  updates: 4
},
{
  id: 'camp-006',
  title: 'Girls\' Dormitory Construction',
  category: 'Education',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_135eef728-1764694159531.png",
  alt: 'Young African girls studying together in a bright classroom with colorful educational posters on the walls',
  raised: 560000,
  goal: 1200000,
  donors: 112,
  daysLeft: 75,
  badge: 'Active',
  badgeColor: 'bg-accent/20 text-primary',
  currency: 'KES',
  description: 'Building a safe dormitory for 80 girls from remote villages, enabling them to attend school without the daily 20km walk.',
  updates: 6
}];


// ─── CHILDREN (SPONSORSHIP) ───────────────────────────────────

export const children: Child[] = [
{
  id: 'child-001',
  name: 'Amina Wanjiku',
  age: 9,
  grade: 'Grade 3',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13b578e81-1772639951391.png",
  alt: 'Young Kenyan girl in school uniform smiling brightly while holding a pencil and notebook',
  story: 'Amina loves mathematics and dreams of becoming a doctor. She lives with her grandmother after losing her parents. Your sponsorship covers her school fees, meals, and healthcare.',
  sponsored: false,
  monthlyAmount: 3500,
  currency: 'KES',
  interests: ['Mathematics', 'Drawing', 'Singing'],
  location: 'Zengwa Village'
},
{
  id: 'child-002',
  name: 'David Kipchoge',
  age: 11,
  grade: 'Grade 5',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e51961d-1767969209983.png",
  alt: 'Smiling African boy in school uniform holding a book outside a rural school building',
  story: 'David is the top student in his class and wants to be an engineer. He helps his widowed mother fetch water every morning before school. Sponsorship will change his trajectory.',
  sponsored: true,
  monthlyAmount: 3500,
  currency: 'KES',
  interests: ['Science', 'Football', 'Reading'],
  location: 'Marsabit Town'
},
{
  id: 'child-003',
  name: 'Grace Achieng',
  age: 8,
  grade: 'Grade 2',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ceadbcc-1772182453068.png",
  alt: 'Young African girl with braided hair smiling while sitting at a school desk with crayons',
  story: 'Grace is the youngest of 6 siblings. She walks 5km to school every day and never misses a class. She loves art and wants to be a teacher one day.',
  sponsored: false,
  monthlyAmount: 3500,
  currency: 'KES',
  interests: ['Art', 'Dancing', 'Storytelling'],
  location: 'Laisamis'
},
{
  id: 'child-004',
  name: 'Samuel Mutua',
  age: 13,
  grade: 'Grade 7',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13cf08e10-1772758022379.png",
  alt: 'Teenage African boy in school uniform standing proudly in front of a chalkboard',
  story: 'Samuel scored the highest in his district exams but nearly dropped out due to lack of fees. He wants to study computer science and bring technology to his village.',
  sponsored: false,
  monthlyAmount: 4500,
  currency: 'KES',
  interests: ['Computers', 'Chess', 'Writing'],
  location: 'Zengwa Village'
},
{
  id: 'child-005',
  name: 'Faith Chebet',
  age: 10,
  grade: 'Grade 4',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16ceadbcc-1772182453068.png",
  alt: 'African girl with bright smile wearing school uniform and carrying a backpack',
  story: 'Faith is an orphan raised by her aunt. Despite hardship, she maintains excellent grades and leads the school choir. She dreams of becoming a nurse.',
  sponsored: true,
  monthlyAmount: 3500,
  currency: 'KES',
  interests: ['Music', 'Nursing', 'Cooking'],
  location: 'Karare'
},
{
  id: 'child-006',
  name: 'John Lokiru',
  age: 12,
  grade: 'Grade 6',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3ba91ec-1772095671131.png",
  alt: 'Young African boy in school uniform reading a book under a tree',
  story: 'John comes from a pastoralist family and is the first in his family to attend school. He is passionate about agriculture and wants to modernize farming in his community.',
  sponsored: false,
  monthlyAmount: 4000,
  currency: 'KES',
  interests: ['Agriculture', 'Animals', 'Running'],
  location: 'North Horr'
}];


// ─── PROJECTS ─────────────────────────────────────────────────

export const projects: Project[] = [
{
  id: 'proj-001',
  title: 'Zengwa Primary School Block B',
  category: 'Education',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fa810fe8-1784313443629.png',
  alt: 'Construction workers building a new school classroom block with concrete walls and iron roof in rural Kenya',
  status: 'In Progress',
  progress: 69,
  budget: 1800000,
  spent: 1240000,
  currency: 'KES',
  description: 'Construction of a 4-classroom block with library and sanitation facilities to accommodate 200 additional students.',
  startDate: 'Jan 2026',
  endDate: 'Sep 2026',
  location: 'Zengwa Village, Marsabit',
  beneficiaries: 200
},
{
  id: 'proj-002',
  title: 'Clean Water Borehole Project',
  category: 'Water & Health',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1839c4d53-1772094706028.png",
  alt: 'African woman drawing clean water from a newly installed borehole pump surrounded by community members',
  status: 'In Progress',
  progress: 76,
  budget: 900000,
  spent: 680000,
  currency: 'KES',
  description: 'Drilling and equipping a solar-powered borehole to provide clean water to 1,500+ community members.',
  startDate: 'Mar 2026',
  endDate: 'Aug 2026',
  location: 'Zengwa Village',
  beneficiaries: 1500
},
{
  id: 'proj-003',
  title: 'Community Health Clinic',
  category: 'Health',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16c04b52a-1773138407454.png",
  alt: 'Medical volunteer in white coat examining a young child at a rural health outreach clinic in Africa',
  status: 'Planned',
  progress: 15,
  budget: 2500000,
  spent: 375000,
  currency: 'KES',
  description: 'Building a permanent community health clinic staffed by 2 nurses and a visiting doctor, serving 5 villages.',
  startDate: 'Oct 2026',
  endDate: 'Jun 2027',
  location: 'Zengwa Village',
  beneficiaries: 3000
},
{
  id: 'proj-004',
  title: 'Church Planting — Marsabit North',
  category: 'Church Planting',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_193fd4305-1784839059916.png",
  alt: 'Small congregation gathered under a thatched roof church structure in a remote African village during Sunday service',
  status: 'In Progress',
  progress: 37,
  budget: 250000,
  spent: 92000,
  currency: 'KES',
  description: 'Planting 3 new churches in unreached communities with trained pastors and discipleship programs.',
  startDate: 'Feb 2026',
  endDate: 'Dec 2026',
  location: 'Marsabit North',
  beneficiaries: 450
},
{
  id: 'proj-005',
  title: 'Girls\' Dormitory Construction',
  category: 'Education',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_135eef728-1764694159531.png",
  alt: 'Young African girls studying together in a bright classroom with colorful educational posters on the walls',
  status: 'In Progress',
  progress: 47,
  budget: 1200000,
  spent: 560000,
  currency: 'KES',
  description: 'Safe dormitory for 80 girls from remote villages, eliminating the dangerous daily 20km walk to school.',
  startDate: 'Apr 2026',
  endDate: 'Nov 2026',
  location: 'Zengwa Village',
  beneficiaries: 80
},
{
  id: 'proj-006',
  title: 'Solar Power for School',
  category: 'Infrastructure',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1632111f0-1784372318851.png",
  alt: 'Solar panels installed on the roof of a rural school building in Africa with blue sky background',
  status: 'Completed',
  progress: 100,
  budget: 450000,
  spent: 432000,
  currency: 'KES',
  description: 'Installed 20 solar panels providing reliable electricity to all classrooms, enabling evening study sessions.',
  startDate: 'Nov 2025',
  endDate: 'Jan 2026',
  location: 'Zengwa Village',
  beneficiaries: 350
}];


// ─── BLOG POSTS ───────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
{
  id: 'blog-001',
  title: 'How Clean Water Changed Everything for Zengwa Village',
  excerpt: 'When the borehole was finally drilled, the entire community gathered to witness the first clean water flow. Tears of joy mixed with prayers of thanksgiving.',
  content: 'Full article content here...',
  category: 'Water Projects',
  author: 'Pastor James Mwangi',
  authorRole: 'Founder & Director',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1839c4d53-1772094706028.png",
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1444ad8a7-1772110832391.png',
  alt: 'Community members celebrating around a new water borehole in rural Kenya',
  date: 'July 15, 2026',
  readTime: 5,
  tags: ['Water', 'Community', 'Impact'],
  featured: true
},
{
  id: 'blog-002',
  title: 'Amina\'s Story: From Dropout to Top Student',
  excerpt: 'Amina was about to leave school when a sponsor stepped in. Today, she leads her class in mathematics and dreams of becoming a doctor.',
  content: 'Full article content here...',
  category: 'Child Sponsorship',
  author: 'Sarah Kimani',
  authorRole: 'Sponsorship Coordinator',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13b578e81-1772639951391.png",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13b578e81-1772639951391.png",
  alt: 'Young Kenyan girl in school uniform smiling brightly while holding a pencil and notebook',
  date: 'July 8, 2026',
  readTime: 4,
  tags: ['Sponsorship', 'Education', 'Success Story'],
  featured: true
},
{
  id: 'blog-003',
  title: '2026 Mid-Year Ministry Report: God\'s Faithfulness',
  excerpt: 'We are humbled to share how your generosity has impacted over 3,000 lives in the first half of 2026. Here is a detailed account of every project.',
  content: 'Full article content here...',
  category: 'Ministry Updates',
  author: 'Pastor James Mwangi',
  authorRole: 'Founder & Director',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_125dfa351-1772094883303.png",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_125dfa351-1772094883303.png",
  alt: 'Group of community members gathered for a ministry meeting in a church hall',
  date: 'July 1, 2026',
  readTime: 8,
  tags: ['Report', 'Ministry', 'Impact'],
  featured: false
},
{
  id: 'blog-004',
  title: 'Volunteer Spotlight: Dr. Emily\'s Two Weeks in Marsabit',
  excerpt: 'Dr. Emily flew from London to spend two weeks running free medical clinics. She treated 480 patients and trained 12 community health workers.',
  content: 'Full article content here...',
  category: 'Volunteers',
  author: 'Grace Odhiambo',
  authorRole: 'Volunteer Coordinator',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12bc7169c-1773142299522.png",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d760f12f-1784638949747.png",
  alt: 'Female doctor in white coat examining a child at a rural health clinic in Kenya',
  date: 'June 22, 2026',
  readTime: 6,
  tags: ['Volunteers', 'Health', 'Community'],
  featured: false
},
{
  id: 'blog-005',
  title: 'New Church Planted in Kalacha — 47 Souls Saved',
  excerpt: 'After months of prayer and preparation, the Kalacha church was officially planted. The first Sunday service saw 47 people give their lives to Christ.',
  content: 'Full article content here...',
  category: 'Church Planting',
  author: 'Pastor James Mwangi',
  authorRole: 'Founder & Director',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe854a69-1765652592467.png",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_166369d07-1785486042175.png",
  alt: 'Congregation gathered for worship in a newly planted church in rural Kenya',
  date: 'June 10, 2026',
  readTime: 5,
  tags: ['Church', 'Evangelism', 'Salvation'],
  featured: false
},
{
  id: 'blog-006',
  title: 'Solar Panels Light Up Zengwa School — Students Study After Dark',
  excerpt: 'The new solar installation means students can now study in the evenings. Exam scores have already improved by 23% since installation.',
  content: 'Full article content here...',
  category: 'Infrastructure',
  author: 'David Njoroge',
  authorRole: 'Project Manager',
  authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1944b7219-1774958948573.png",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1944b7219-1774958948573.png",
  alt: 'Solar panels on school roof with students visible through classroom windows studying at night',
  date: 'May 28, 2026',
  readTime: 3,
  tags: ['Infrastructure', 'Education', 'Solar'],
  featured: false
}];


// ─── EVENTS ───────────────────────────────────────────────────

export const events: Event[] = [
{
  id: 'evt-001',
  title: 'Annual Fundraising Gala 2026',
  description: 'Join us for an evening of celebration, testimonies, and fundraising for our 2026 projects. Featuring live music, dinner, and inspiring stories from the field.',
  date: 'August 15, 2026',
  time: '6:00 PM — 10:00 PM',
  location: 'Nairobi Serena Hotel, Nairobi',
  type: 'Fundraiser',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_178e04177-1772254978127.png",
  alt: 'Elegant fundraising gala dinner with round tables, candles, and guests in formal attire',
  attendees: 180,
  capacity: 250,
  free: false,
  price: 5000,
  currency: 'KES'
},
{
  id: 'evt-002',
  title: 'Volunteer Orientation Day',
  description: 'New volunteer orientation covering our mission, values, safety protocols, and project assignments. All new volunteers must attend before deployment.',
  date: 'August 3, 2026',
  time: '9:00 AM — 1:00 PM',
  location: 'Zengwa Education Centre, Marsabit',
  type: 'Training',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1f9ebc4-1772211601313.png",
  alt: 'Group of volunteers in orange vests attending an orientation session in a community hall',
  attendees: 24,
  capacity: 40,
  free: true
},
{
  id: 'evt-003',
  title: 'Community Prayer & Fasting Day',
  description: 'A day of corporate prayer and fasting for our nation, our ministry, and the communities we serve. All are welcome to join in person or online.',
  date: 'August 8, 2026',
  time: '6:00 AM — 6:00 PM',
  location: 'Zengwa Church, Marsabit',
  type: 'Prayer',
  image: 'https://images.unsplash.com/photo-1575652341484-cf585e29d737',
  alt: 'Community members gathered in prayer inside a church with hands raised in worship',
  attendees: 120,
  capacity: 300,
  free: true
},
{
  id: 'evt-004',
  title: 'Back-to-School Drive 2026',
  description: 'Help us collect school supplies, uniforms, and books for 500 children returning to school in September. Drop-off points across Nairobi and Marsabit.',
  date: 'August 20–31, 2026',
  time: 'All Day',
  location: 'Multiple Locations',
  type: 'Community Drive',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17120bf64-1767940898922.png",
  alt: 'School supplies including books, pencils, and backpacks arranged on a table for donation',
  attendees: 89,
  capacity: 500,
  free: true
},
{
  id: 'evt-005',
  title: 'Medical Outreach — Laisamis',
  description: 'Free medical camp offering consultations, vaccinations, dental care, and health education to 800+ residents of Laisamis and surrounding villages.',
  date: 'September 5–7, 2026',
  time: '8:00 AM — 5:00 PM',
  location: 'Laisamis Community Centre',
  type: 'Health Outreach',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e2a766cc-1772878671814.png',
  alt: 'Medical team setting up a free health clinic with patients waiting in line outside',
  attendees: 0,
  capacity: 800,
  free: true
},
{
  id: 'evt-006',
  title: 'Donor Appreciation Breakfast',
  description: 'A special breakfast for our top donors to share project updates, impact reports, and future plans. An intimate gathering of 50 key supporters.',
  date: 'September 12, 2026',
  time: '8:00 AM — 11:00 AM',
  location: 'Villa Rosa Kempinski, Nairobi',
  type: 'Donor Relations',
  image: "https://images.unsplash.com/photo-1661335996024-1264a70d1347",
  alt: 'Elegant breakfast setting with white tablecloths and fresh flowers for a donor appreciation event',
  attendees: 35,
  capacity: 50,
  free: true
}];


// ─── GALLERY ──────────────────────────────────────────────────

export const galleryItems: GalleryItem[] = [
{
  id: 'gal-001',
  type: 'photo',
  title: 'School Construction Progress',
  alt: 'Construction workers laying foundation for new school classroom block in Zengwa Village',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fa810fe8-1784313443629.png',
  album: 'Construction',
  date: 'July 2026',
  likes: 142
},
{
  id: 'gal-002',
  type: 'photo',
  title: 'Borehole Inauguration Day',
  alt: 'Community members celebrating around a new water borehole with clean water flowing',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1444ad8a7-1772110832391.png',
  album: 'Water Projects',
  date: 'June 2026',
  likes: 289
},
{
  id: 'gal-003',
  type: 'photo',
  title: 'Children in Class',
  alt: 'Kenyan school children sitting at desks in a bright classroom with teacher at the chalkboard',
  image: 'https://images.unsplash.com/photo-1567057420215-0afa9aa9253a',
  album: 'Education',
  date: 'July 2026',
  likes: 198
},
{
  id: 'gal-004',
  type: 'photo',
  title: 'Medical Outreach Camp',
  alt: 'Volunteer doctors and nurses treating patients at a free medical camp in rural Kenya',
  image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e2a766cc-1772878671814.png',
  album: 'Health',
  date: 'May 2026',
  likes: 167
},
{
  id: 'gal-005',
  type: 'photo',
  title: 'Sunday Worship Service',
  alt: 'Congregation worshipping together in a newly built church in Marsabit County',
  image: 'https://images.unsplash.com/photo-1575652341484-cf585e29d737',
  album: 'Church',
  date: 'June 2026',
  likes: 234
},
{
  id: 'gal-006',
  type: 'photo',
  title: 'Girls\' Dormitory Foundation',
  alt: 'Construction workers laying the foundation for a new girls dormitory at Zengwa school',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4c4b012-1785486042124.png",
  album: 'Construction',
  date: 'May 2026',
  likes: 112
},
{
  id: 'gal-007',
  type: 'photo',
  title: 'Solar Panel Installation',
  alt: 'Technicians installing solar panels on the roof of Zengwa Primary School',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_110d6a8fa-1785486042237.png",
  album: 'Infrastructure',
  date: 'January 2026',
  likes: 88
},
{
  id: 'gal-008',
  type: 'photo',
  title: 'Volunteer Team Photo',
  alt: 'Group of international and local volunteers posing together outside the Zengwa Education Centre',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af9a07b6-1785486041801.png",
  album: 'Volunteers',
  date: 'April 2026',
  likes: 321
},
{
  id: 'gal-009',
  type: 'photo',
  title: 'Sponsored Children Graduation',
  alt: 'Sponsored children in graduation gowns celebrating their primary school completion',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc00cea5-1774952578351.png",
  album: 'Education',
  date: 'November 2025',
  likes: 445
}];


// ─── VOLUNTEERS ───────────────────────────────────────────────

export const volunteers: Volunteer[] = [
{
  id: 'vol-001',
  name: 'Dr. Emily Hartmann',
  role: 'Medical Volunteer',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af2cb362-1772714043875.png",
  alt: 'Female doctor smiling in white coat',
  hours: 320,
  skills: ['Medicine', 'Surgery', 'Training'],
  location: 'London, UK',
  joined: 'March 2025',
  testimonial: 'Serving in Zengwa was the most meaningful two weeks of my career. The community\'s resilience and faith is humbling.'
},
{
  id: 'vol-002',
  name: 'Michael Osei',
  role: 'Construction Supervisor',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0ab3cda-1773104226604.png",
  alt: 'African man in construction helmet smiling on a building site',
  hours: 480,
  skills: ['Construction', 'Project Management', 'Training'],
  location: 'Accra, Ghana',
  joined: 'January 2026',
  testimonial: 'Building schools that will educate generations — there is no greater legacy I can leave.'
},
{
  id: 'vol-003',
  name: 'Sarah Kimani',
  role: 'Education Volunteer',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_131cb46a2-1785090031598.png",
  alt: 'Kenyan woman teacher smiling in a classroom',
  hours: 240,
  skills: ['Teaching', 'Curriculum', 'Mentoring'],
  location: 'Nairobi, Kenya',
  joined: 'September 2025',
  testimonial: 'Every child I teach is a seed planted for Kenya\'s future. This ministry is doing God\'s work.'
}];


export const volunteerRoles: VolunteerRole[] = [
{
  id: 'vr-001',
  title: 'Medical Volunteer',
  description: 'Join our medical outreach teams providing free healthcare to remote communities. We need doctors, nurses, pharmacists, and health educators.',
  commitment: '2–4 weeks on-site',
  skills: ['Medical degree or nursing', 'First aid certification', 'Cross-cultural communication'],
  openings: 8,
  location: 'Marsabit County, Kenya',
  category: 'Health'
},
{
  id: 'vr-002',
  title: 'Construction Volunteer',
  description: 'Help build classrooms, dormitories, and community facilities. No professional experience required — just willing hands and a servant heart.',
  commitment: '1–3 months',
  skills: ['Physical fitness', 'Basic construction (preferred)', 'Teamwork'],
  openings: 15,
  location: 'Zengwa Village, Marsabit',
  category: 'Construction'
},
{
  id: 'vr-003',
  title: 'Education Volunteer',
  description: 'Teach English, mathematics, science, or vocational skills. Help train local teachers and develop curriculum materials.',
  commitment: '3–12 months',
  skills: ['Teaching qualification (preferred)', 'Patience', 'Creativity'],
  openings: 6,
  location: 'Zengwa Village, Marsabit',
  category: 'Education'
},
{
  id: 'vr-004',
  title: 'Digital & Communications',
  description: 'Help us tell our story to the world. Create content, manage social media, design graphics, and produce video updates from the field.',
  commitment: 'Remote or 1–4 weeks on-site',
  skills: ['Photography/videography', 'Social media', 'Graphic design'],
  openings: 4,
  location: 'Remote / Marsabit',
  category: 'Communications'
},
{
  id: 'vr-005',
  title: 'Child Sponsorship Coordinator',
  description: 'Manage relationships between sponsors and sponsored children. Write updates, coordinate letters, and ensure children receive their support.',
  commitment: 'Remote, 10 hrs/week',
  skills: ['Administration', 'Communication', 'Child safeguarding'],
  openings: 2,
  location: 'Remote',
  category: 'Administration'
},
{
  id: 'vr-006',
  title: 'Fundraising & Events',
  description: 'Plan and execute fundraising events, donor campaigns, and community drives. Help us raise the resources needed to expand our impact.',
  commitment: 'Remote or Nairobi-based',
  skills: ['Event planning', 'Fundraising', 'Networking'],
  openings: 3,
  location: 'Nairobi / Remote',
  category: 'Fundraising'
}];


// ─── TEAM MEMBERS ─────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
{
  id: 'team-001',
  name: 'Pastor James Mwangi',
  role: 'Founder & Executive Director',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19a711f4d-1772438320119.png",
  alt: 'African pastor in formal attire smiling confidently',
  bio: 'Pastor James founded Zengwa Christian Education Centre in 2009 after a vision to transform his home village through education and the Gospel. He holds a Masters in Theology from Nairobi Evangelical Graduate School.'
},
{
  id: 'team-002',
  name: 'Grace Odhiambo',
  role: 'Volunteer & Programs Coordinator',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ede44e00-1772198986914.png",
  alt: 'Kenyan woman in professional attire smiling warmly',
  bio: 'Grace has coordinated over 200 volunteers from 30 countries. She holds a degree in Community Development from University of Nairobi and is passionate about sustainable impact.'
},
{
  id: 'team-003',
  name: 'David Njoroge',
  role: 'Project Manager',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa72eee0-1772198988451.png",
  alt: 'Kenyan man in business casual attire at a construction site',
  bio: 'David oversees all construction and infrastructure projects. A civil engineer by training, he ensures every shilling is used efficiently and every building meets quality standards.'
},
{
  id: 'team-004',
  name: 'Sarah Kimani',
  role: 'Sponsorship Coordinator',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_131cb46a2-1785090031598.png",
  alt: 'Kenyan woman teacher smiling in a classroom setting',
  bio: 'Sarah manages relationships with 847 sponsored children and their sponsors worldwide. She ensures every child receives their support and every sponsor receives meaningful updates.'
}];


// ─── TESTIMONIALS ─────────────────────────────────────────────

export const testimonials: Testimonial[] = [
{
  id: 'test-001',
  name: 'Margaret Thompson',
  role: 'Child Sponsor — 3 years',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1440ac186-1772838729426.png",
  alt: 'Smiling middle-aged woman with glasses',
  quote: 'Sponsoring Amina has been one of the greatest joys of my life. The updates I receive show real transformation — not just in her education but in her entire family.',
  country: 'United Kingdom',
  flag: '🇬🇧'
},
{
  id: 'test-002',
  name: 'Robert & Linda Chen',
  role: 'Monthly Donors — 5 years',
  image: "https://images.unsplash.com/photo-1680977735364-cf4ad5eead54",
  alt: 'Couple smiling together outdoors',
  quote: 'We have visited Zengwa twice. The transparency, the genuine love for the community, and the tangible impact make this the most trustworthy ministry we support.',
  country: 'United States',
  flag: '🇺🇸'
},
{
  id: 'test-003',
  name: 'Pastor Erik Lindqvist',
  role: 'Partner Church — Sweden',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc8d62f9-1767576593040.png",
  alt: 'Swedish pastor in church setting',
  quote: 'Our congregation has partnered with Zengwa for 4 years. Every report we receive is detailed, honest, and filled with the evidence of God\'s work. We trust them completely.',
  country: 'Sweden',
  flag: '🇸🇪'
}];


// ─── RECENT DONATIONS ─────────────────────────────────────────

export const recentDonations: DonationRecord[] = [
{ id: 'don-001', donor: 'Margaret T.', amount: 15000, currency: 'KES', campaign: 'School Block B', method: 'M-Pesa', date: '2026-07-30', status: 'Completed', anonymous: false },
{ id: 'don-002', donor: 'Anonymous', amount: 50000, currency: 'KES', campaign: 'Clean Water', method: 'Stripe', date: '2026-07-30', status: 'Completed', anonymous: true },
{ id: 'don-003', donor: 'Robert Chen', amount: 25000, currency: 'KES', campaign: 'Child Sponsorship', method: 'PayPal', date: '2026-07-29', status: 'Completed', anonymous: false },
{ id: 'don-004', donor: 'Grace M.', amount: 5000, currency: 'KES', campaign: 'Church Planting', method: 'M-Pesa', date: '2026-07-29', status: 'Pending', anonymous: false },
{ id: 'don-005', donor: 'John K.', amount: 10000, currency: 'KES', campaign: 'Health Outreach', method: 'M-Pesa', date: '2026-07-28', status: 'Completed', anonymous: false },
{ id: 'don-006', donor: 'Anonymous', amount: 100000, currency: 'KES', campaign: 'School Block B', method: 'Stripe', date: '2026-07-28', status: 'Completed', anonymous: true },
{ id: 'don-007', donor: 'Pastor Erik L.', amount: 30000, currency: 'KES', campaign: 'Girls Dormitory', method: 'PayPal', date: '2026-07-27', status: 'Completed', anonymous: false },
{ id: 'don-008', donor: 'Mary W.', amount: 3500, currency: 'KES', campaign: 'Child Sponsorship', method: 'M-Pesa', date: '2026-07-27', status: 'Failed', anonymous: false }];


// ─── PRAYER REQUESTS ──────────────────────────────────────────

export const prayerRequests: PrayerRequest[] = [
{ id: 'pr-001', name: 'Pastor James', request: 'Pray for the completion of School Block B before the September term begins.', date: '2026-07-28', prayers: 142, answered: false },
{ id: 'pr-002', name: 'Anonymous', request: 'Pray for the 23 children awaiting sponsors — that God would move hearts to give.', date: '2026-07-25', prayers: 89, answered: false },
{ id: 'pr-003', name: 'Grace O.', request: 'Thanksgiving — the borehole is 76% funded! Pray for the final KES 220K.', date: '2026-07-20', prayers: 234, answered: false },
{ id: 'pr-004', name: 'Community', request: 'Pray for the new churches in Marsabit North — for growth, discipleship, and protection.', date: '2026-07-15', prayers: 178, answered: false },
{ id: 'pr-005', name: 'Sarah K.', request: 'Amina passed her exams with top marks! Praise God for His faithfulness.', date: '2026-07-10', prayers: 312, answered: true }];


// ─── PARTNERS ─────────────────────────────────────────────────

export const partners: Partner[] = [
{ id: 'par-001', name: 'World Vision Kenya', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18e9bd1c0-1785486040535.png", alt: 'World Vision Kenya partner organization logo', type: 'NGO Partner' },
{ id: 'par-002', name: 'Compassion International', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0fe676e-1785486041081.png", alt: 'Compassion International partner logo', type: 'Sponsorship Partner' },
{ id: 'par-003', name: 'Africa Inland Mission', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_107e9a3c4-1785486040904.png", alt: 'Africa Inland Mission church partner logo', type: 'Church Partner' },
{ id: 'par-004', name: 'Kenya Red Cross', logo: "https://img.rocket.new/generatedImages/rocket_gen_img_138f135d2-1785486041021.png", alt: 'Kenya Red Cross health partner logo', type: 'Health Partner' }];


// ─── DASHBOARD USERS ──────────────────────────────────────────

export const dashboardUsers: DashboardUser[] = [
{ id: 'usr-001', name: 'Pastor Amani', initials: 'PA', role: 'Super Admin', email: 'pastor@zengwaconnect.org' },
{ id: 'usr-002', name: 'Finance Officer', initials: 'FO', role: 'Finance', email: 'finance@zengwaconnect.org' },
{ id: 'usr-003', name: 'David Njoroge', initials: 'DN', role: 'Project Manager', email: 'david@zengwaconnect.org' },
{ id: 'usr-004', name: 'Grace Odhiambo', initials: 'GO', role: 'Volunteer Coordinator', email: 'grace@zengwaconnect.org' },
{ id: 'usr-005', name: 'Margaret T.', initials: 'MT', role: 'Donor', email: 'margaret@example.com' },
{ id: 'usr-006', name: 'Robert Chen', initials: 'RC', role: 'Sponsor', email: 'robert@example.com' }];


// ─── AUDIT LOGS ───────────────────────────────────────────────

export const auditLogs: AuditLog[] = [
{ id: 'log-001', user: 'Pastor Amani', action: 'Created campaign', resource: 'School Block B', timestamp: '2026-07-30 14:32', ip: '196.201.x.x', status: 'success' },
{ id: 'log-002', user: 'Finance Officer', action: 'Exported financial report', resource: 'July 2026 Report', timestamp: '2026-07-30 11:15', ip: '196.201.x.x', status: 'success' },
{ id: 'log-003', user: 'Unknown', action: 'Failed login attempt', resource: 'Auth', timestamp: '2026-07-29 23:44', ip: '41.90.x.x', status: 'error' },
{ id: 'log-004', user: 'Grace Odhiambo', action: 'Approved volunteer', resource: 'Michael Osei', timestamp: '2026-07-29 09:20', ip: '196.201.x.x', status: 'success' },
{ id: 'log-005', user: 'David Njoroge', action: 'Updated project progress', resource: 'School Block B', timestamp: '2026-07-28 16:05', ip: '196.201.x.x', status: 'success' },
{ id: 'log-006', user: 'Finance Officer', action: 'Flagged suspicious donation', resource: 'don-008', timestamp: '2026-07-27 10:30', ip: '196.201.x.x', status: 'warning' }];


// ─── IMPACT STATS ─────────────────────────────────────────────

export const impactStats = {
  childrenSponsored: 847,
  totalRaisedKES: 12400000,
  volunteersServed: 312,
  communitiesReached: 28,
  projectsCompleted: 14,
  yearsOfService: 17,
  countriesRepresented: 24,
  livesTransformed: 3200
};

// ─── DONATION TREND DATA (for charts) ─────────────────────────

export const donationTrendData = [
{ month: 'Jan', amount: 820000, donors: 98 },
{ month: 'Feb', amount: 940000, donors: 112 },
{ month: 'Mar', amount: 1100000, donors: 134 },
{ month: 'Apr', amount: 980000, donors: 118 },
{ month: 'May', amount: 1340000, donors: 156 },
{ month: 'Jun', amount: 2500000, donors: 198 },
{ month: 'Jul', amount: 2840000, donors: 234 }];


// ─── CAMPAIGN PROGRESS (for charts) ───────────────────────────

export const campaignProgressData = [
{ name: 'School Block B', raised: 1240000, goal: 1800000 },
{ name: 'Clean Water', raised: 680000, goal: 900000 },
{ name: 'Sponsorship', raised: 325000, goal: 500000 },
{ name: 'Health Outreach', raised: 145000, goal: 400000 },
{ name: 'Church Planting', raised: 92000, goal: 250000 }];


// ─── SPONSORSHIP RING DATA ────────────────────────────────────

export const sponsorshipRingData = [
{ name: 'Sponsored', value: 847, fill: '#1B5E20' },
{ name: 'Awaiting Sponsor', value: 63, fill: '#81C784' }];