import { hash } from "bcryptjs"
import { IUsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository){}

  async createUser({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse>{
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if(userWithSameEmail) throw new UserAlreadyExistsError()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

   return {
    user,
   }
  }
}