import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Balance1720192713849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'balance',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_owner_balance',
            columnNames: ['owner_id'],
            referencedTableName: 'owner',
            referencedColumnNames: ['username'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'balance',
      new TableIndex({
        columnNames: ['owner_id', 'currency'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('balance');
  }
}
