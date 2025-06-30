import { ICalculateInterestStrategy } from "../interfaces/ICalculateInterestStrategy";

class BasicInterestStrategy implements ICalculateInterestStrategy {
    calculateInterest(days: number,balance: number): number {
        if (days < 366) {
            return (balance * 0.01) / 12;
        }
        return 0;
    }
}

export default BasicInterestStrategy;