import { TimeDeposit } from "../entities/TimeDeposit.entity";
import { IBalanceUpdater } from "../interfaces/IBalanceUpdater";

class DefaultBalanceUpdater implements IBalanceUpdater {
    public updateBalance(timeDeposit: TimeDeposit, interest: number): void {
      const roundedInterest = Math.round((interest + Number.EPSILON) * 100) / 100;
      timeDeposit.balance = Number(
        (parseFloat(String(timeDeposit.balance) + parseFloat(String(roundedInterest))).toFixed(2))
      );
    }
  }

  export default DefaultBalanceUpdater;