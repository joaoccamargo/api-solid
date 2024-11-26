import { beforeEach, describe, expect, it} from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym.service'

let gymsRespostory: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Use Case', () => {
  
  beforeEach(() => {
    gymsRespostory = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRespostory)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(gym.id).toEqual(expect.any(String))
  })

 
})