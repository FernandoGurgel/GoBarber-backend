import { EntityRepository, Repository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = (await this.findOne(date)) || null
    return appointment
  }

  public async findById(id: string): Promise<Appointment | null> {
    const appointment = (await this.findOne(id)) || null
    return appointment
  }
}

export default AppointmentsRepository
