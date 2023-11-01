import { invoke } from "@blitzjs/rpc"
import getProject from "src/projects/queries/getProject"

export default async function Project({ params }) {
  console.warn("foo", params)
  const project = await invoke(getProject, { id: Number(params.projectId) || 99 })

  return (
    <>
      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </div>
    </>
  )
}
