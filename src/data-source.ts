import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/src/entities/*.ts'],
    synchronize: false,
    logging: false,
    migrations: [__dirname + '/migrations/*.ts'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    migrationsTransactionMode: 'all',
};

const dataSource = new DataSource(options);
export default dataSource;