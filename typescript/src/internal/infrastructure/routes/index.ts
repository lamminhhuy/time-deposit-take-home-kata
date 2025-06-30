import express from "express";
import { container } from "tsyringe";
import TimeDepositController from "../controllers/TimeDepositController";

const routes = express.Router();
const timeDepositController = container.resolve(TimeDepositController);
routes.get('/time-deposit', timeDepositController.getAllTimeDeposit.bind(timeDepositController));
routes.put('/time-deposit/balance', timeDepositController.updateBalance.bind(timeDepositController));

export default routes;
