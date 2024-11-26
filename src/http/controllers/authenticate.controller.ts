import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod"
import { InvalidCredentialsError } from "../services/errors/invalid-credentials-error";
import { makeAuthenticate } from "../services/factories/make-authenticate";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string(),
      password: z.string().min(6)
    })
  
    const {email, password} = authenticateBodySchema.parse(request.body)

   try {
     const authenticateService = makeAuthenticate()

      await authenticateService.auth({
        email,
        password,
      })
   } catch (err) {
    if(err instanceof InvalidCredentialsError) return reply.status(409).send({message: err.message})

    throw err
   }
  
  return reply.status(200).send();
}