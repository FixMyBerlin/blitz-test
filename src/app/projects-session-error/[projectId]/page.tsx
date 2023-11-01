import { invoke } from "@blitzjs/rpc"
import getProjectSessionError from "src/projects/queries/getProject-session-error"

export default async function Project({ params }) {
  console.warn("foo", params)
  const project = await invoke(getProjectSessionError, { id: Number(params.projectId) || 99 })

  return (
    <>
      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    </>
  )
}
