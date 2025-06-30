import InterestStrategyFactory from "../../domain/factories/InterestStrategyFactory";
import { container } from "tsyringe";
import TimeDepositRepository from "../repositories/TimeDepositRepository";
import GetAllTimeDepositUseCase from "../../application/usecases/GetAllTimeDeposit";
import UpdateTimeDepositBalancesUseCase from "../../application/usecases/UpdateTimeDepositBalances";
import { pgDbInstance } from "../db/postgres/connection";
import TimeDepositCalculator from "../../domain/services/TimeDepositCalculator";
import DefaultBalanceUpdater from "../../domain/services/DefaultBalanceUpdater";

 async function setupContainer() {
    const dataSource = await pgDbInstance.getDataSource();
    const manager = dataSource.manager;
   container.register(InterestStrategyFactory, { useClass: InterestStrategyFactory })
   container.register('ITimeDepositRepository', { useValue: new TimeDepositRepository(manager)})
   container.register('IGetAllTimeDepositUseCase', { useClass: GetAllTimeDepositUseCase })
   container.register('IUpdateTimeDepositBalancesUseCase', { useValue: new UpdateTimeDepositBalancesUseCase( new TimeDepositCalculator(
   new InterestStrategyFactory(),
   new DefaultBalanceUpdater()
   ),
     container.resolve('ITimeDepositRepository')) })
}

export default setupContainer;
