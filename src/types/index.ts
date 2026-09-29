export type UserRole = 'enterprise' | 'expert' | 'both' | 'operator';

export type ActivePerspective = 'enterprise' | 'expert' | 'operator';

export type VerificationType = 
  | 'email_phone'
  | 'identity_cccd'
  | 'cpa_cert'
  | 'lawyer_cert'
  | 'tax_cert'
  | 'business_license';

export interface VerificationCheck {
  id: string;
  type: VerificationType;
  title: string;
  verifiedDate: string;
  expiryDate?: string;
  certNumber?: string;
  meaning: string;
  disclaimer: string;
  status: 'verified' | 'pending' | 'rejected';
}

export interface ExpertProfile {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  headline: string;
  yearsExperience: number;
  consultingHours: number;
  b2bRating: number;
  completedProjects: number;
  location: string;
  responseSpeed: string;
  workMode: 'Hybrid' | 'Online 100%' | 'Onsite' | 'Linh hoạt (Hybrid / Online)';
  philosophy: string;
  categories: string[];
  verifications: VerificationCheck[];
  services: {
    title: string;
    description: string;
  }[];
  ndaCommitment: boolean;
  trustScore: string;
  trustNote: string;
  isBookmarked?: boolean;
}

export interface EnterpriseDemand {
  id: string;
  title: string;
  enterpriseName: string;
  isAnonymous: boolean;
  industry: string;
  companySize?: string;
  isVerifiedEnterprise: boolean;
  taxId?: string;
  location: string;
  description: string;
  category: string;
  workMode: string;
  budgetRange: string;
  budgetType: string;
  timeline: string;
  proposalCount: number;
  maxProposals: number;
  imageUrl?: string;
  imageAlt?: string;
  requirementsBadge?: string;
  postedAgo: string;
  createdAt: string;
}

export type ConnectionStatus = 
  | 'SENT'
  | 'ACCEPTED'
  | 'CONTACT_PENDING'
  | 'CONNECTED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'BLOCKED';

export interface ConnectionRequest {
  id: string;
  senderRole: 'enterprise' | 'expert';
  senderName: string;
  senderAvatar: string;
  senderTitle?: string;
  receiverRole: 'enterprise' | 'expert';
  receiverName: string;
  receiverAvatar: string;
  demandTitle?: string;
  message: string;
  topics?: string[];
  status: ConnectionStatus;
  sentAt: string;
  expiresInDays?: number;
  // Two-step consent flags
  senderConsentShared: boolean;
  receiverConsentShared: boolean;
  contactDetails?: {
    email: string;
    phone: string;
    directName: string;
    position: string;
  };
}

export interface MembershipPlan {
  id: 'free' | 'enterprise_plus' | 'expert_pro';
  name: string;
  targetRole: 'enterprise' | 'expert';
  priceMonthly: number;
  invitesPerMonth: number;
  invitesUsed: number;
  resetDays: number;
  features: string[];
}
