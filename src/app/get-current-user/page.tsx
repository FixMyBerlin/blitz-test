import { getBlitzContext } from "@blitzjs/auth"
import { invoke } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"

export default async function CurrentUserPage({ params }) {
  console.warn("foo", params)
  const ctx = await getBlitzContext()
  console.warn("foo", ctx)
  const user = await getCurrentUser(null, ctx)
  console.warn("foo", user)

  return (
    <>
      <div>
        <h1>getCurrentUser</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  )
}
