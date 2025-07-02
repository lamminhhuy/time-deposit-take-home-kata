import { IUpdateTimeDepositBalancesUseCase } from "../interfaces/IUpdateTimeDepositBalancesUseCase";
import ITimeDepositRepository from "../../domain/interfaces/ITimeDepositRepository";
import { TimeDeposit } from "../../domain/entities/TimeDeposit.entity";
import { ITimeDepositCalculator } from "../../domain/interfaces/ITimeDepositCalculator";
import { inject } from "tsyringe";
import { injectable } from "tsyringe";

@injectable()
class UpdateTimeDepositBalancesUseCase implements IUpdateTimeDepositBalancesUseCase {
    constructor( private timeDepositCalculator: ITimeDepositCalculator, 
    @inject('ITimeDepositRepository') private readonly timeDepositRepository: ITimeDepositRepository) {}

  async execute(): Promise<TimeDeposit[]> {
        const timeDeposits = await this.timeDepositRepository.getAllTimeDeposit();
       this.timeDepositCalculator.updateBalance(timeDeposits);
        return this.timeDepositRepository.updateBalance(timeDeposits);
    }
}

export default UpdateTimeDepositBalancesUseCase;
