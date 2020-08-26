import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateAppoinments1590202859143
  implements MigrationInterface {
  private appointmentsTable = new Table({
    name: 'appointments',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()',
      },
      {
        name: 'provider',
        type: 'varchar',
      },
      {
        name: 'date',
        type: 'timestamp with time zone',
        default: 'now()',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'int_excluded',
        type: 'boolean',
        default: 'false',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.createTable(this.appointmentsTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('')
    await queryRunner.dropTable(this.appointmentsTable)
  }
}
