// ============================================================
// ZENGWA MISSION CONNECT — CENTRALIZED DUMMY DATA
// All mock/static data for frontend pages lives here.
// ============================================================

// ─── TYPES ───────────────────────────────────────────────────

export interface Campaign {
  id: string;
  slug:string;
  title: string;
  category: string;
  thumbnail:string;
  image: string[];
  alt: string;
  raised: number;
  donors: number;
  goal: number;
  daysLeft: number;
  badge: string;
  badgeColor: string;
  currency: string;
  description: string;
  updates: number;
  rating: number,
  reviews: string[],
}

export interface Post {
  
  id: string;
  title: string;
  category: "Construction" | "Church" | "Water" | "Sponsorship";
  date: string;
  readTime: string;
  excerpt: string;
  image: string[];
  alt: string;
  categoryColor: string

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
  image: string[];
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
  storyImages:string[];
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
  email:"zengwaacademy@gmail.com",

  phone:"+254 706 074 840",
  whatsappNumber:254706074840,

  facebook:"facebooklink",
  x:"x.com",
  location:"Zengwa Village, Kwale County, Coast of Kenya",
  instagram:"https://www.instagram.com/zengwachristiancentre?utm_source=zengwachristianeducationcentre.org",
  youtube:"youtube.com",
  tiktok:"tiktok.com",
}

export const campaigns: Campaign[] = [
{
  id: 'camp-001',
  slug:'construction-of-zengwa-education-centre-school-blocks',
  title: 'Zengwa Primary School Block',
  category: 'Education',
  thumbnail:'',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1789657905/IMG-20260917-WA0010_ka8xas.jpg","https://res.cloudinary.com/ezs2dy9g/image/upload/v1786193848/WhatsApp_Image_2026-08-02_at_12.29.03_PM_1_av92gt.jpg","https://res.cloudinary.com/ezs2dy9g/image/upload/v1786193838/WhatsApp_Image_2026-08-02_at_12.29.02_PM_1_cq2oql.jpg"],
  alt: 'School block under construction in Zengwa village',
  raised: 1240000,
  goal: 1800000,
  donors: 248,
  daysLeft: 42,
  badge: 'Urgent',
  badgeColor: 'bg-danger text-white',
  currency: 'KES',
  description: 'We are building a second classroom block to accommodate 200 additional students who currently study under trees. The new block will have 4 classrooms, a library, and sanitation facilities.',
  updates: 8,
  rating:4,
  reviews:["awesomejob",'You\'re God sent']
},
// {
//   id: 'camp-002',
//   title: 'Clean Water Borehole — Zengwa Village',
//   category: 'Water & Health',
//   image: [""],
//   alt: 'African woman drawing clean water from a newly installed borehole pump surrounded by community members',
//   raised: 680000,
//   goal: 900000,
//   donors: 156,
//   daysLeft: 18,
//   badge: 'Featured',
//   badgeColor: 'bg-primary text-white',
//   currency: 'KES',
//   description: 'Providing clean, safe drinking water to over 1,500 community members who currently walk 8km daily to fetch water from a contaminated river.',
//   updates: 5,
//   rating:4,
//   reviews:["awesomejob",'You\'re God sent']
// },
// {
//   id: 'camp-003',
//   title: 'Church Tree Planting — Kwale North',
//   category: 'Church',
//   image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187773/WhatsApp_Image_2026-08-02_at_12.29.02_PM_chigls.jpg"],
//   alt: 'Small congregation gathered under a thatched roof church structure in a remote African village during Sunday service',
//   raised: 92000,
//   goal: 250000,
//   donors: 41,
//   daysLeft: 120,
//   badge: 'Active',
//   badgeColor: 'bg-accent/20 text-primary',
//   currency: 'KES',
//   description: 'Planting 3 new churches in unreached communities in Northern Kenya, each with a trained pastor and discipleship program.',
//   updates: 4,
//   rating:4,
//   reviews:["awesomejob",'You\'re God sent']
// },
// {
//   id: 'camp-004',
//   title: 'Girls\' Dormitory Construction',
//   category: 'Education',
//   image:[ "https://res.cloudinary.com/ezs2dy9g/image/upload/v1786193848/WhatsApp_Image_2026-08-02_at_12.29.03_PM_1_av92gt.jpg"],
//   alt: 'Young African girls studying together in a bright classroom with colorful educational posters on the walls',
//   raised: 0,
//   goal: 0,
//   donors: 0,
//   daysLeft:365,
//   badge: 'Active',
//   badgeColor: 'bg-accent/20 text-primary',
//   currency: 'KES',
//   description: 'Building a safe dormitory for 80 girls from remote villages, enabling them to attend school without the daily 20km walk.',
//   updates: 6,
//     rating:4,
//   reviews:["awesomejob",'You\'re God sent']
// }

];


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
    location: 'Kwale Town'
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
  }
];


