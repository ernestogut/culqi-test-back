import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Token } from '../models/token';
export class ShopMigration1704571462805 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shops',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'shopName',
                        type: 'varchar',
                    },
                    {
                        name: 'privateKey',
                        type: 'varchar',
                    },
                ],
            }),
            true
        );
        const token = new Token();
        const generatedToken = 'pk_test_' + token.getToken();
        // Agrega registros a la tabla Shops
        await queryRunner.query(`
      INSERT INTO shops (shopName, privateKey) VALUES ('Tienda 1', '${generatedToken}');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Elimina la tabla Shops
        await queryRunner.dropTable('shops');
    }
}