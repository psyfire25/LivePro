// Talent Management Types

export type TalentStatus = 'available' | 'booked' | 'unavailable';
export type ContractStatus = 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type MessageStatus = 'unread' | 'read';

export interface TalentProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    bio: string;
    photoUrl?: string;
    specialty: string;
    skills: string[];
    status: TalentStatus;
    hourlyRate?: number;
    availability: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
    portfolioLinks: string[];
    documents: {
        name: string;
        url: string;
        type: string;
    }[];
    createdAt: string;
    updatedAt: string;
}

export interface Contract {
    id: string;
    talentId: string;
    talentName: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    terms: string;
    paymentAmount: number;
    paymentSchedule: string;
    status: ContractStatus;
    signedByTalent: boolean;
    signedByManager: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    id: string;
    talentId: string;
    talentName: string;
    eventName: string;
    eventLocation: string;
    startDateTime: string;
    endDateTime: string;
    description: string;
    requirements: string;
    status: BookingStatus;
    contractId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    fromUserId: string;
    fromUserName: string;
    toUserId: string;
    toUserName: string;
    subject: string;
    body: string;
    status: MessageStatus;
    threadId: string;
    createdAt: string;
    readAt?: string;
}

export interface MessageThread {
    id: string;
    participants: {
        id: string;
        name: string;
        role: 'manager' | 'talent';
    }[];
    subject: string;
    messages: Message[];
    lastMessageAt: string;
    unreadCount: number;
}

export interface Requirement {
    id: string;
    talentId: string;
    category: 'technical' | 'rider' | 'travel' | 'accommodation' | 'other';
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

export interface TalentRequirements {
    talentId: string;
    technical: Requirement[];
    rider: Requirement[];
    travel: Requirement[];
    accommodation: Requirement[];
    other: Requirement[];
}