// ─── PROJECTS ─────────────────────────────────────────────────

export const projects: Project[] = [
{
  id: 'proj-001',
  title: 'Zengwa Primary School Block',
  category: 'Education',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1789657905/IMG-20260917-WA0010_ka8xas.jpg",'https://img.rocket.new/generatedImages/rocket_gen_img_1fa810fe8-1784313443629.png'],
  alt: 'Construction progress of school classroom block with concrete walls for  Zengwa Connect project',
  status: 'In Progress',
  progress: 69,
  budget: 1800000,
  spent: 1240000,
  currency: 'KES',
  description: 'Construction of a 4-classroom block with library and sanitation facilities to accommodate 200 additional students.',
  startDate: 'Jan 2026',
  endDate: 'Sep 2026',
  location: 'Zengwa Village, Kwale',
  beneficiaries: 200
},

{
  id: 'proj-002',
  title: 'Tree Planting — Kwale North',
  category: 'Church Planting',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg"],
  alt: "Trees planted on Zengwa connect projects' acquired piece of land",
  status: 'Completed',
  progress: 0,
  budget: 250000,
  spent: 92000,
  currency: 'KES',
  description: 'Planting trees in Kwale on a recently acquired piece of land for the Zengwa connect project.',
  startDate: 'Feb 2026',
  endDate: 'Dec 2026',
  location: 'Acquired piece of land - North Kwale ',
  beneficiaries: 450
},
{
  id: 'proj-003',
  title: 'Tree Planting — Kwale North',
  category: 'Church Planting',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg"],
  alt: "Trees planted on Zengwa connect projects' acquired piece of land",
  status: 'In Progress',
  progress: 37,
  budget: 250000,
  spent: 92000,
  currency: 'KES',
  description: 'Planting trees in Kwale on a recently acquired piece of land for the Zengwa connect project.',
  startDate: 'Feb 2026',
  endDate: 'Dec 2026',
  location: 'Acquired piece of land - North Kwale ',
  beneficiaries: 450
}
];



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
  featured: true,
  storyImages:[]
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
  featured: true,
  storyImages:[]
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
  featured: false,
  storyImages:[]
},
{
  id: 'blog-004',
  title: 'Volunteer Spotlight: Dr. Emily\'s Two Weeks in Kwale',
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
  featured: false,
  storyImages:[]
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
  featured: false,
  storyImages:[]
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
  featured: false,
  storyImages:[]
}];


// ─── EVENTS ───────────────────────────────────────────────────

