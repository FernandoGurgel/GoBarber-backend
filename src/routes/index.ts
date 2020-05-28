import { Router } from 'express'
import AppointmentsRoute from './Appointments.routes'
import UsersRoute from './Users.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRoute)
routes.use('/users', UsersRoute)

export default routes
