"use client"

import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import { FORM_ERROR, ProjectForm } from "src/projects/components/ProjectForm";
import updateProject from "src/projects/mutations/updateProject";
import getProject from "src/projects/queries/getProject";
import { UpdateProjectSchema } from "src/projects/schemas";

export const EditProject = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
  const userId = useParam("userId", "number");
  const [project, { setQueryData }] = useQuery(
    getProject,
    { id: projectId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateProjectMutation] = useMutation(updateProject);

  return (
    <>
      <div>
        <h1>Edit Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectForm
            submitText="Update Project"
            schema={UpdateProjectSchema}
            // initialValues={project}
            onSubmit={async (values) => {
              try {
                const updated = await updateProjectMutation({
                  ...values,
                  id: project.id,
                });
                await setQueryData(updated);
                await router.push(
                  "/#Routes.ShowProjectPage({                    userId: userId!,                    projectId: pdated.d,                  })"
                );
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};

const EditProjectPage = () => {
  const userId = useParam("userId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

      <p>
        <Link href={Routes.ProjectsPage({ userId: userId! })}>Projects</Link>
      </p>
    </div>
  );
};

EditProjectPage.authenticate = true;
EditProjectPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditProjectPage;