export const events: Event[] = [
// {
//   id: 'evt-001',
//   title: 'Annual Fundraising Gala 2026',
//   description: 'Join us for an evening of celebration, testimonies, and fundraising for our 2026 projects. Featuring live music, dinner, and inspiring stories from the field.',
//   date: 'August 15, 2026',
//   time: '6:00 PM — 10:00 PM',
//   location: 'Nairobi Serena Hotel, Nairobi',
//   type: 'Fundraiser',
//   image: "https://img.rocket.new/generatedImages/rocket_gen_img_178e04177-1772254978127.png",
//   alt: 'Elegant fundraising gala dinner with round tables, candles, and guests in formal attire',
//   attendees: 180,
//   capacity: 250,
//   free: false,
//   price: 5000,
//   currency: 'KES'
// },
// {
//   id: 'evt-002',
//   title: 'Volunteer Orientation Day',
//   description: 'New volunteer orientation covering our mission, values, safety protocols, and project assignments. All new volunteers must attend before deployment.',
//   date: 'August 3, 2026',
//   time: '9:00 AM — 1:00 PM',
//   location: 'Zengwa Education Centre, Kwale',
//   type: 'Training',
//   image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1f9ebc4-1772211601313.png",
//   alt: 'Group of volunteers in orange vests attending an orientation session in a community hall',
//   attendees: 24,
//   capacity: 40,
//   free: true
// },
// {
//   id: 'evt-003',
//   title: 'Community Prayer & Fasting Day',
//   description: 'A day of corporate prayer and fasting for our nation, our ministry, and the communities we serve. All are welcome to join in person or online.',
//   date: 'August 8, 2026',
//   time: '6:00 AM — 6:00 PM',
//   location: 'Zengwa Church, Kwale',
//   type: 'Prayer',
//   image: 'https://images.unsplash.com/photo-1575652341484-cf585e29d737',
//   alt: 'Community members gathered in prayer inside a church with hands raised in worship',
//   attendees: 120,
//   capacity: 300,
//   free: true
// },
// {
//   id: 'evt-004',
//   title: 'Back-to-School Drive 2026',
//   description: 'Help us collect school supplies, uniforms, and books for 500 children returning to school in September. Drop-off points across Nairobi and Kwale.',
//   date: 'August 20–31, 2026',
//   time: 'All Day',
//   location: 'Multiple Locations',
//   type: 'Community Drive',
//   image: "https://img.rocket.new/generatedImages/rocket_gen_img_17120bf64-1767940898922.png",
//   alt: 'School supplies including books, pencils, and backpacks arranged on a table for donation',
//   attendees: 89,
//   capacity: 500,
//   free: true
// },
// {
//   id: 'evt-005',
//   title: 'Medical Outreach — Laisamis',
//   description: 'Free medical camp offering consultations, vaccinations, dental care, and health education to 800+ residents of Laisamis and surrounding villages.',
//   date: 'September 5–7, 2026',
//   time: '8:00 AM — 5:00 PM',
//   location: 'Laisamis Community Centre',
//   type: 'Health Outreach',
//   image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e2a766cc-1772878671814.png',
//   alt: 'Medical team setting up a free health clinic with patients waiting in line outside',
//   attendees: 0,
//   capacity: 800,
//   free: true
// },
// {
//   id: 'evt-006',
//   title: 'Donor Appreciation Breakfast',
//   description: 'A special breakfast for our top donors to share project updates, impact reports, and future plans. An intimate gathering of 50 key supporters.',
//   date: 'September 12, 2026',
//   time: '8:00 AM — 11:00 AM',
//   location: 'Villa Rosa Kempinski, Nairobi',
//   type: 'Donor Relations',
//   image: "https://images.unsplash.com/photo-1661335996024-1264a70d1347",
//   alt: 'Elegant breakfast setting with white tablecloths and fresh flowers for a donor appreciation event',
//   attendees: 35,
//   capacity: 50,
//   free: true
// }

];


// ─── GALLERY ──────────────────────────────────────────────────

