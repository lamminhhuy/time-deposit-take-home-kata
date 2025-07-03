import { ICalculateInterestStrategy } from "../interfaces/ICalculateInterestStrategy";

class BasicInterestStrategy implements ICalculateInterestStrategy {
    calculateInterest(days: number,balance: number): number {
            return (balance * 0.01) / 12;
    }
}

export default BasicInterestStrategy;
