import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import dotenv from 'dotenv'
dotenv.config()
export class UserMigration1704571462816 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'shopId',
                        type: 'int',
                    },
                ],
            }),
            true
        );
        const username = process.env.SHOP_USERNAME ?? 'ernestogut';
        // user.password = await bcrypt.hash('123456', 10);
        const password = process.env.SHOP_PASSWORD ?? '123456';
        // Agrega registros a la tabla Users
        await queryRunner.query(`
      INSERT INTO users (username, password, shopId) VALUES ('${username}', '${password}', 1);
    `);

        // Agrega una clave foránea
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['shopId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Elimina la tabla Users
        await queryRunner.dropTable('users');
    }
}