export const galleryItems: GalleryItem[] = [
{
  id: 'gal-001',
  type: 'photo',
  title: 'School Construction Progress',
  alt: 'school block under construction in Zengwa village ',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786193845/WhatsApp_Image_2026-08-02_at_12.29.03_PM_o91da6.jpg',
  album: 'Construction',
  date: 'July 2026',
  likes: 142
},
{
  id: 'gal-002',
  type: 'video',
  title: 'Children Looking for Supplies in Dumping Places',
  alt: 'Children looking for food and clothing and materials to construct houses and eat to survive',
  image: 'https://res.cloudinary.com/ezs2dy9g/video/upload/v1786187774/WhatsApp_Video_2026-08-02_at_12.29.02_PM_lm2gx6.mp4',
  album: 'Survival',
  date: 'June 2026',
  likes: 289
},
{
  id: 'gal-003',
  type: 'photo',
  title: 'Children in Dumpster',
  alt: 'Vulnerable Children in the Zengwa village scavenging in the dumpster.',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187749/WhatsApp_Image_2026-08-02_at_12.29.03_PM_2_zfklin.jpg',
  album: 'Education',
  date: 'July 2026',
  likes: 198
},
{
  id: 'gal-004',
  type: 'photo',
  title: 'Piece of land bought by Zengwa Connect Team',
  alt: 'Piece of land bought nby zengwa connenct team to to facilitate construction of children Shelter',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg',
  album: 'Shelter',
  date: 'May 2026',
  likes: 167
},
{
  id: 'gal-005',
  type: 'photo',
  title: 'A house constructed by the vulnarable Children',
  alt: 'A house constructed by the vulnarable Children in Zengwa Kwale County',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187737/WhatsApp_Image_2026-08-02_at_12.29.23_PM_zd824t.jpg',
  album: 'Church',
  date: 'June 2026',
  likes: 234
},
{
  id: 'gal-006',
  type: 'photo',
  title: 'A house constructed by the vulnarable Children',
  alt: 'A house constructed by the vulnarable Children in Zengwa Kwale County',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187736/WhatsApp_Image_2026-08-02_at_12.29.31_PM_t8lrz4.jpg',
  album: 'Church',
  date: 'June 2026',
  likes: 234
},
{
  id: 'gal-007',
  type: 'photo',
  title: 'A house constructed by the vulnarable Children',
  alt: 'A house constructed by the vulnarable Children in Zengwa Kwale County',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187727/WhatsApp_Image_2026-08-02_at_12.29.27_PM_fjtb6m.jpg',
  album: 'Church',
  date: 'June 2026',
  likes: 234
},
{
  id: 'gal-008',
  type: 'photo',
  title: 'A house constructed by the vulnarable Children',
  alt: 'A black polythene  house constructed by the vulnarable Children in Zengwa Kwale County',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187733/WhatsApp_Image_2026-08-02_at_12.29.24_PM_1_mopyco.jpg',
  album: 'Church',
  date: 'June 2026',
  likes: 234
},
{
  id: 'gal-009',
  type: 'photo',
  title: 'A stand stall like house constructed by the vulnarable Children',
  alt: 'A black polythene  house constructed by the vulnarable Children in Zengwa Kwale County',
  image: 'https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187733/WhatsApp_Image_2026-08-02_at_12.29.49_PM_wt394t.jpg',
  album: 'Church',
  date: 'June 2026',
  likes: 234
}

];


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
}
];


export const volunteerRoles: VolunteerRole[] = [
{
  id: 'vr-001',
  title: 'Medical Volunteer',
  description: 'Join our medical outreach teams providing free healthcare to remote communities. We need doctors, nurses, pharmacists, and health educators.',
  commitment: '2–4 weeks on-site',
  skills: ['Medical degree or nursing', 'First aid certification', 'Cross-cultural communication'],
  openings: 8,
  location: 'Kwale County, Kenya',
  category: 'Health'
},
{
  id: 'vr-002',
  title: 'Construction Volunteer',
  description: 'Help build classrooms, dormitories, and community facilities. No professional experience required — just willing hands and a servant heart.',
  commitment: '1–3 months',
  skills: ['Physical fitness', 'Basic construction (preferred)', 'Teamwork'],
  openings: 15,
  location: 'Zengwa Village, Kwale',
  category: 'Construction'
},
{
  id: 'vr-003',
  title: 'Education Volunteer',
  description: 'Teach English, mathematics, science, or vocational skills. Help train local teachers and develop curriculum materials.',
  commitment: '3–12 months',
  skills: ['Teaching qualification (preferred)', 'Patience', 'Creativity'],
  openings: 6,
  location: 'Zengwa Village, Kwale',
  category: 'Education'
},
{
  id: 'vr-004',
  title: 'Digital & Communications',
  description: 'Help us tell our story to the world. Create content, manage social media, design graphics, and produce video updates from the field.',
  commitment: 'Remote or 1–4 weeks on-site',
  skills: ['Photography/videography', 'Social media', 'Graphic design'],
  openings: 4,
  location: 'Remote / Kwale',
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
}
];


// ─── TEAM MEMBERS ─────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
{
  id: 'team-001',
  name: 'Evangelist Anne Kemunto',
  role: 'Founder &  Director',

  image: "https://res.cloudinary.com/ezs2dy9g/image/upload/v1789408586/WhatsApp_Image_2026-09-14_at_12.47.17_fglxto.jpg",

  alt: 'Evangelist Anne Kemunto',
  bio: 'Evangelist Anne Kemunto founded Zengwa Christian Education Centre in 2025 after a vision to transform his home village through education and the Gospel.'
},
{
  id: 'team-002',
  name: 'Mohammed Beni',
  role: 'Founder &  Director',

  image: "https://res.cloudinary.com/ezs2dy9g/image/upload/v1789408586/WhatsApp_Image_2026-09-14_at_11.54.58_1_tpqicz.jpg",

  alt: 'Mohammed Beni smiling confidently',
  bio: 'Mohammed Beni has coordinated over 200 volunteers from 6 counties. He is passionate about sustainable impact.'
},
];


