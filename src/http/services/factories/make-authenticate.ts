import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository"
import { AuthenticationService } from "../authentication.service"

export function makeAuthenticate() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticationService(prismaUsersRepository)

  return authenticateService
}