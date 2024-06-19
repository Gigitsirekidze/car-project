import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Balance1718788021776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'owner',
      new TableColumn({
        name: 'balance',
        type: 'decimal',
        isNullable: false,
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      'car',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('owner', 'balance');
    await queryRunner.dropColumn('car', 'price');
  }
}
