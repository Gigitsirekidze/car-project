import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Intial1718209697435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'owner',
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
            name: 'gender',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'car',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'millage',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ownerId',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_owner',
            columnNames: ['ownerId'],
            referencedTableName: 'owner',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('owner');
    await queryRunner.dropTable('car');
  }
}
