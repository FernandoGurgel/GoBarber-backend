import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const usersRoutes = Router()

usersRoutes.post('/', async (request, response) => {
  try {
    const { email, name, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ email, name, password })
    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRoutes
