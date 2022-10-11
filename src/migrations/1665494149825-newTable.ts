import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class newTable1665494149825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'newtable',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'newtable',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('newtable');
    const fkey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('newtable', fkey!);
    await queryRunner.dropColumn('newtable', 'userId');
    await queryRunner.dropTable('newtable');
  }
}
