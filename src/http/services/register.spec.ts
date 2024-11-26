import { beforeEach, describe, expect, it} from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


let usersRespostory: InMemoryUsersRepository
let sut: RegisterService

describe('Register Use Case', () => {
  
  beforeEach(() => {
    usersRespostory = new InMemoryUsersRepository()
    sut = new RegisterService(usersRespostory)
  })

  it('should be able to register', async () => {
    const {user} = await sut.createUser({
      name: 'Jose Novo',
      email: 'josefino@email.com',
      password: 'josealfino'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const {user} = await sut.createUser({
      name: 'Jose Novo',
      email: 'josefino@email.com',
      password: 'josealfino'
    })

    const isPasswordCorrectlyHashed = await compare(
      'josealfino',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'josefino@email.com'

    await sut.createUser({
      name: 'Jose Novo',
      email,
      password: 'josealfino'
    })

    await expect(async () =>     
      await sut.createUser({
      name: 'Jose Novo',
      email,
      password: 'josealfino'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})