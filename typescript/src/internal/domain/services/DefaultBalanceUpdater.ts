import { TimeDeposit } from "../entities/TimeDeposit.entity";
import { IBalanceUpdater } from "../interfaces/IBalanceUpdater";

class DefaultBalanceUpdater implements IBalanceUpdater {
    public updateBalance(timeDeposit: TimeDeposit, interest: number): void {
      const roundedInterest = Math.round((interest + Number.EPSILON) * 100) / 100;
     const withdrawalAmount = this.processWithdrawals(timeDeposit);
     const balanceAfterWithdrawals = timeDeposit.balance - withdrawalAmount;
      timeDeposit.balance = parseFloat(String(balanceAfterWithdrawals)) + parseFloat(String(roundedInterest)) ;
      ;
    }
    private processWithdrawals(timeDeposit: TimeDeposit): number {
      if (!timeDeposit.withdrawals?.length) return 0;
      return timeDeposit.withdrawals.reduce((acc, withdrawal) => acc + withdrawal.amount, 0);
    }
  }

  export default DefaultBalanceUpdater;