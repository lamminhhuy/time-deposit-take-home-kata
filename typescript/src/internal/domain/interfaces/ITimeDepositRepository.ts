import { TimeDeposit } from "../entities/TimeDeposit.entity";
export interface ITimeDepositRepository {
    getAllTimeDeposit(): Promise<TimeDeposit[]>;
    updateBalance(deposits: TimeDeposit[]): Promise<TimeDeposit[]>;
}
export default ITimeDepositRepository;