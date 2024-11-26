import { compare } from "bcryptjs";
import { IUsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface IAuthenticateServiceRequest {
  email: string
  password: string
}

interface IAuthenticateServiceResponse {
  user: User
}

export class AuthenticationService {
  constructor(private usersRepository: IUsersRepository){}


  async auth({ email, password }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceResponse>{
    // find user by email
    // compare password is true
    const user = await this.usersRepository.findByEmail(email)
    if(!user) throw new InvalidCredentialsError()
    
    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches) throw new InvalidCredentialsError()
    
    return {
      user,
    }
  }

}