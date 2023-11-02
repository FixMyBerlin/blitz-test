import { useAuthenticatedBlitzContext } from "src/blitz-server"

export default async function Regions() {
  await useAuthenticatedBlitzContext({
    // The page should only be accessible to admins, not just to any logged in user.
    role: ["ADMIN"],

    redirectTo: "/login",
    // TODO: This returns an infinite loop.
    // Server console returns
    //      2023-11-02 15:20:09.338	INFO	[useAuthenticatedBlitzContext]	Authentication Redirect: (Authenticated) /regions
    // again and again.
    redirectAuthenticatedTo: "/regions",

    // I thought that maybe I need to check the user.role manually, but the ctx that is given in the callback does not seem to have this information… – I wonder what the purpose of this callback, actually.
    // redirectAuthenticatedTo: (req) => {
    //   console.warn("req", req)
    //   return "/#foo"
    // },
  })

  return <div>Foo</div>
}
