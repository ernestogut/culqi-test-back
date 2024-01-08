import "reflect-metadata";
import { DataSource, Connection } from "typeorm";
import { User } from "../src/entities/User";
import { Shop } from "../src/entities/Shop";
import dotenv from "dotenv";

dotenv.config();
let connection: Connection | null = null;
async function initializeMySQLDataSource(): Promise<Connection> {
    try {
        const MysqlDataSource = new DataSource({
            type: "mysql",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [User, Shop],
            synchronize: true,
            logging: false
        });

        connection = await MysqlDataSource.initialize();
        return connection;
    } catch (error) {
        throw error;
    }
}

const closeMySQLDataSource = async (): Promise<void> => {
    if (connection && connection.isConnected) {
        await connection.close();
    }
};

export { initializeMySQLDataSource, closeMySQLDataSource };