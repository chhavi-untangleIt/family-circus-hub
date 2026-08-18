import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  ageFromBirthdate,
  sampleAid,
  sampleChildren,
  sampleCredit,
  sampleEnrollments,
  sampleParent,
  samplePrograms,
} from "./portal-data";
import type {
  AidDocument,
  CartItem,
  Child,
  Enrollment,
  FinancialAidApplication,
  HouseholdCredit,
  Parent,
  PricedLine,
  Program,
} from "./portal-types";

const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export type EligibilityResult =
  | { ok: true }
  | { ok: false; reason: "release" | "age" | "grade" | "capacity" | "duplicate"; message: string };

interface PortalContextValue {
  parent: Parent;
  updateParent: (patch: Partial<Parent>) => void;
  children: Child[];
  addChild: (child: Omit<Child, "id" | "parentId" | "releaseFormStatus">) => Child;
  updateChild: (id: string, patch: Partial<Child>) => void;
  removeChild: (id: string) => void;
  signRelease: (childId: string) => void;
  programs: Program[];
  enrollments: Enrollment[];
  cart: CartItem[];
  addToCart: (childId: string, programId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  aid: FinancialAidApplication;
  submitAid: (patch: Partial<FinancialAidApplication>) => void;
  setAidDocuments: (updater: (docs: AidDocument[]) => AidDocument[]) => void;
  credit: HouseholdCredit;
  toggleCredit: (applied: boolean) => void;
  pricedLines: PricedLine[];
  totals: {
    subtotal: number;
    financialAid: number;
    processingFees: number;
    creditApplied: number;
    total: number;
  };
  childrenNeedingRelease: Child[];
  checkEligibility: (childId: string, programId: string) => EligibilityResult;
  eligiblePrograms: (childId: string) => Program[];
  completeCheckout: () => void;
  lastOrder: { lines: PricedLine[]; total: number } | null;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children: node }: { children: ReactNode }) {
  const [parent, setParent] = useState<Parent>(sampleParent);
  const [kids, setKids] = useState<Child[]>(sampleChildren);
  const [programs, setPrograms] = useState<Program[]>(samplePrograms);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(sampleEnrollments);
  const [cart, setCart] = useState<CartItem[]>([
    { id: "ci_1", childId: "c_alex", programId: "prg_decatur" },
    { id: "ci_2", childId: "c_emma", programId: "prg_homework" },
  ]);
  const [aid, setAid] = useState<FinancialAidApplication>(sampleAid);
  const [credit, setCredit] = useState<HouseholdCredit>(sampleCredit);
  const [lastOrder, setLastOrder] = useState<{ lines: PricedLine[]; total: number } | null>(null);

  const updateParent = useCallback((patch: Partial<Parent>) => {
    setParent((p) => ({ ...p, ...patch }));
  }, []);

  const addChild = useCallback(
    (child: Omit<Child, "id" | "parentId" | "releaseFormStatus">) => {
      const next: Child = {
        ...child,
        id: uid("c"),
        parentId: parent.id,
        releaseFormStatus: "action_needed",
      };
      setKids((prev) => [...prev, next]);
      return next;
    },
    [parent.id],
  );

  const updateChild = useCallback((id: string, patch: Partial<Child>) => {
    setKids((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }, []);

  const removeChild = useCallback((id: string) => {
    setKids((prev) => prev.filter((c) => c.id !== id));
    setCart((prev) => prev.filter((i) => i.childId !== id));
  }, []);

  const signRelease = useCallback((childId: string) => {
    setKids((prev) =>
      prev.map((c) =>
        c.id === childId
          ? { ...c, releaseFormStatus: "signed", releaseSignedOn: new Date().toISOString().slice(0, 10) }
          : c,
      ),
    );
  }, []);

  const checkEligibility = useCallback(
    (childId: string, programId: string): EligibilityResult => {
      const child = kids.find((c) => c.id === childId);
      const program = programs.find((p) => p.id === programId);
      if (!child || !program) return { ok: false, reason: "duplicate", message: "Selection is unavailable." };
      const age = ageFromBirthdate(child.birthdate);
      if (child.releaseFormStatus !== "signed") {
        return {
          ok: false,
          reason: "release",
          message: `${child.firstName} must have a completed General Release Form before enrolling in this program.`,
        };
      }
      if (age < program.minAge || age > program.maxAge) {
        return {
          ok: false,
          reason: "age",
          message: `${child.firstName} is ${age}; this program serves ages ${program.minAge}–${program.maxAge}.`,
        };
      }
      if (child.grade < program.minGrade || child.grade > program.maxGrade) {
        return {
          ok: false,
          reason: "grade",
          message: `${child.firstName}'s grade is outside this program's grade range.`,
        };
      }
      if (program.availableSpots <= 0) {
        return { ok: false, reason: "capacity", message: "This program is full — join the waitlist instead." };
      }
      const already =
        enrollments.some((e) => e.childId === childId && e.programId === programId) ||
        cart.some((i) => i.childId === childId && i.programId === programId);
      if (already) {
        return { ok: false, reason: "duplicate", message: `${child.firstName} is already signed up for this program.` };
      }
      return { ok: true };
    },
    [kids, programs, enrollments, cart],
  );

  const eligiblePrograms = useCallback(
    (childId: string) => {
      const child = kids.find((c) => c.id === childId);
      if (!child) return programs;
      const age = ageFromBirthdate(child.birthdate);
      return programs.filter(
        (p) =>
          age >= p.minAge && age <= p.maxAge && child.grade >= p.minGrade && child.grade <= p.maxGrade,
      );
    },
    [kids, programs],
  );

  const addToCart = useCallback((childId: string, programId: string) => {
    setCart((prev) => [...prev, { id: uid("ci"), childId, programId }]);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const submitAid = useCallback((patch: Partial<FinancialAidApplication>) => {
    setAid((a) => ({ ...a, ...patch }));
  }, []);

  const setAidDocuments = useCallback((updater: (docs: AidDocument[]) => AidDocument[]) => {
    setAid((a) => ({ ...a, documents: updater(a.documents) }));
  }, []);

  const toggleCredit = useCallback((applied: boolean) => {
    setCredit((c) => ({ ...c, applied }));
  }, []);

  const pricedLines = useMemo<PricedLine[]>(() => {
    return cart
      .map((item) => {
        const child = kids.find((c) => c.id === item.childId);
        const program = programs.find((p) => p.id === item.programId);
        if (!child || !program) return null;
        const tuition = program.price;
        const aidApproved = aid.status === "approved" && program.financialAidEligible && !program.isFreeProgram;
        const financialAid = aidApproved ? Math.min(aid.approvedAmountPerProgram, tuition) : 0;
        const processingFee = program.isFreeProgram ? 0 : aidApproved ? program.processingFee : 0;
        const total = Math.max(0, tuition - financialAid) + processingFee;
        return { item, child, program, tuition, financialAid, processingFee, total };
      })
      .filter(Boolean) as PricedLine[];
  }, [cart, kids, programs, aid]);

  const totals = useMemo(() => {
    const subtotal = pricedLines.reduce((s, l) => s + l.tuition, 0);
    const financialAid = pricedLines.reduce((s, l) => s + l.financialAid, 0);
    const processingFees = pricedLines.reduce((s, l) => s + l.processingFee, 0);
    const beforeCredit = Math.max(0, subtotal - financialAid + processingFees);
    const creditApplied = credit.applied ? Math.min(credit.amount, beforeCredit) : 0;
    return {
      subtotal,
      financialAid,
      processingFees,
      creditApplied,
      total: Math.max(0, beforeCredit - creditApplied),
    };
  }, [pricedLines, credit]);

  const childrenNeedingRelease = useMemo(
    () => kids.filter((c) => c.releaseFormStatus !== "signed"),
    [kids],
  );

  const completeCheckout = useCallback(() => {
    const lines = pricedLines;
    const total = totals.total;
    setEnrollments((prev) => [
      ...prev,
      ...lines.map((l) => ({
        id: uid("enr"),
        childId: l.child.id,
        programId: l.program.id,
        status: "enrolled" as const,
        paymentStatus: "paid" as const,
        tuition: l.tuition,
        financialAidAmount: l.financialAid,
        processingFee: l.processingFee,
        total: l.total,
      })),
    ]);
    setPrograms((prev) =>
      prev.map((p) => {
        const count = lines.filter((l) => l.program.id === p.id).length;
        return count ? { ...p, availableSpots: Math.max(0, p.availableSpots - count) } : p;
      }),
    );
    setLastOrder({ lines, total });
    setCart([]);
    setCredit((c) => ({ ...c, applied: false, amount: c.applied ? Math.max(0, c.amount - totals.creditApplied) : c.amount }));
  }, [pricedLines, totals]);

  const value: PortalContextValue = {
    parent,
    updateParent,
    children: kids,
    addChild,
    updateChild,
    removeChild,
    signRelease,
    programs,
    enrollments,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    aid,
    submitAid,
    setAidDocuments,
    credit,
    toggleCredit,
    pricedLines,
    totals,
    childrenNeedingRelease,
    checkEligibility,
    eligiblePrograms,
    completeCheckout,
    lastOrder,
  };

  return <PortalContext.Provider value={value}>{node}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}
