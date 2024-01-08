import { closeMySQLDataSource } from '../../../lib/mysql-connection';
import { login } from '../../services/userService';
import dotenv from 'dotenv';
dotenv.config();
describe('Login Function', () => {
    // Mocking the MySQL connection and User repository of typeorm
    jest.mock('../../../lib/mysql-connection.ts', () => ({
        initializeMySQLDataSource: jest.fn(() => ({
            isConnected: true,
            getRepository: jest.fn(() => ({
                createQueryBuilder: jest.fn(() => ({
                    leftJoinAndSelect: jest.fn(() => ({
                        where: jest.fn().mockReturnThis(),
                        getOne: jest.fn(),
                    })),
                })),
            })),
        })),
        closeMySQLDataSource: jest.fn(),
    }));

    afterAll(async () => {
        await closeMySQLDataSource();
    });

    it('should successfully login with valid credentials', async () => {
        const user = await login(process.env.SHOP_USERNAME!, process.env.SHOP_PASSWORD!);
        expect(user).toBeDefined();
    });

    it('should reject with "Contrasena invalida" for invalid password', async () => {
        await expect(login(process.env.SHOP_USERNAME!, 'cubosderubik13')).rejects.toEqual('Contrasena invalida');
    });

    it('should reject with "Usuario no encontrado" for non-existing user', async () => {
        await expect(login('nonExistingUser', 'password')).rejects.toEqual('Usuario no encontrado');
    });
});