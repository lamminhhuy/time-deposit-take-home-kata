import { Request, Response } from "express";
import { inject } from "tsyringe";
import { SuccessResponse } from "../../shared/response/success";
import { IGetAllTimeDepositUseCase } from "../../application/interfaces/IGetAllTimeDepositUseCase";
import { IUpdateTimeDepositBalancesUseCase } from "../../application/interfaces/IUpdateTimeDepositBalancesUseCase";
import { injectable } from "tsyringe";

@injectable()
class TimeDepositController {
    constructor(
@inject('IGetAllTimeDepositUseCase') private readonly getAllTimeDepositUseCase: IGetAllTimeDepositUseCase,
@inject('IUpdateTimeDepositBalancesUseCase') private readonly updateBalanceUseCase: IUpdateTimeDepositBalancesUseCase) {     
 }
   async getAllTimeDeposit(req: Request, res: Response) {
           const timeDeposits = await this.getAllTimeDepositUseCase.execute();
           new SuccessResponse({
            message: 'Time deposits fetched successfully',
            data: timeDeposits,
           }).send(res);
    }

   async updateBalance(req: Request, res: Response) {
           const timeDeposits = await this.updateBalanceUseCase.execute();
           new SuccessResponse({
            message: 'Time deposits updated successfully',
            data: timeDeposits,
           }).send(res);
    }
}

export default TimeDepositController;