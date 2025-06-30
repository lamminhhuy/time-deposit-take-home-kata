import { PlanType } from "../internal/domain/const/planType";
import InterestStrategyFactory from "../internal/domain/factories/InterestStrategyFactory";
import { IBalanceUpdater } from "../internal/domain/interfaces/IBalanceUpdater";
import { ICalculateInterestStrategy } from "../internal/domain/interfaces/ICalculateInterestStrategy";
import DefaultBalanceUpdater from "../internal/domain/services/DefaultBalanceUpdater";
import TimeDepositCalculator from "../internal/domain/services/TimeDepositCalculator";
import { TimeDeposit } from "../internal/domain/entities/TimeDeposit.entity";


   describe("TimeDepositCalculator", () => {
     let interestStrategyFactory: InterestStrategyFactory;
     let balanceUpdater: IBalanceUpdater;
     let calculator: TimeDepositCalculator;

     beforeEach(() => {
       interestStrategyFactory = new InterestStrategyFactory();
       balanceUpdater = new DefaultBalanceUpdater();
       calculator = new TimeDepositCalculator(interestStrategyFactory, balanceUpdater);
     });

     test("should skip deposits with 30 or fewer days", () => {
       const timeDeposit = {
         days: 30,
         balance: 1000,
         planType: PlanType.BASIC,
       } as TimeDeposit;
       const deposits = [timeDeposit];
       const updateBalanceSpy = jest.spyOn(balanceUpdater, "updateBalance");

       calculator.updateBalance(deposits);

       expect(updateBalanceSpy).not.toHaveBeenCalled();
       expect(timeDeposit.balance).toBe(1000);
     });

     test("should calculate interest and update balance for BASIC plan type", () => {
       const timeDeposit = {
         days: 60,
         balance: 1000,
         planType: PlanType.BASIC,
       } as TimeDeposit;
       const deposits = [timeDeposit];
       const mockInterestStrategy = {
         calculateInterest: jest.fn().mockReturnValue(50),
       } as ICalculateInterestStrategy;
       jest
         .spyOn(interestStrategyFactory, "createStrategy")
         .mockReturnValue(mockInterestStrategy);
       const updateBalanceSpy = jest.spyOn(balanceUpdater, "updateBalance");

       calculator.updateBalance(deposits);

       expect(interestStrategyFactory.createStrategy).toHaveBeenCalledWith(
         PlanType.BASIC
       );
       expect(mockInterestStrategy.calculateInterest).toHaveBeenCalledWith(60, 1000);
       expect(updateBalanceSpy).toHaveBeenCalledWith(timeDeposit, 50);
     });

     test("should calculate interest and update balance for PREMIUM plan type", () => {
       const timeDeposit = {
         days: 90,
         balance: 2000,
         planType: PlanType.PREMIUM,
       } as TimeDeposit;
       const deposits = [timeDeposit];
       const mockInterestStrategy = {
         calculateInterest: jest.fn().mockReturnValue(100),
       } as ICalculateInterestStrategy;
       jest
         .spyOn(interestStrategyFactory, "createStrategy")
         .mockReturnValue(mockInterestStrategy);
       const updateBalanceSpy = jest.spyOn(balanceUpdater, "updateBalance");

       calculator.updateBalance(deposits);

       expect(interestStrategyFactory.createStrategy).toHaveBeenCalledWith(
         PlanType.PREMIUM
       );
       expect(mockInterestStrategy.calculateInterest).toHaveBeenCalledWith(90, 2000);
       expect(updateBalanceSpy).toHaveBeenCalledWith(timeDeposit, 100);
     });

     test("should calculate interest and update balance for STUDENT plan type", () => {
       const timeDeposit = {
         days: 45,
         balance: 500,
         planType: PlanType.STUDENT,
       } as TimeDeposit;
       const deposits = [timeDeposit];
       const mockInterestStrategy = {
         calculateInterest: jest.fn().mockReturnValue(25),
       } as ICalculateInterestStrategy;
       jest
         .spyOn(interestStrategyFactory, "createStrategy")
         .mockReturnValue(mockInterestStrategy);
       const updateBalanceSpy = jest.spyOn(balanceUpdater, "updateBalance");

       calculator.updateBalance(deposits);

       expect(interestStrategyFactory.createStrategy).toHaveBeenCalledWith(
         PlanType.STUDENT
       );
       expect(mockInterestStrategy.calculateInterest).toHaveBeenCalledWith(45, 500);
       expect(updateBalanceSpy).toHaveBeenCalledWith(timeDeposit, 25);
     });

     test("should process multiple deposits with different plan types", () => {
       const deposits: TimeDeposit[] = [
         { id: 1, days: 60, balance: 1000, planType: PlanType.BASIC, withdrawals: [] },
         { id: 2, days: 90, balance: 2000, planType: PlanType.PREMIUM, withdrawals: [] },
         { id: 3, days: 15, balance: 500, planType: PlanType.STUDENT, withdrawals: [] },
       ];
       const mockBasicStrategy = {
         calculateInterest: jest.fn().mockReturnValue(50),
       } as ICalculateInterestStrategy;
       const mockPremiumStrategy = {
         calculateInterest: jest.fn().mockReturnValue(100),
       } as ICalculateInterestStrategy;
       jest
         .spyOn(interestStrategyFactory, "createStrategy")
         .mockImplementation((planType: string) => {
           if (planType === PlanType.BASIC) return mockBasicStrategy;
           if (planType === PlanType.PREMIUM) return mockPremiumStrategy;
           return {} as ICalculateInterestStrategy;
         });
       const updateBalanceSpy = jest.spyOn(balanceUpdater, "updateBalance");

       calculator.updateBalance(deposits);

       expect(mockBasicStrategy.calculateInterest).toHaveBeenCalledWith(60, 1000);
       expect(mockPremiumStrategy.calculateInterest).toHaveBeenCalledWith(90, 2000);
       expect(updateBalanceSpy).toHaveBeenCalledTimes(2);
       expect(updateBalanceSpy).toHaveBeenCalledWith(deposits[0], 50);
       expect(updateBalanceSpy).toHaveBeenCalledWith(deposits[1], 100);
       expect(updateBalanceSpy).not.toHaveBeenCalledWith(deposits[2], expect.any(Number));
     });
   });