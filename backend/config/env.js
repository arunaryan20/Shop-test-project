require("dotenv").config();

const env={
    DATABASE_URL:process.env.DATABASE_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    API_PORT:process.env.API_PORT,
    CLIENT_URL:process.env.CLIENT_URL,
    NODE_ENV:process.env.NODE_ENV
}

module.exports=env;