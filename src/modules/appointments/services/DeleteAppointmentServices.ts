import { getCustomRepository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository'
import AppError from '@shared/errors/AppError'

interface AppointmentDTO {
  id: string
}

class DeleteAppointmentServices {
  public async execute({ id }: AppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const findAppointments = await appointmentsRepository.findById(id)

    if (!findAppointments) {
      throw new AppError('This id is invalid')
    }

    const appointmentTemp = {
      id: findAppointments.id,
      provider: findAppointments.provider,
      int_exclued: !findAppointments.int_excluded,
    }

    const appointment = appointmentsRepository.create(appointmentTemp)
    await appointmentsRepository.update(id, appointment)
    return appointment
  }
}

export default DeleteAppointmentServices
