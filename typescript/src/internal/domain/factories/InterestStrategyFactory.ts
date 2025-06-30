import { PlanType } from "../const/planType";
import BasicInterestStrategy from "../strategies/BasicInterestStrategy";
import PremiumInterestStrategy from "../strategies/PremiumInterestStrategy";
import StudentInterestStrategy from "../strategies/StudentInterestStrategy";
import { ICalculateInterestStrategy } from "../interfaces/ICalculateInterestStrategy";
import { IInterestStrategyFactory } from "../interfaces/IInterestStrategyFactory";


class InterestStrategyFactory implements IInterestStrategyFactory {

    private readonly  interestStrategyMapper: Record<string, ICalculateInterestStrategy> = {
        [PlanType.STUDENT]: new StudentInterestStrategy(),
        [PlanType.PREMIUM]: new PremiumInterestStrategy(),
        [PlanType.BASIC]: new BasicInterestStrategy(),
    }
    createStrategy(planType: string): ICalculateInterestStrategy {
        return this.interestStrategyMapper[planType];
    }
}

export default InterestStrategyFactory;
