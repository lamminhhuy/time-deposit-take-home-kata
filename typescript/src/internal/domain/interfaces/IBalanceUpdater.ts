import { TimeDeposit } from "../entities/TimeDeposit.entity";

export interface IBalanceUpdater {
    updateBalance(timeDeposit: TimeDeposit, interest: number): void;
  }