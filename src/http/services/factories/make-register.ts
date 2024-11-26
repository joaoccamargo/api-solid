import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register.service"

export function makeRegisterService(){
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(prismaUsersRepository)

  return registerService
}