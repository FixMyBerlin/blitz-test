"use client"

import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Suspense } from "react"
import deleteProject from "src/projects/mutations/deleteProject"
import getProject from "src/projects/queries/getProject"

const Project = () => {
  const projectId = Number(useParams()?.projectId)
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })

  return (
    <>
      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <Link
          href="#{Routes.EditProjectPage({
            userId: userId!,
            projectId: project.id,
          })}"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id })
              // await router.push(Routes.ProjectsPage({ userId: userId! }));
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProjectPage = () => {
  return (
    <div>
      <p>
        <Link href="#{Routes.ProjectsPage({ userId: userId! })}">Projects</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.authenticate = true

export default ShowProjectPage
