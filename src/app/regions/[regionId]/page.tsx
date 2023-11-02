import { invoke } from "@blitzjs/rpc"
import getProject from "src/projects/queries/getProject"

export default async function Region({ params }) {
  console.warn("foo", params)
  const region = await invoke(getProject, { id: Number(params.regionId) || 99 })

  return (
    <div>
      <h1>Region {region.id}</h1>
      <pre>{JSON.stringify(region, null, 2)}</pre>
    </div>
  )
}
