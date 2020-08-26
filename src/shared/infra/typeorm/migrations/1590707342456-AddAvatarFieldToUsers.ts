import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAvatarFieldToUsers1590707342456 implements MigrationInterface {
  private avataColumn = new TableColumn({
    name: 'avatar',
    type: 'varchar',
    isNullable: true,
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', this.avataColumn)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', this.avataColumn)
  }
}
