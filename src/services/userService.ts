import { User } from '../entities/User';
import { initializeMySQLDataSource } from '../../lib/mysql-connection';

export const login = async (username: string, password: string): Promise<User | null> => {

    return new Promise(async (resolve, reject) => {
        try {
            const MySQLDataSource = await initializeMySQLDataSource();

            // Verificar la conexión a la base de datos
            if (!MySQLDataSource.isConnected) {
                reject("Database connection not established");
                return;
            }

            const userRepository = MySQLDataSource.getRepository(User);
            const user = await userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.shop', 'shop') // Cargar la tienda asociada
                .where('user.username = :username', { username })
                .getOne();
            if (user) {
                const isPasswordValid = password === user.password;
                if (isPasswordValid) {
                    resolve(user);
                } else {
                    reject('Contrasena invalida');
                }
            } else {
                reject('Usuario no encontrado');
            }
        } catch (error) {
            // Rechaza la promesa con el error
            reject(error);
        }
    });
}
