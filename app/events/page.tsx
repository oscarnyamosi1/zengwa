
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import EventsClient from './EventsClient';

export const dynamic = 'force-dynamic';

export interface EventItem {
  id: string;
  slug: string | null;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  alt: string;
  gallery: string[];
  attendees: number;
  capacity: number;
  free: boolean;
  price: number | null;
  currency: string;
}

async function getEvents(): Promise<EventItem[]> {
  const backendUrl = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://127.0.0.1:8000/api'
  ).replace(/\/+$/, '');

  try {
    const response = await fetch(`${backendUrl}/getevents/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch events: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();

    // Supports a direct array or common paginated API responses.
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data.events)) {
      return data.events;
    }

    return [];
  } catch (error) {
    console.error('Error fetching events from Django:', error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main>
        <section className="relative overflow-hidden bg-primary py-14 lg:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-screen-2xl px-6 text-center lg:px-10 xl:px-16">
            
            <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold leading-tight text-primary-foreground lg:text-5xl">
              Upcoming Events
            </h1>

            <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">
              Join Us in Person
            </h2>

            <p className="mx-auto max-w-xl text-lg text-primary-foreground">
              From fundraising meetings to community prayer days, find an event
              near you and be part of the mission.
            </p>
          </div>
        </section>

        <EventsClient events={events} />
      </main>

      <PublicFooter />
    </div>
  );
}
