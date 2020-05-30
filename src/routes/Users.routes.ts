import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import upload from '../config/upload'

const usersRoutes = Router()

usersRoutes.post('/', async (request, response) => {
  try {
    const { email, name, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ email, name, password })
    return response.json(user)
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message })
  }
})

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.multer.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService()
      const user = await updateUserAvatarService.execute({
        avatarFilename: request.file.filename,
        user_id: request.user.id,
      })
      response.json(user)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  },
)

export default usersRoutes
