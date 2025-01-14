import { Prisma, User } from "@prisma/client"
import { IUsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements IUsersRepository{
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}