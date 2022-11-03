import { MigrationInterface, QueryRunner } from 'typeorm'

export class userMigrations1665489900559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('user', 'confirmed', 'active')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('user', 'active', 'confirmed')
  }
}
