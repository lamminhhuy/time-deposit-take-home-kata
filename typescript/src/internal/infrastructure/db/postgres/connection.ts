import { DataSource } from 'typeorm';
import { env } from '../../config/env';
import WithdrawalModel from './models/Withdrawals.models';
import TimeDepositModel from './models/TimeDeposits.model';

class PostgresDatabase {
  private static instance: PostgresDatabase;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      entities: [TimeDepositModel, WithdrawalModel],
      synchronize: true,
      logging: env.isDev,
      migrations: env.isDev ? ['src/infrastructure/db/postgres/migration/*.ts'] : ['dist/infrastructure/db/postgres/migration/*.cjs'],
      poolSize: env.POSTGRES_MAX_POOL_SIZE || 10,
      ssl: false,
    });
  }

  public static getInstance(): PostgresDatabase {
    if (!PostgresDatabase.instance) {
      PostgresDatabase.instance = new PostgresDatabase();
    }
    return PostgresDatabase.instance;
  }

  public async initialize(retries = 3, delay = 1000): Promise<void> {
    if (this.dataSource.isInitialized) {
      return;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.dataSource.initialize();
        console.log('Database connection initialized successfully');
        return;
      } catch (error) {
        console.error(`Attempt ${attempt} to initialize database failed: ${error}`);
        console.error(this.dataSource);
        if (attempt === retries) {
          throw new Error(`Failed to initialize database after ${retries} attempts: ${error}`);
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.dataSource.isInitialized) {
        await this.dataSource.destroy();
        console.log('Database connection closed');
      }
    } catch (error) {
      console.error('Error closing database:', error);
      throw error;
    }
  }

  public async getDataSource(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.initialize();
    }
    return this.dataSource;
  }
}

export const pgDbInstance = PostgresDatabase.getInstance();