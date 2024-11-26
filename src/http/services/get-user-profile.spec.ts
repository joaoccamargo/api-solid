import { beforeEach, describe, expect, it} from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get-user-profile.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRespostory: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  
  beforeEach(() => {
    usersRespostory = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRespostory)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRespostory.create({
      name: 'josefim',
      email: 'josefino@email.com',
      password_hash: await hash('josealfino', 6)
    })

    const {user} = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual('josefim')

  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})