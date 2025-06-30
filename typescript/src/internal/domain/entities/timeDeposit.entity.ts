import { Withdrawal } from "./WithDrawal.entity"

export class TimeDeposit {
    public id: number
    public planType: string
    public balance: number
    public days: number
    public withdrawals: Withdrawal[]
    constructor(id: number, planType: string, balance: number, days: number, withdrawals: Withdrawal[]) {
      this.id = id
      this.planType = planType;
      this.balance = balance;
      this.days = days,
      this.withdrawals = withdrawals
    }
  }
  