import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str({
        default: "dev"
    }),
    APP_HOST: str({
        default: "0.0.0.0"
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
        default: "huy_kata"
    }),
    POSTGRES_PASSWORD: str({
        default: "postgres"
    }),
    POSTGRES_DB: str({
        default: "huy_kata_db"
    }),
    POSTGRES_MAX_POOL_SIZE: num({
        default: 10
    }),
    POSTGRES_DB_SSL: str({
        default: "false"
    }),
})

