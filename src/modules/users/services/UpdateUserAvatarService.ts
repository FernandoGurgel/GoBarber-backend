import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import upload from '@config/upload'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface UserDTO {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: UserDTO): Promise<User> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authentication users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarPath = path.join(upload.tmpFolder, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath)
      }
    }

    user.avatar = avatarFilename
    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
