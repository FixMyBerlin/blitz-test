import { invoke } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

export default async function CurrentUserPage({ params }) {
  console.warn("foo", params)
  const user = await invoke(getCurrentUser, null)

  return (
    <>
      <div>
        <h1>getCurrentUser</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  )
}
