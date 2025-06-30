import { DataSource } from 'typeorm';
import TimeDepositModel from '../postgres/models/TimeDeposits.model';
import { timeDepositData } from './data/timeDepositData';
import WithdrawalModel from '../postgres/models/Withdrawals.models';
import withdrawalData from './data/withDrawalData';

export async function seedTimeDeposits(dataSource: DataSource): Promise<void> {
 
  try {
    await dataSource.transaction(async (transactionalEntityManager) => {
      const existingDeposits = await transactionalEntityManager
        .createQueryBuilder(TimeDepositModel, 'deposit')
        .where('deposit.id IN (:...ids)', { ids: timeDepositData.map((d) => d.id) })
        .getMany();

      const existingIds = new Set(existingDeposits.map((d) => d.id));
      const newDeposits = timeDepositData.filter((d) => !existingIds.has(d.id));

      const timeDepositEntities = newDeposits.map((data) => {
        const entity = new TimeDepositModel();
        entity.id = data.id;
        entity.balance = data.balance;
        entity.days = data.days;
        entity.planType = data.planType;
        return entity;
      });

      await transactionalEntityManager.save(TimeDepositModel, timeDepositEntities);
      console.log(`Successfully seeded ${newDeposits.length} time deposits.`);
    });
  } catch (error) {
    console.error('Error seeding time deposits:', error);
    throw new Error(`Failed to seed time deposits: ${error}`);
  }
}

export async function seedWithdrawals(dataSource: DataSource): Promise<void> {
  try {
    await dataSource.transaction(async (transactionalEntityManager) => {
      const existingWithdrawals = await transactionalEntityManager
        .createQueryBuilder(WithdrawalModel, 'withdrawal')
        .where('withdrawal.id IN (:...ids)', { ids: withdrawalData.map((d) => d.id) })
        .getMany();

      const existingIds = new Set(existingWithdrawals.map((d) => d.id));
      const newWithdrawals = withdrawalData.filter((d) => !existingIds.has(d.id));

      const withdrawalEntities = newWithdrawals.map((data) => {
        const entity = new WithdrawalModel();
        entity.id = data.id;
        entity.amount = data.amount;
        entity.timeDepositId = data.timeDepositId;
        entity.date = data.date;
        return entity;
      });

      await transactionalEntityManager.save(WithdrawalModel, withdrawalEntities);
      console.log(`Successfully seeded ${newWithdrawals.length} withdrawals.`);
    });
  } catch (error) {
    console.error('Error seeding withdrawals:', error);
    throw new Error(`Failed to seed withdrawals: ${error}`);
  }
}

export async function runSeed(dataSource: DataSource): Promise<void> {
  try {
    await seedTimeDeposits(dataSource);
    await seedWithdrawals(dataSource);
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await dataSource.destroy();
  }
}