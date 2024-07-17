import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Price1720196647502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'car',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        isNullable: false,
        default: 100,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('car', 'price');
  }
}
