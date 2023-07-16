import {config as configDotEnv} from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    configDotEnv()
}

export const config = {
    PORT: process.env.PORT,
    projectId: process.env.projectId,
    clientEmail: process.env.clientEmail,
    private_key: process.env.privateKey,
}