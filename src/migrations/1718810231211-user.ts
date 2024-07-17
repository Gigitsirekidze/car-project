import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class User1718810231211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.dropForeignKey('car', 'FK_owner');

    await queryRunner.changeColumn(
      'owner',
      'id',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: false,
        isPrimary: true,
      }),
    );

    await queryRunner.createForeignKey(
      'owner',
      new TableForeignKey({
        columnNames: ['username'],
        referencedTableName: 'user',
        referencedColumnNames: ['username'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.changeColumn(
      'car',
      'ownerId',
      new TableColumn({
        name: 'ownerId',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'car',
      new TableForeignKey({
        columnNames: ['ownerId'],
        referencedTableName: 'owner',
        referencedColumnNames: ['username'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        columnNames: ['email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
