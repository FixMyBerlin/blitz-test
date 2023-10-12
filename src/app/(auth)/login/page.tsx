"use client"

import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import { useRouter } from "next/navigation"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          return router.push("/")
        }}
      />
    </Layout>
  )
}

export default LoginPage