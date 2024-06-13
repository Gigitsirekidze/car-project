import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Dealership1718211604266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dealership',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'car_dealership',
        columns: [
          {
            name: 'carId',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'dealershipId',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['carId'],
            referencedTableName: 'car',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['dealershipId'],
            referencedTableName: 'dealership',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dealership');
    await queryRunner.dropTable('car_dealership');
  }
}