// ─── TESTIMONIALS ─────────────────────────────────────────────

export const testimonials: Testimonial[] = [
// {
//   id: 'test-001',
//   name: 'Margaret Thompson',
//   role: 'Child Sponsor — 3 years',
//   image: "https://img.rocket.new/generatedImages/rocket_gen_img_1440ac186-1772838729426.png",
//   alt: 'Smiling middle-aged woman with glasses',
//   quote: 'Sponsoring Amina has been one of the greatest joys of my life. The updates I receive show real transformation — not just in her education but in her entire family.',
//   country: 'United Kingdom',
//   flag: '🇬🇧'
// }

];


// ─── RECENT DONATIONS ─────────────────────────────────────────

export const recentDonations: DonationRecord[] = [
{ id: 'don-001', donor: 'Margaret T.', amount: 15000, currency: 'KES', campaign: 'School Block', method: 'M-Pesa', date: '2026-07-30', status: 'Completed', anonymous: false },
{ id: 'don-002', donor: 'Anonymous', amount: 50000, currency: 'KES', campaign: 'Clean Water', method: 'Stripe', date: '2026-07-30', status: 'Completed', anonymous: true },
{ id: 'don-003', donor: 'Robert Chen', amount: 25000, currency: 'KES', campaign: 'Child Sponsorship', method: 'PayPal', date: '2026-07-29', status: 'Completed', anonymous: false },
{ id: 'don-004', donor: 'Grace M.', amount: 5000, currency: 'KES', campaign: 'Church Planting', method: 'M-Pesa', date: '2026-07-29', status: 'Pending', anonymous: false },
{ id: 'don-005', donor: 'John K.', amount: 10000, currency: 'KES', campaign: 'Health Outreach', method: 'M-Pesa', date: '2026-07-28', status: 'Completed', anonymous: false },
{ id: 'don-006', donor: 'Anonymous', amount: 100000, currency: 'KES', campaign: 'School Block', method: 'Stripe', date: '2026-07-28', status: 'Completed', anonymous: true },
{ id: 'don-007', donor: 'Pastor Erik L.', amount: 30000, currency: 'KES', campaign: 'Girls Dormitory', method: 'PayPal', date: '2026-07-27', status: 'Completed', anonymous: false },
{ id: 'don-008', donor: 'Mary W.', amount: 3500, currency: 'KES', campaign: 'Child Sponsorship', method: 'M-Pesa', date: '2026-07-27', status: 'Failed', anonymous: false }];


// ─── PRAYER REQUESTS ──────────────────────────────────────────

export const prayerRequests: PrayerRequest[] = [
{ id: 'pr-001', name: 'Pastor James', request: 'Pray for the completion of School Block before the September term begins.', date: '2026-07-28', prayers: 142, answered: false },
{ id: 'pr-002', name: 'Anonymous', request: 'Pray for the 23 children awaiting sponsors — that God would move hearts to give.', date: '2026-07-25', prayers: 89, answered: false },
{ id: 'pr-003', name: 'Grace O.', request: 'Thanksgiving — the borehole is 76% funded! Pray for the final KES 220K.', date: '2026-07-20', prayers: 234, answered: false },
{ id: 'pr-004', name: 'Community', request: 'Pray for the new churches in Kwale North — for growth, discipleship, and protection.', date: '2026-07-15', prayers: 178, answered: false },
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
{ id: 'log-001', user: 'Pastor Amani', action: 'Created campaign', resource: 'School Block', timestamp: '2026-07-30 14:32', ip: '196.201.x.x', status: 'success' },
{ id: 'log-002', user: 'Finance Officer', action: 'Exported financial report', resource: 'July 2026 Report', timestamp: '2026-07-30 11:15', ip: '196.201.x.x', status: 'success' },
{ id: 'log-003', user: 'Unknown', action: 'Failed login attempt', resource: 'Auth', timestamp: '2026-07-29 23:44', ip: '41.90.x.x', status: 'error' },
{ id: 'log-004', user: 'Grace Odhiambo', action: 'Approved volunteer', resource: 'Michael Osei', timestamp: '2026-07-29 09:20', ip: '196.201.x.x', status: 'success' },
{ id: 'log-005', user: 'David Njoroge', action: 'Updated project progress', resource: 'School Block', timestamp: '2026-07-28 16:05', ip: '196.201.x.x', status: 'success' },
{ id: 'log-006', user: 'Finance Officer', action: 'Flagged suspicious donation', resource: 'don-008', timestamp: '2026-07-27 10:30', ip: '196.201.x.x', status: 'warning' }];


