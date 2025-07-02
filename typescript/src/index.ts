import express from 'express';
import { env } from './internal/infrastructure/config/env';
import { logger } from './internal/infrastructure/logger/logger';
import { pgDbInstance } from './internal/infrastructure/db/postgres/connection';
import { runSeed } from './internal/infrastructure/db/seeds/TimeDepositSeed';

const app = express();

async function bootstrap() {
  try {
    logger.info('Initializing database...');
    await pgDbInstance.initialize();
    logger.info('Database initialized.');

    logger.info('Running seed...');
    await runSeed(await pgDbInstance.getDataSource());
    logger.info('Seed completed.');

    logger.info('Setting up container...');
    const { default: setupContainer } = await import('./internal/infrastructure/container/container');
    await setupContainer();
    logger.info('Container setup completed.');

    logger.info('Loading routes...');
    const { default: routes } = await import('./internal/infrastructure/routes');
    app.use(routes);
    logger.info('Routes loaded.');

    const port = env.APP_PORT || 5001;
    const host = env.APP_HOST || 'localhost';
    const server = app.listen(port, host, () => {
      logger.info(`Server (${env.NODE_ENV}) running on http://${host}:${port}`);
    });

    const onCloseSignal = () => {
      logger.info('SIGINT or SIGTERM received, shutting down...');
      server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
      });
      setTimeout(() => {
        logger.error('Server shutdown timed out, forcing exit.');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);

  } catch (error) {
    logger.error('Failed to bootstrap application:', error as Error);
    process.exit(1);
  }
}

bootstrap();