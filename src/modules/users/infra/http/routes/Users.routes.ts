import { Router } from 'express'
import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import upload from '@config/upload'

const usersRoutes = Router()

usersRoutes.post('/', async (request, response) => {
  const { email, name, password } = request.body
  const createUserService = new CreateUserService()
  const user = await createUserService.execute({ email, name, password })
  return response.json(user)
})

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.multer.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService()
    const user = await updateUserAvatarService.execute({
      avatarFilename: request.file.filename,
      user_id: request.user.id,
    })
    response.json(user)
  },
)

export default usersRoutes
