// app/(dashboard)/analytics/page.tsx

import { Suspense } from 'react';

import { 
  ArrowUp, ArrowDown, Search, Download, Users, 
  Heart, AlertCircle, ChevronLeft, Upload,
  LayoutDashboard, BarChart3, HandCoins, Flag,
  UserRound, Handshake, FileText, Image, CalendarDays,
  Church, FileSpreadsheet, Settings, Calendar,
  Droplet,  Stethoscope, GraduationCap, 
  Clock, Filter 
} from 'lucide-react';


// Mock data (In a real app, this would come from an API or DB)
const analyticsData = {
  kpis: [
    {
      label: 'Total Raised (Jul)',
      value: 'KES 2.84M',
      change: '+13.6%',
      trend: 'up',
      sub: 'KES 340K vs Jun',
    },
    {
      label: 'Active Campaigns',
      value: '5',
      change: '+1 this month',
      trend: 'up',
      sub: '2 near goal',
    },
    {
      label: 'Children Sponsored',
      value: '847',
      change: '+12 this month',
      trend: 'up',
      sub: '93% of 910 target',
      alert: 'Alert',
    },
    {
      label: 'Pending Donations',
      value: '23',
      change: 'Needs review',
      trend: 'neutral',
      sub: 'KES 184K awaiting',
      alert: 'Needs review',
    },
    {
      label: 'Volunteer Hours (Jul)',
      value: '1,248',
      change: '+17.5%',
      trend: 'up',
      sub: '186 vs last month',
    },
    {
      label: 'New Donors (Jul)',
      value: '142',
      change: '-6.2% vs Jun',
      trend: 'down',
      sub: '38 first-time givers',
      down: 'Down',
    },
  ],
  donationTrend: [
    { week: 'W1 May', donations: 120, target: 150 },
    { week: 'W2 May', donations: 145, target: 150 },
    { week: 'W3 May', donations: 135, target: 150 },
    { week: 'W4 May', donations: 190, target: 200 },
    { week: 'W1 Jun', donations: 210, target: 200 },
    { week: 'W2 Jun', donations: 175, target: 200 },
    { week: 'W3 Jun', donations: 230, target: 220 },
    { week: 'W4 Jun', donations: 215, target: 220 },
    { week: 'W1 Jul', donations: 260, target: 250 },
    { week: 'W2 Jul', donations: 290, target: 250 },
    { week: 'W3 Jul', donations: 310, target: 280 },
    { week: 'W4 Jul', donations: 280, target: 280 },
  ],
  campaigns: [
    { name: 'School Block', percentage: 78, color: 'bg-primary' },
    { name: 'Clean Water', percentage: 62, color: 'bg-accent' },
    { name: 'Child Sponsorship', percentage: 93, color: 'bg-primary' },
    { name: 'Health Outreach', percentage: 45, color: 'bg-yellow-500' },
    { name: 'Church Planting', percentage: 31, color: 'bg-blue-500' },
  ],
  donations: [
    { id: 1, name: 'Margaret Wanjiku', email: 'margaret.w@gmail.com', campaign: 'School Block', amount: 'KES 5,000', method: 'M-Pesa', status: 'Confirmed', country: 'Kenya', date: '17 Jul 2026' },
    { id: 2, name: 'Mwashinga Sarah', email: 'mwashinga.s@outlook.com', campaign: 'School Block', amount: 'GBP 30', method: 'Stripe', status: 'Confirmed', country: 'UK', date: '17 Jul 2026' },
    { id: 3, name: 'Anonymous', email: '—', campaign: 'Clean Water', amount: 'USD 50', method: 'PayPal', status: 'Confirmed', country: '—', date: '17 Jul 2026' },
    { id: 4, name: 'David Omondi', email: 'david.o@yahoo.com', campaign: 'Child Sponsorship', amount: 'KES 2,500', method: 'M-Pesa', status: 'Pending', country: 'Kenya', date: '16 Jul 2026' },
    { id: 5, name: 'James Kariuki', email: 'james.k@gmail.com', campaign: 'General Fund', amount: 'KES 10,000', method: 'M-Pesa', status: 'Confirmed', country: 'Kenya', date: '16 Jul 2026' },
    { id: 6, name: 'Amelia Ndung\'u', email: 'amelia.n@gmail.com', campaign: 'Health Outreach', amount: 'EUR 25', method: 'Stripe', status: 'Confirmed', country: 'Germany', date: '16 Jul 2026' },
    { id: 7, name: 'Peter Mwangi', email: 'peter.m@icloud.com', campaign: 'Church Planting', amount: 'KES 1,500', method: 'M-Pesa', status: 'Pending', country: 'Kenya', date: '15 Jul 2026' },
    { id: 8, name: 'Grace Mejumaa', email: 'grace.a@gmail.com', campaign: 'Clean Water', amount: 'KES 3,000', method: 'M-Pesa', status: 'Failed', country: 'Kenya', date: '15 Jul 2026' },
  ],
  sponsorship: {
    total: 910,
    sponsored: 847,
    percentage: 93,
  },
  events: [
    { id: 1, title: 'Board Meeting — Q3 Review', date: '19 Jul 2026', category: 'Admin', badge: 'Admin' },
    { id: 2, title: 'Volunteer Orientation Day', date: '22 Jul 2026', category: 'Volunteer', badge: 'Volunteer' },
    { id: 3, title: 'School Block Site Visit', date: '25 Jul 2026', category: 'Project', badge: 'Project' },
    { id: 4, title: 'Donor Appreciation Webinar', date: '30 Jul 2026', category: 'Donor', badge: 'Donor' },
  ],
  prayers: [
    { id: 1, name: 'Grace Wanjiku', text: 'Pray for safe delivery of school materials delayed at port', time: '2h ago', urgent: true },
    { id: 2, name: 'Pastor Daniel', text: 'Prayers for wisdom as we plan the new church plant in Moyale', time: '5h ago', urgent: false },
    { id: 3, name: 'Volunteer Team', text: 'Safety and health for all volunteers traveling to Zengwa next week', time: '1d ago', urgent: false },
  ]
};

