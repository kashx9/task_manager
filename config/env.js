import {config} from 'dotenv'

config({
    path:'.env.development.local'
})

export const{
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN
}=process.env