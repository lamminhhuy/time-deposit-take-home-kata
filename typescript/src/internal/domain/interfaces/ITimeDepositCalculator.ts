import { TimeDeposit } from "../entities/TimeDeposit.entity";
export const ITimeDepositCalculator = Symbol('ITimeDepositCalculator');
export interface ITimeDepositCalculator {
    updateBalance(xs: TimeDeposit[]): void;
}