// ─── IMPACT STATS ─────────────────────────────────────────────


export const impactStats = {
  childrenSponsored: 84,

  totalRaisedKES: 0,
  volunteersServed: 0,
  communitiesReached: 0,
  // projectsCompleted: completeprojects.length,
  yearsOfService: 1,
  countriesRepresented: 1,
  donorsCount:0,
  livesTransformed: 0
};

// ─── DONATION TREND DATA (for charts) ─────────────────────────

export const donationTrendData = [
  { month: 'Jan', amount: 0, donors: 0 },
  { month: 'Feb', amount: 0, donors: 0 },
  { month: 'Mar', amount: 0, donors: 0 },
  { month: 'Apr', amount: 0, donors: 0 },
  { month: 'May', amount: 0, donors: 0 },
  { month: 'Jun', amount: 0, donors: 0 },
  { month: 'Jul', amount: 0, donors: 0 }
];


// ─── CAMPAIGN PROGRESS (for charts) ───────────────────────────

export const campaignProgressData = [

  { name: 'School Block', raised: 0, goal: 0 },
  { name: 'Clean Water', raised: 0, goal: 0 },
  { name: 'Sponsorship', raised: 325000, goal: 0 }


];


// ─── SPONSORSHIP RING DATA ────────────────────────────────────

export const sponsorshipRingData = [


  { name: 'Sponsored', value: 84, fill: '#1B5E20' },

  { name: 'Awaiting Sponsor', value: 63, fill: '#81C784' }

];

// ------------------------------posts----------------------------------
export const posts: Post[] = [
{
  id: 'post-001',
  title: 'School Block Construction Reaches 23% — Completion Expected by 2027 August',
  category: 'Construction',
  date: '14 Jul 2026',
  readTime: '4 min read',
  excerpt: 'The second classroom block at Zengwa Primary School is progressing ahead of schedule, thanks to the generous support of 248 donors from 12 countries.',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786562946/WhatsApp_Image_2026-08-12_at_9.30.34_PM_bb5tc7.jpg"],
  alt: 'Construction site showing new school building with workers laying bricks and scaffolding in place',
  categoryColor: 'bg-warning/10 text-warning'
},
{
  id: 'post-002',
  title: '50 New Children Enrolled in Sponsorship Program for 2026 Academic Year',
  category: 'Sponsorship',
  date: '08 Jul 2026',
  readTime: '3 min read',
  excerpt: 'This year we welcomed 50 new children into our sponsorship program, each paired with a committed global donor who will walk with them through their education journey.',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1790154084/IMG-20260920-WA0011_gj8xbd.jpg"],
  alt: 'Excited young African children in school uniforms holding up their new school bags and supplies on enrollment day',
  categoryColor: 'bg-accent/20 text-primary'
},
{
  id: 'post-003',
  title: 'Water Borehole Serves 1,200 Community Members Daily Since Installation',
  category: 'Water',
  date: '01 Jul 2026',
  readTime: '5 min read',
  excerpt: 'The borehole funded by our Clean Water campaign has been operational for 3 months, providing safe drinking water to over 1,200 people in Zengwa and surrounding villages.',
  image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1790158376/IMG-20260921-WA0009_1_zgbqde.jpg"],
  alt: 'Children collecting clean water from a newly installed borehole pump in an African village',
  categoryColor: 'bg-primary/10 text-primary'
},
{
  id: 'post-004',
  title: 'Partnership with Kwale Diocese Strengthens Church Planting Initiative',
  category: 'Church',
  date: '24 Jun 2026',
  readTime: '3 min read',
  excerpt: 'A new memorandum of understanding with the Anglican Diocese of Kwale will accelerate our church planting goals, targeting 8 new congregations by end of 2027.',
  image: ["https://img.rocket.new/generatedImages/rocket_gen_img_18daf0a55-1765652592016.png"],
  alt: 'Community members gathered outside a small rural church in Kenya for a Sunday service',
  categoryColor: 'bg-gold/20 text-warning'
}];
