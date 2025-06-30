import { ICalculateInterestStrategy } from "../interfaces/ICalculateInterestStrategy";

class StudentInterestStrategy implements ICalculateInterestStrategy {
    calculateInterest(days: number,balance: number): number {
        if (days < 366) {
            return (balance * 0.03) / 12;
        }
        return 0;
    }
}

export default StudentInterestStrategy;