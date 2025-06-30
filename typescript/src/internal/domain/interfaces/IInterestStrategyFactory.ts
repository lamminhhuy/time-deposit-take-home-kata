import { ICalculateInterestStrategy } from "./ICalculateInterestStrategy";

export interface IInterestStrategyFactory {
    createStrategy(planType: string): ICalculateInterestStrategy;
}