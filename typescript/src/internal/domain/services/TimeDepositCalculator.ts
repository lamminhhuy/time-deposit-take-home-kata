import { TimeDeposit } from "../entities/TimeDeposit.entity"
import { IInterestStrategyFactory } from "../interfaces/IInterestStrategyFactory";
import { ITimeDepositCalculator } from "../interfaces/ITimeDepositCalculator";
import { IBalanceUpdater } from "../interfaces/IBalanceUpdater";

class TimeDepositCalculator implements ITimeDepositCalculator {
    private readonly interestStrategyFactory: IInterestStrategyFactory;
    private readonly balanceUpdater: IBalanceUpdater;

    constructor(interestStrategyFactory: IInterestStrategyFactory, balanceUpdater: IBalanceUpdater) {
        this.interestStrategyFactory = interestStrategyFactory;
        this.balanceUpdater = balanceUpdater;
    }

    public updateBalance(xs: TimeDeposit[]) {
        for (const timeDeposit of xs) {
            if (timeDeposit.days <= 30) {
              continue;
            }
            const strategy = this.interestStrategyFactory.createStrategy(timeDeposit.planType);
            const interest = strategy.calculateInterest(timeDeposit.days,timeDeposit.balance);
            this.balanceUpdater.updateBalance(timeDeposit, interest);
        }
    };
}

export default TimeDepositCalculator;
