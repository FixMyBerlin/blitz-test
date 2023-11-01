import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetProject = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetProject),
  // See session error file
  // resolver.authorize(),
  async ({ id }) => {
    const project = await db.project.findFirst({ where: { id } })

    if (!project) throw new NotFoundError()

    return project
  },
)
