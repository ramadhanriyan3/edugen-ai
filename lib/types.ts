// =========================
// User & Auth Models
// =========================
export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  phoneNumber: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  accounts?: AccountType[];
  sessions?: SessionType[];
  exams?: ExamType[];
  organizations?: OrganizationType[];
  orgInvitations?: OrgInvitationType[];
  worksheets?: WorksheetType[];
}

export interface AccountType {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  user?: UserType;
}

export interface SessionType {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  user?: UserType;
}

export interface VerificationTokenType {
  id: string;
  identifier: string;
  token: string;
  expires: string;
}

// =========================
// Exam & Question Models
// =========================
export interface ExamType {
  id: string;
  userId: string;
  title: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  user?: UserType;
  questions?: QuestionType[];
}

export interface QuestionType {
  id: string;
  examId: string;
  content: string;
  createdAt: string | number | Date;
  exam?: ExamType;
}

// =========================
// News Model
// =========================
export interface NewsType {
  id: string;
  title: string;
  content: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
}

// =========================
// Organization & Members
// =========================
export type MemberRoleType = "owner" | "member";

export interface OrganizationType {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  organizationMembers?: OrganizationMemberType[];
  orgInvitations?: OrgInvitationType[];
  worksheets?: WorksheetType[];
  owners?: UserType;
}

export interface OrganizationMemberType {
  id: string;
  userId: string;
  orgId: string;
  role: MemberRoleType;

  organization?: OrganizationType;
}

// =========================
// Invitation
// =========================
export type InvitationStatusType =
  | "pending"
  | "expired"
  | "accepted"
  | "rejected";

export interface OrgInvitationType {
  id: string;
  ownerId: string;
  orgId: string;
  status: InvitationStatusType;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  organization?: OrganizationType;
  owners?: UserType;
}

// =========================
// Worksheet
// =========================
export interface WorksheetType {
  id: string;
  title: string;
  ownerId: string;
  orgId: string;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;

  owners?: UserType;
  organization?: OrganizationType;
}
