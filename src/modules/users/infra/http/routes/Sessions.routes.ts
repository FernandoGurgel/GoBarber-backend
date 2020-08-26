import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const SessionsRoutes = Router()

SessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body
  const authenticateUserService = new AuthenticateUserService()
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  })
  return response.json({ user, token })
})

export default SessionsRoutes
