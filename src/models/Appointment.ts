import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('appointments')
class Appoinment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  provider: string

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column('boolean')
  int_excluded: boolean
}
export default Appoinment
