require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 3000,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'keep it secret!'
}