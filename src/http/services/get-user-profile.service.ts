import { IUsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface IGetUserProfileRequest {
  userId: string
}

interface IGetUserProfileResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository){}


  async execute({ userId }: IGetUserProfileRequest): Promise<IGetUserProfileResponse>{
    const user = await this.usersRepository.findById(userId)
    if(!user) throw new ResourceNotFoundError()    
    return {
      user,
    }
  }

}