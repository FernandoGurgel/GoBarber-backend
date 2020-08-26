import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AlterProviderAppointments1590620019349
  implements MigrationInterface {
  private providerColumnNew = new TableColumn({
    name: 'provider_id',
    type: 'uuid',
    isNullable: true,
  })

  private providerForeignKey = new TableForeignKey({
    name: 'appointmentsProvider',
    columnNames: ['provider_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })

  private providerColumnOld = new TableColumn({
    name: 'provider',
    type: 'varchar',
    isNullable: true,
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider')
    await queryRunner.addColumn('appointments', this.providerColumnNew)
    await queryRunner.createForeignKey('appointments', this.providerForeignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', this.providerForeignKey)
    await queryRunner.dropColumn('appointments', 'provider_id')
    await queryRunner.addColumn('appointments', this.providerColumnOld)
  }
}
