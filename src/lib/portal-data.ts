import type {
  Child,
  Enrollment,
  FinancialAidApplication,
  HouseholdCredit,
  Parent,
  Program,
} from "./portal-types";

export const sampleParent: Parent = {
  id: "p_1",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@example.com",
  phone: "(312) 555-0148",
  address: "1841 W Berteau Ave",
  city: "Chicago",
  state: "IL",
  zip: "60613",
  householdIncomeBracket: "$50,000–$74,999",
  volunteerInterest: "maybe",
};

export const sampleChildren: Child[] = [
  {
    id: "c_alex",
    parentId: "p_1",
    firstName: "Alex",
    lastName: "Johnson",
    birthdate: "2017-03-14",
    grade: 4,
    allergies: "Peanuts (carries EpiPen)",
    specialInstructions: "Needs a short break after warm-ups.",
    authorizedPickupContacts: [
      {
        id: "pc_1",
        name: "Marcus Johnson",
        relationship: "Father",
        phone: "(312) 555-0192",
        authorized: true,
      },
    ],
    releaseFormStatus: "signed",
    releaseSignedOn: "2026-07-02",
  },
  {
    id: "c_emma",
    parentId: "p_1",
    firstName: "Emma",
    lastName: "Johnson",
    birthdate: "2019-09-02",
    grade: 2,
    allergies: "",
    specialInstructions: "Prefers to partner with her sibling for warm-ups.",
    authorizedPickupContacts: [],
    releaseFormStatus: "action_needed",
  },
];

export const samplePrograms: Program[] = [
  {
    id: "prg_decatur",
    name: "Fall 2026 Decatur After School Circus",
    description:
      "A twelve-week after school residency covering juggling, acrobatics, and partner balancing, ending in a family showcase.",
    location: "Decatur",
    schedule: "Tuesdays · 4:00–5:30 PM",
    startDate: "2026-09-08",
    endDate: "2026-11-24",
    minAge: 8,
    maxAge: 12,
    minGrade: 3,
    maxGrade: 7,
    price: 150,
    capacity: 24,
    availableSpots: 12,
    financialAidEligible: true,
    processingFee: 25,
    isFreeProgram: false,
  },
  {
    id: "prg_homework",
    name: "HomeWork CircusWork",
    description:
      "Free homework help paired with circus skills coaching. Snacks provided, no tuition, and no processing fee — ever.",
    location: "Uptown Studio",
    schedule: "Mondays & Wednesdays · 3:30–6:00 PM",
    startDate: "2026-09-07",
    endDate: "2026-12-16",
    minAge: 6,
    maxAge: 14,
    minGrade: 1,
    maxGrade: 8,
    price: 0,
    capacity: 30,
    availableSpots: 9,
    financialAidEligible: false,
    processingFee: 0,
    isFreeProgram: true,
  },
  {
    id: "prg_littletop",
    name: "Little Top Beginners Circus",
    description:
      "A gentle introduction to circus arts for our youngest performers: balance, tumbling, scarves, and lots of play.",
    location: "Rogers Park",
    schedule: "Saturdays · 9:30–10:45 AM",
    startDate: "2026-09-12",
    endDate: "2026-11-21",
    minAge: 5,
    maxAge: 8,
    minGrade: 0,
    maxGrade: 3,
    price: 120,
    capacity: 18,
    availableSpots: 3,
    financialAidEligible: true,
    processingFee: 25,
    isFreeProgram: false,
  },
  {
    id: "prg_aerial",
    name: "Youth Aerial Silks Intensive",
    description:
      "For experienced students ready for aerial conditioning, climbs, and choreography with our professional coaching team.",
    location: "West Loop Big Top",
    schedule: "Thursdays · 5:30–7:00 PM",
    startDate: "2026-09-10",
    endDate: "2026-12-10",
    minAge: 10,
    maxAge: 16,
    minGrade: 5,
    maxGrade: 11,
    price: 210,
    capacity: 16,
    availableSpots: 0,
    financialAidEligible: true,
    processingFee: 25,
    isFreeProgram: false,
  },
  {
    id: "prg_unicycle",
    name: "Unicycle & Juggling Club",
    description:
      "Weekly skill-building club for jugglers and unicyclists of all levels, with equipment provided on site.",
    location: "Decatur",
    schedule: "Fridays · 4:30–6:00 PM",
    startDate: "2026-09-11",
    endDate: "2026-12-11",
    minAge: 7,
    maxAge: 13,
    minGrade: 2,
    maxGrade: 8,
    price: 95,
    capacity: 20,
    availableSpots: 14,
    financialAidEligible: true,
    processingFee: 25,
    isFreeProgram: false,
  },
];

export const sampleEnrollments: Enrollment[] = [
  {
    id: "enr_1",
    childId: "c_alex",
    programId: "prg_decatur",
    status: "enrolled",
    paymentStatus: "paid",
    tuition: 150,
    financialAidAmount: 100,
    processingFee: 25,
    total: 75,
  },
  {
    id: "enr_2",
    childId: "c_alex",
    programId: "prg_homework",
    status: "pending",
    paymentStatus: "due",
    tuition: 0,
    financialAidAmount: 0,
    processingFee: 0,
    total: 0,
  },
];

export const sampleAid: FinancialAidApplication = {
  id: "fa_1",
  parentId: "p_1",
  householdIncome: "$50,000–$74,999",
  householdSize: 4,
  childrenParticipating: 2,
  requestedAmount: 100,
  approvedAmountPerProgram: 100,
  explanation: "Reduced hours at work this year; we would love to keep both kids in circus.",
  status: "approved",
  documents: [],
  submittedOn: "2026-07-10",
};

export const sampleCredit: HouseholdCredit = {
  id: "hc_1",
  parentId: "p_1",
  amount: 15,
  source: "Credit from a previous cancellation",
  expirationDate: "2027-06-30",
  applied: false,
};

export const incomeBrackets = [
  "Under $25,000",
  "$25,000–$49,999",
  "$50,000–$74,999",
  "$75,000–$99,999",
  "$100,000–$149,999",
  "$150,000+",
  "Prefer not to say",
];

export const gradeLabel = (grade: number) => (grade === 0 ? "Kindergarten" : `Grade ${grade}`);

export const ageFromBirthdate = (birthdate: string, today = new Date("2026-08-18")) => {
  const dob = new Date(birthdate);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
