import { TimeDeposit } from "../../domain/entities/TimeDeposit.entity";
import ITimeDepositRepository from "../../domain/interfaces/ITimeDepositRepository";
import { IGetAllTimeDepositUseCase } from "../interfaces/IGetAllTimeDepositUseCase";
import { inject } from "tsyringe";
import { injectable } from "tsyringe";

@injectable()
class GetAllTimeDepositUseCase implements IGetAllTimeDepositUseCase {
    constructor(@inject('ITimeDepositRepository') private readonly timeDepositRepository: ITimeDepositRepository) {}

    async execute(): Promise<TimeDeposit[]> {
        return this.timeDepositRepository.getAllTimeDeposit();
    }
}

export default GetAllTimeDepositUseCase;
