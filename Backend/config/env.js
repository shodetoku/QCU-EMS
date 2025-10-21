import { config } from 'dotenv'

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const { 
    PORT, 
    NODE_ENV,
    LIBRARY_DB_URI,
    ENROLLMENT_DB_URI,
    LEARNING_DB_URI,
    SERVICES_DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env