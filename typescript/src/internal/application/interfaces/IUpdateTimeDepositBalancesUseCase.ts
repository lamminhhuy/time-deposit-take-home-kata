import { TimeDeposit } from "@/TimeDeposit";

export interface IUpdateTimeDepositBalancesUseCase {
    execute(): Promise<TimeDeposit[]>;
}