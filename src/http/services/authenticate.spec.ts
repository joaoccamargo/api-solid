import { beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticationService } from './authentication.service'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRespostory: InMemoryUsersRepository
let sut: AuthenticationService

describe('Register Use Case', () => {
  
  beforeEach(() => {
    usersRespostory = new InMemoryUsersRepository()
    sut = new AuthenticationService(usersRespostory)
  })

  it('should be able to authenticate', async () => {
    await usersRespostory.create({
      name: 'josefim',
      email: 'josefino@email.com',
      password_hash: await hash('josealfino', 6)
    })

    const {user} = await sut.auth({
      email: 'josefino@email.com',
      password: 'josealfino'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be abçe to able to authenticate with wrong email', async () => {
    await expect(() => sut.auth({
      email: 'josefino@email.com',
      password: 'josealfino'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be abçe to able to authenticate with wrong password', async () => {
    await usersRespostory.create({
      name: 'josefim',
      email: 'josefino@email.com',
      password_hash: await hash('josealfino', 6)
    })

    await expect(() => sut.auth({
      email: 'josefino@email.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})