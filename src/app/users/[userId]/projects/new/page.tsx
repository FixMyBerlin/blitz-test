"use client"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { FORM_ERROR, ProjectForm } from "src/projects/components/ProjectForm"
import createProject from "src/projects/mutations/createProject"
import { CreateProjectSchema } from "src/projects/schemas"

const NewProjectPage = () => {
  const router = useRouter()
  const userId = Number(useParams()?.userId)
  const [createProjectMutation] = useMutation(createProject)

  return (
    <Layout title={"Create New Project"}>
      <h1>Create New Project</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectForm
          submitText="Create Project"
          schema={CreateProjectSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const project = await createProjectMutation({
                ...values,
                active: true,
                userId: userId,
              })
              await router.push(
                "/#Routes.ShowProjectPage({userId: userId!,projectId: project.id,})",
              )
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={`/#Routes.ProjectsPage({ userId: userId! })`}>Projects</Link>
      </p>
    </Layout>
  )
}

NewProjectPage.authenticate = true

export default NewProjectPage
