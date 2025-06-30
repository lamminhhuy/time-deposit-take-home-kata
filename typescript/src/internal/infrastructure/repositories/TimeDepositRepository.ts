import { EntityManager, Repository, UpdateResult } from 'typeorm';
import TimeDepositModel from '../db/postgres/models/TimeDeposits.model';
import { TimeDeposit } from '../../domain/entities/TimeDeposit.entity';
import ITimeDepositRepository from '../../domain/interfaces/ITimeDepositRepository';
import { injectable } from 'tsyringe';
import { DataSource } from 'typeorm';

@injectable()
export class TimeDepositRepository extends Repository<TimeDepositModel> implements ITimeDepositRepository {
    constructor(manager: EntityManager) {
        super(TimeDepositModel, manager);
      }

  async getAllTimeDeposit(): Promise<TimeDeposit[]> {
    try {
      const models = await this.find();
      return models;
    } catch (error) {
      throw new Error(`Failed to fetch all time deposits: ${error}`);
    }
  }

  async updateBalance(deposits: TimeDeposit[]): Promise<TimeDeposit[]> {
    try {
      await Promise.all(
        deposits.map(deposit => {
          return this
            .createQueryBuilder()
            .update(TimeDepositModel)
            .set({ balance: deposit.balance })
            .where('id = :id', { id: deposit.id })
            .execute();
        })
      );
  
      return deposits;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to update balances: ${message}`);
    }
  }
  

  private toDomainEntity(model: TimeDepositModel): TimeDeposit {
    return new TimeDeposit(model.id, model.planType, model.balance, model.days);
  }

  private toDatabaseModel(entity: TimeDeposit): TimeDepositModel {
    const model = new TimeDepositModel();
    model.id = entity.id;
    model.planType = entity.planType;
    model.balance = entity.balance;
    model.days = entity.days;
    return model;
  }
}

export default TimeDepositRepository;