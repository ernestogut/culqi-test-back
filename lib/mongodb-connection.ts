import "reflect-metadata";
import { DataSource, Connection } from "typeorm";
import { CardToken } from "../src/entities/CardToken";
import dotenv from "dotenv";

dotenv.config();

async function initializeAppDataSource(): Promise<Connection> {
    try {
        const AppDataSource = new DataSource({
            type: "mongodb",
            url: process.env.MONGODB_URI,
            useNewUrlParser: true,
            synchronize: false,
            logging: false,
            entities: [CardToken],
        });

        const connection = await AppDataSource.initialize();
        return connection;
    } catch (error) {
        throw error;
    }
}

export { initializeAppDataSource };