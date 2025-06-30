import { PlanType } from "@/internal/domain/const/planType";

export  const timeDepositData = [
  {
    id: 1,
    balance: 1000.0,
    days: 30,
    planType: PlanType.STUDENT,
  },
  {
    id: 2,
    balance: 5000.0,
    days: 90,
    planType: PlanType.PREMIUM,
  },
  {
    id: 3,
    balance: 2000.0,
    days: 180,
    planType: PlanType.BASIC,
  },
];