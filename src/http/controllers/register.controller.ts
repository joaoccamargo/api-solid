import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { UserAlreadyExistsError } from "../services/errors/user-already-exists-error";
import { makeRegisterService } from "../services/factories/make-register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6)
    })
  
    const {name, email, password} = registerBodySchema.parse(request.body)

   try {
      const registerService = makeRegisterService()

      await registerService.createUser({
        name,
        email,
        password,
      })
   } catch (err) {
    if(err instanceof UserAlreadyExistsError) return reply.status(409).send({message: err.message})

    throw err
   }
  
  return reply.status(201).send();
}