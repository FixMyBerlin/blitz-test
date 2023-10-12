"use client"

import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/navigation"
import { SignupForm } from "src/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <SignupForm onSuccess={() => router.push("/")} />
    </>
  )
}

export default SignupPage
