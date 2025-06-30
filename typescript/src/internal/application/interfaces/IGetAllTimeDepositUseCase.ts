import { TimeDeposit } from "../../domain/entities/TimeDeposit.entity";

export interface IGetAllTimeDepositUseCase {
    execute(): Promise<TimeDeposit[]>;
}