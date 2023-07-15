import {config as configDotEnv} from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    configDotEnv()
}

export const config = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
}