// Components

const KPICard = ({ data }) => {
  const { label, value, change, trend, sub, alert, down } = data;
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const isNeutral = trend === 'neutral';

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold font-headings text-foreground mt-1">{value}</p>
      <div className={`flex items-center gap-1 text-sm font-medium mt-1 ${isUp ? 'text-primary' : isDown ? 'text-red-600' : 'text-muted-foreground'}`}>
        {isUp && <ArrowUp size={14} />}
        {isDown && <ArrowDown size={14} />}
        {change}
        <span className="font-normal text-muted-foreground">— {sub}</span>
      </div>
      {alert && (
        <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${alert === 'Alert' ? 'bg-yellow-100 text-yellow-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {alert}
        </span>
      )}
      {down && (
        <span className="inline-block mt-2 text-xs font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
          {down}
        </span>
      )}
    </div>
  );
};

const DonationChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.donations, d.target))) * 1.15;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-headings text-foreground">Donation Trend</h3>
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Weekly receipts vs weekly target — last 12 weeks</span>
      </div>
      <div className="flex items-end justify-between h-40 gap-1.5">
        {data.map((item, idx) => {
          const donationHeight = (item.donations / maxValue) * 100;
          const targetHeight = (item.target / maxValue) * 100;
          return (
            <div key={idx} className="flex flex-col items-center flex-1 gap-1">
              <div className="w-full max-w-[36px] flex flex-col items-center gap-0.5">
                <div className="w-full bg-primary/70 rounded-sm" style={{ height: `${Math.max(donationHeight, 4)}%`, minHeight: '4px' }}></div>
                <div className="w-full bg-border/60 rounded-sm" style={{ height: `${Math.max(targetHeight, 4)}%`, minHeight: '4px' }}></div>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium text-center">{item.week}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary/70 rounded-sm"></span> Donations</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-border/60 rounded-sm"></span> Target</span>
      </div>
    </div>
  );
};

const CampaignProgress = ({ campaigns }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-headings text-foreground">Campaign Funding</h3>
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">% of goal reached per active campaign</span>
      </div>
      <div className="space-y-4">
        {campaigns.map((campaign, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{campaign.name}</span>
              <span className="font-bold text-foreground">{campaign.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
              <div className={`h-full rounded-full ${campaign.color}`} style={{ width: `${campaign.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DonationsTable = ({ donations }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-input border border-border rounded-lg px-3 py-1.5 text-sm">
            <Search size={16} className="text-muted-foreground mr-2" />
            <input type="text" placeholder="Search donor or campaign..." className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-40" />
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">All</button>
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground hover:bg-border transition">Confirmed</button>
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground hover:bg-border transition">Pending</button>
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground hover:bg-border transition">Failed</button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
            Mark Confirmed
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition">
            Export Selected
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted transition">
            Clear
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3"><input type="checkbox" className="rounded border-border" /></th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-muted/30 transition">
                <td className="px-4 py-3"><input type="checkbox" className="rounded border-border" /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary">
                      {donation.name === 'Anonymous' ? '?' : donation.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{donation.name}</p>
                      <p className="text-xs text-muted-foreground">{donation.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{donation.campaign}</td>
                <td className="px-4 py-3 font-bold text-foreground">{donation.amount}</td>
                <td className="px-4 py-3 text-muted-foreground">{donation.method}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusStyles(donation.status)}`}>
                    {donation.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{donation.country}</td>
                <td className="px-4 py-3 text-muted-foreground">{donation.date}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <button className="hover:bg-muted p-1 rounded">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t border-border text-sm text-muted-foreground">
        <span>Showing 1–8 of 12 donations</span>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted font-semibold text-sm">2</button>
        </div>
      </div>
    </div>
  );
};

const SponsorshipRing = ({ data }) => {
  const { total, sponsored, percentage } = data;
  const awaiting = total - sponsored;
  const conicGradient = `conic-gradient(var(--color-primary) 0% ${percentage}%, var(--color-muted) ${percentage}% 100%)`;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-headings text-foreground">Sponsorship Status</h3>
        <span className="text-xs font-medium text-muted-foreground">{sponsored} of {total} children sponsored</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: conicGradient }}>
          <div className="w-20 h-20 rounded-full bg-card flex flex-col items-center justify-center">
            <span className="text-xl font-bold font-headings text-foreground">{percentage}%</span>
            <span className="text-[10px] font-medium text-muted-foreground">Sponsored</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-foreground">Sponsored</span>
            <span className="ml-auto font-bold text-foreground">{sponsored}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-muted"></span>
            <span className="text-foreground">Awaiting</span>
            <span className="ml-auto font-bold text-foreground">{awaiting}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsList = ({ events }) => {
  const getBadgeStyles = (badge) => {
    switch (badge) {
      case 'Admin': return 'bg-blue-100 text-blue-800';
      case 'Volunteer': return 'bg-green-100 text-green-800';
      case 'Project': return 'bg-yellow-100 text-yellow-800';
      case 'Donor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-headings text-foreground">Upcoming Events</h3>
        <a href="/events" className="text-xs font-medium text-muted-foreground hover:text-foreground transition">View all</a>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded whitespace-nowrap">{event.date}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.category}</p>
            </div>
            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${getBadgeStyles(event.badge)}`}>
              {event.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrayerRequests = ({ prayers }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-headings text-foreground">Prayer Requests</h3>
        <span className="text-xs font-medium text-muted-foreground">3 new requests today</span>
      </div>
      <div className="space-y-4">
        {prayers.map((prayer) => (
          <div key={prayer.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
            <p className="text-sm text-foreground leading-relaxed">{prayer.text}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs">
              <span className="font-medium text-foreground">{prayer.name}</span>
              <span className="text-muted-foreground">{prayer.time}</span>
              {prayer.urgent && (
                <span className="flex items-center gap-1 font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  <AlertCircle size={12} /> Urgent
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <a href='/prayer-requests' className="w-full mt-4 py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition">
        View All Prayer Requests
      </a>
    </div>
  );
};

// Main Page Component
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Static for analytics context */}
        <aside className="hidden lg:flex lg:flex-shrink-0 lg:w-64 flex-col border-r border-border bg-card h-full overflow-y-auto">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">✝</span>
            </div>
            <div>
              <h1 className="text-base font-bold font-headings text-foreground leading-tight">ZengwaConnect</h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Ministry Platform</p>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Overview</p>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a href="/analytics" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground transition">
              <BarChart3 size={18} /> Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <HandCoins size={18} /> Fundraising <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">12</span>
            </a>
            <a href="/donations" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Heart size={18} /> Donations <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">23</span>
            </a>
            <a href="/campaigns" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Flag size={18} /> Campaigns <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">5</span>
            </a>
            <a href="/sponsorship" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Users size={18} /> Sponsorship <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">3</span>
            </a>
            
            <p className="px-3 pt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">People</p>
            <a href="/donors" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <UserRound size={18} /> Donors
            </a>
            <a href="/volunteers" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Handshake size={18} /> Volunteers
            </a>

            <p className="px-3 pt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Content</p>
            <a href="/blog" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <FileText size={18} /> Blog / CMS
            </a>
            <a href="/gallery" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Image size={18} /> Media Gallery
            </a>
            <a href="/events" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <CalendarDays size={18} /> Events
            </a>
            <a href="/prayerwall" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Church size={18} /> Prayer Wall <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">7</span>
            </a>

            <p className="px-3 pt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reports</p>
            <a href="/financial-reports" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <FileSpreadsheet size={18} /> Financial Reports
            </a>
            <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition">
              <Settings size={18} /> Settings
            </a>
          </nav>
          <div className="border-t border-border px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">PA</div>
              <div>
                <p className="text-sm font-semibold text-foreground">Pastor Amani</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-screen-2xl mx-auto">
            {/* Top Bar */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition">
                  <ChevronLeft size={16} /> Back to Site
                </a>
                <span className="flex items-center gap-2 text-sm font-semibold bg-card border border-border px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> PA
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center bg-card border border-border rounded-lg px-3 py-1.5 flex-1 sm:flex-initial">
                  <Search size={16} className="text-muted-foreground mr-2" />
                  <input type="text" placeholder="Search donors, campaigns..." className="bg-transparent outline-none text-sm text-foreground w-full sm:w-40" />
                </div>
                <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition">
                  <Upload size={16} /> Export
                </button>
              </div>
            </div>

            <div className="p-4 lg:p-8 space-y-6">
              {/* Dashboard Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-headings text-foreground">Ministry Dashboard</h1>
                  <p className="text-sm text-muted-foreground">ZengwaConnect — Overview for July 2026</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-green-50 text-primary border border-green-200 rounded-lg hover:bg-green-100 transition">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Data
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-card border border-border rounded-lg hover:bg-muted transition">
                    <Download size={16} /> Export Report
                  </button>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
                {analyticsData.kpis.map((kpi, idx) => (
                  <KPICard key={idx} data={kpi} />
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DonationChart data={analyticsData.donationTrend} />
                </div>
                <div>
                  <CampaignProgress campaigns={analyticsData.campaigns} />
                </div>
              </div>

              {/* Recent Donations Table */}
              {/* <DonationsTable donations={analyticsData.donations} /> */}

              {/* Right Sidebar Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <SponsorshipRing data={analyticsData.sponsorship} />
                <EventsList events={analyticsData.events} />
                <PrayerRequests prayers={analyticsData.prayers} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}