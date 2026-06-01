const prisma = require("./config/db");

const dbConnectionTest = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection failed", err?.message);
    } finally {
        await prisma.$disconnect();
    }
};

dbConnectionTest();