import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
    APP_HOST: str({
        default: "localhost"
    }),
    APP_PORT: num({
        default: 5001
    }),
    POSTGRES_HOST: str({
        default: "localhost"
    }),
    POSTGRES_PORT: num({
        default: 5432
    }),
    POSTGRES_USER: str({
        default: "postgres"
    }),
    POSTGRES_PASSWORD: str({
        default: "postgres"
    }),
    POSTGRES_DB: str({
        default: "postgres"
    }),
    POSTGRES_MAX_POOL_SIZE: num({
        default: 10
    }),
    POSTGRES_DB_SSL: str({
        default: "false"
    }),
    NODE_ENV: str({
        default: "development"
    })

});
