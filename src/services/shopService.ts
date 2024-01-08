import { initializeMySQLDataSource } from '../../lib/mysql-connection';
import { Shop } from '../entities/Shop';

export const isShopPrivateKeyValid = async (privateKey: string): Promise<Boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const MySQLDataSource = await initializeMySQLDataSource();

            // Verificar la conexión a la base de datos
            if (!MySQLDataSource.isConnected) {
                reject("Database connection not established");
                return;
            }
            const shopRepository = MySQLDataSource.getRepository(Shop);
            const shopPrivateKey = await shopRepository.findOne({ where: { privateKey } });

            resolve(shopPrivateKey ? true : false); // Si existe el token, resuelve la promesa con true, de lo contrario, con false
        } catch (error) {
            console.error("Error finding shop:", error);
            // Rechaza la promesa con el error
            reject(error);
        }
    });
};

