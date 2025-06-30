export interface ICalculateInterestStrategy {
    calculateInterest(days: number,balance: number): number;
}