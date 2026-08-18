export type ReleaseFormStatus = "signed" | "action_needed";

export interface PickupContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  authorized: boolean;
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  householdIncomeBracket: string;
  volunteerInterest: "yes" | "maybe" | "no" | "";
}

export interface Child {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  grade: number;
  allergies: string;
  specialInstructions: string;
  authorizedPickupContacts: PickupContact[];
  releaseFormStatus: ReleaseFormStatus;
  releaseSignedOn?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  location: string;
  schedule: string;
  startDate: string;
  endDate: string;
  minAge: number;
  maxAge: number;
  minGrade: number;
  maxGrade: number;
  price: number;
  capacity: number;
  availableSpots: number;
  financialAidEligible: boolean;
  processingFee: number;
  isFreeProgram: boolean;
}

export type EnrollmentStatus = "enrolled" | "pending" | "waitlist";

export interface Enrollment {
  id: string;
  childId: string;
  programId: string;
  status: EnrollmentStatus;
  paymentStatus: "paid" | "due";
  tuition: number;
  financialAidAmount: number;
  processingFee: number;
  total: number;
}

export interface CartItem {
  id: string;
  childId: string;
  programId: string;
}

export type FinancialAidStatus = "none" | "submitted" | "approved" | "denied";

export interface AidDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "done" | "error";
  progress: number;
}

export interface FinancialAidApplication {
  id: string;
  parentId: string;
  householdIncome: string;
  householdSize: number;
  childrenParticipating: number;
  requestedAmount: number;
  approvedAmountPerProgram: number;
  explanation: string;
  status: FinancialAidStatus;
  documents: AidDocument[];
  submittedOn?: string;
}

export interface HouseholdCredit {
  id: string;
  parentId: string;
  amount: number;
  source: string;
  expirationDate: string;
  applied: boolean;
}

export interface PricedLine {
  item: CartItem;
  child: Child;
  program: Program;
  tuition: number;
  financialAid: number;
  processingFee: number;
  total: number;
}
