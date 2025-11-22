"use client";

import { useState, useMemo } from "react";
import { Button, Gradient, Tile } from "@repo/ui";
import { SearchProvider, useSearch } from "@/components/search-provider";
import { TalentList } from "@/components/talent-list";
import { TalentForm } from "@/components/talent-form";
import { BookingCalendar } from "@/components/booking-calendar";
import { ContractList } from "@/components/contract-list";
import { TalentDashboard } from "@/components/talent-dashboard";
import { TalentScheduleView } from "@/components/talent-schedule-view";
import { TalentMessages } from "@/components/talent-messages";
import { TalentRequirements } from "@/components/talent-requirements";
import type {
  TalentProfile,
  Booking,
  Contract,
  MessageThread,
  TalentRequirements as TalentRequirementsType
} from "@/lib/types";

// Mock data
const mockTalents: TalentProfile[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@example.com",
    phone: "+1 555-0101",
    bio: "International DJ specializing in house and techno with 10+ years experience",
    specialty: "DJ / Producer",
    skills: ["House Music", "Techno", "Live Mixing", "Production"],
    status: "available",
    hourlyRate: 500,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    portfolioLinks: [],
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jordan Smith",
    email: "jordan@example.com",
    phone: "+1 555-0102",
    bio: "Award-winning vocalist with experience in jazz, soul, and contemporary music",
    specialty: "Vocalist",
    skills: ["Jazz", "Soul", "R&B", "Live Performance"],
    status: "booked",
    hourlyRate: 350,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    portfolioLinks: [],
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockBookings: Booking[] = [
  {
    id: "b1",
    talentId: "1",
    talentName: "Alex Rivera",
    eventName: "Summer Music Festival",
    eventLocation: "Central Park, NYC",
    startDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    description: "Main stage performance, 4-hour set",
    requirements: "CDJ-3000, Allen & Heath mixer",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "b2",
    talentId: "2",
    talentName: "Jordan Smith",
    eventName: "Jazz Night at Blue Note",
    eventLocation: "Blue Note, Manhattan",
    startDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    endDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    description: "Intimate jazz performance with house band",
    requirements: "Wireless microphone, monitor speakers",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockContracts: Contract[] = [
  {
    id: "c1",
    talentId: "1",
    talentName: "Alex Rivera",
    title: "Summer Festival 2025 Series",
    description: "3-event series across major summer festivals",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    terms: "All expenses covered, including travel and accommodation",
    paymentAmount: 15000,
    paymentSchedule: "50% upfront, 50% upon completion",
    status: "active",
    signedByTalent: true,
    signedByManager: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockThreads: MessageThread[] = [
  {
    id: "t1",
    participants: [
      { id: "manager1", name: "Sarah Johnson", role: "manager" },
      { id: "talent1", name: "Alex Rivera", role: "talent" },
    ],
    subject: "Summer Festival Details",
    messages: [
      {
        id: "m1",
        fromUserId: "manager1",
        fromUserName: "Sarah Johnson",
        toUserId: "talent1",
        toUserName: "Alex Rivera",
        subject: "Summer Festival Details",
        body: "Hi Alex! Wanted to confirm your equipment needs for the festival.",
        status: "read",
        threadId: "t1",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "m2",
        fromUserId: "talent1",
        fromUserName: "Alex Rivera",
        toUserId: "manager1",
        toUserName: "Sarah Johnson",
        subject: "Summer Festival Details",
        body: "All set! I'll need the CDJ-3000 setup and Allen & Heath mixer as discussed.",
        status: "read",
        threadId: "t1",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
  },
];

const mockRequirements: TalentRequirementsType = {
  talentId: "1",
  technical: [
    {
      id: "r1",
      talentId: "1",
      category: "technical",
      title: "CDJ-3000 Setup",
      description: "Pair of Pioneer CDJ-3000 players with DJM-900NXS2 mixer",
      priority: "high",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "r2",
      talentId: "1",
      category: "technical",
      title: "Monitor Speakers",
      description: "High-quality monitor speakers positioned at booth",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  rider: [
    {
      id: "r3",
      talentId: "1",
      category: "rider",
      title: "Green Room Refreshments",
      description: "Bottled water, fresh fruit, and light snacks",
      priority: "low",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  travel: [],
  accommodation: [],
  other: [],
};

type ViewMode = 'manager-dashboard' | 'talent-dashboard' | 'schedule' | 'messages' | 'requirements';

function HomeContent() {
  const [talents, setTalents] = useState<TalentProfile[]>(mockTalents);
  const [bookings] = useState<Booking[]>(mockBookings);
  const [contracts] = useState<Contract[]>(mockContracts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { query } = useSearch();

  // Role simulation - in real app, this would come from auth
  const [userRole, setUserRole] = useState<'manager' | 'talent'>('talent'); // Default to talent view
  const [viewMode, setViewMode] = useState<ViewMode>(userRole === 'manager' ? 'manager-dashboard' : 'talent-dashboard');

  // Filter talents based on search
  const filteredTalents = useMemo(() => {
    if (!query.trim()) return talents;
    const lowerQuery = query.toLowerCase();
    return talents.filter((talent) =>
      talent.name.toLowerCase().includes(lowerQuery) ||
      talent.specialty.toLowerCase().includes(lowerQuery) ||
      talent.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
  }, [talents, query]);

  const handleAddTalent = (data: Partial<TalentProfile>) => {
    const newTalent: TalentProfile = {
      id: Math.random().toString(36).substring(7),
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      bio: data.bio || "",
      specialty: data.specialty || "",
      skills: data.skills || [],
      status: 'available',
      hourlyRate: data.hourlyRate,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      portfolioLinks: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTalents([newTalent, ...talents]);
    setIsModalOpen(false);
  };

  // Manager Dashboard
  if (userRole === 'manager' && viewMode === 'manager-dashboard') {
    return (
      <div className="ui:space-y-8">
        <Gradient />

        <div className="ui:flex ui:items-center ui:justify-between">
          <div>
            <h1 className="ui:text-3xl ui:font-bold">Talent Management</h1>
            <p className="ui:text-gray-600 dark:ui:text-gray-400 ui:mt-1">
              Manage artists, bookings, and contracts
            </p>
          </div>
          <div className="ui:flex ui:gap-3">
            <Button variant="outline" onClick={() => setUserRole('talent')}>
              Switch to Talent View
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>Add Talent</Button>
          </div>
        </div>

        <div className="ui:grid ui:gap-6 md:ui:grid-cols-2 lg:ui:grid-cols-4">
          <Tile title="Active Talent" subtitle={`${talents.length} profiles`} selected />
          <Tile title="Upcoming Bookings" subtitle={`${bookings.length} scheduled`} />
          <Tile title="Active Contracts" subtitle={`${contracts.length} in progress`} />
          <Tile title="Availability" subtitle="85% workforce available" />
        </div>

        <section className="lp-card">
          <div className="ui:flex ui:items-center ui:justify-between ui:mb-6">
            <h2 className="ui:text-xl ui:font-semibold">Talent Roster</h2>
          </div>
          <TalentList talents={filteredTalents} onEdit={() => { }} onMessage={() => { }} onBook={() => { }} />
        </section>

        <div className="ui:grid ui:gap-6 lg:ui:grid-cols-2">
          <section className="lp-card">
            <h2 className="ui:text-xl ui:font-semibold ui:mb-6">Upcoming Bookings</h2>
            <BookingCalendar bookings={bookings} />
          </section>

          <section className="lp-card">
            <h2 className="ui:text-xl ui:font-semibold ui:mb-6">Active Contracts</h2>
            <ContractList contracts={contracts} />
          </section>
        </div>

        <TalentForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTalent}
        />
      </div>
    );
  }

  // Talent Dashboard Views
  const currentTalent = mockTalents[0]; // In real app, get from auth
  const talentBookings = bookings.filter(b => b.talentId === currentTalent.id);
  const talentContracts = contracts.filter(c => c.talentId === currentTalent.id);

  if (viewMode === 'schedule') {
    return (
      <div>
        <Button variant="outline" onClick={() => setViewMode('talent-dashboard')} className="ui:mb-6">
          ← Back to Dashboard
        </Button>
        <TalentScheduleView bookings={talentBookings} />
      </div>
    );
  }

  if (viewMode === 'messages') {
    return (
      <div>
        <Button variant="outline" onClick={() => setViewMode('talent-dashboard')} className="ui:mb-6">
          ← Back to Dashboard
        </Button>
        <TalentMessages threads={mockThreads} />
      </div>
    );
  }

  if (viewMode === 'requirements') {
    return (
      <div>
        <Button variant="outline" onClick={() => setViewMode('talent-dashboard')} className="ui:mb-6">
          ← Back to Dashboard
        </Button>
        <TalentRequirements requirements={mockRequirements} />
      </div>
    );
  }

  // Talent Dashboard (default)
  return (
    <div>
      <div className="ui:flex ui:justify-end ui:mb-4">
        <Button variant="outline" onClick={() => setUserRole('manager')}>
          Switch to Manager View
        </Button>
      </div>
      <TalentDashboard
        profile={currentTalent}
        upcomingBookings={talentBookings}
        activeContracts={talentContracts}
        unreadMessages={1}
        onEditProfile={() => setIsModalOpen(true)}
        onViewSchedule={() => setViewMode('schedule')}
        onEditRequirements={() => setViewMode('requirements')}
      />
    </div>
  );
}

export default function Home() {
  return (
    <SearchProvider>
      <HomeContent />
    </SearchProvider>
  );
}

