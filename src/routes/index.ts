import { Router } from 'express'
import AppointmentsRoute from './Appointments.routes'
import UsersRoute from './Users.routes'
import SessionsRoute from './Sessions.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRoute)
routes.use('/users', UsersRoute)
routes.use('/sessions', SessionsRoute)

export default routes
