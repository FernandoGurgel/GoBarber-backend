import { Router } from 'express'
import AppointmentsRoute from './Appointments.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRoute)

export default routes
