import { ICalculateInterestStrategy } from "../interfaces/ICalculateInterestStrategy";

class PremiumInterestStrategy implements ICalculateInterestStrategy {
    calculateInterest(days: number,balance: number): number {
        if (days < 366) {
            return (balance * 0.05) / 12;
        }
        return 0;
    }
}

export default PremiumInterestStrategy;