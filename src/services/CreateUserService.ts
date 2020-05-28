import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/User'

interface UserDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const userRepository = getRepository(User)

    const checkEmailExists = await userRepository.findOne({
      where: { email },
    })

    if (checkEmailExists) {
      throw Error('This email already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await userRepository.save(user)

    delete user.password

    return user
  }
}

export default CreateUserService
