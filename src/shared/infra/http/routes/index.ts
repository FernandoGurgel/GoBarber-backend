import { Router } from 'express'
import AppointmentsRoute from '@modules/appointments/infra/http/routes/Appointments.routes'
import UsersRoute from '@modules/users/infra/http/routes/Users.routes'
import SessionsRoute from '@modules/users/infra/http/routes/Sessions.routes'

const routes = Router()

routes.use('/appointments', AppointmentsRoute)
routes.use('/users', UsersRoute)
routes.use('/sessions', SessionsRoute)

export default routes
