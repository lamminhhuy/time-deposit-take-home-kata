import { DataSource } from 'typeorm';
import TimeDepositModel from '../postgres/models/TimeDeposits.model';
import { timeDepositData } from './data/timeDepositData';

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

export async function runSeed(dataSource: DataSource): Promise<void> {
  try {
    await seedTimeDeposits(dataSource);
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await dataSource.destroy();
  }
}