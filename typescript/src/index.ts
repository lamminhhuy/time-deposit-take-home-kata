// import { TimeDeposit } from './TimeDeposit'
// import { TimeDepositCalculator } from './TimeDepositCalculator'

// const calc = new TimeDepositCalculator()
// const plans: TimeDeposit[] = [new TimeDeposit('basic', 1234567.0, 45)]
// const interest = calc.updateBalance(plans)
// console.log({ interest })

import { env } from "./internal/infrastructure/config/env";
import { logger } from "./internal/infrastructure/logger/logger";
import express from "express";
import { initializeDatabase } from "./internal/infrastructure/db/postgres/connection";
import routes from "./internal/adapters/routes";
import setupContainer from "./internal/infrastructure/container/container";
const app = express();

initializeDatabase();
setupContainer();

app.use(express.json());
app.use(routes)

const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
  const { NODE_ENV, APP_HOST, APP_PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${APP_HOST}:${APP_PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
