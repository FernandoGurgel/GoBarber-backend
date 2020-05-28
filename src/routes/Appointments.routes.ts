import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentsService from '../services/CreateAppointmentsService'
import DeleteAppointmentService from '../services/DeleteAppointmentServices'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRoutes = Router()

appointmentsRoutes.use(ensureAuthenticated)

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)
    const createAppointmentsService = new CreateAppointmentsService()
    const appointment = await createAppointmentsService.execute({
      provider_id,
      date: parsedDate,
    })
    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

appointmentsRoutes.get('/', async (request, response) => {
  console.log(request.user)

  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find({
    where: { int_excluded: false },
  })
  return response.json(appointments)
})

// appointmentsRoutes.put('/', (request, response) => {})

appointmentsRoutes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const deleteAppointmentService = new DeleteAppointmentService()
    const appointment = await deleteAppointmentService.execute({
      id,
    })
    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRoutes
