"use client"

import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import deleteProject from "src/projects/mutations/deleteProject";
import getProject from "src/projects/queries/getProject";

export const Project = () => {
  const router = useRouter();
  const projectId = useParam("projectId", "number");
  const userId = useParam("userId", "number");
  const [deleteProjectMutation] = useMutation(deleteProject);
  const [project] = useQuery(getProject, { id: projectId });

  return (
    <>
      <Head>
        <title>Project {project.id}</title>
      </Head>

      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <Link
          href={Routes.EditProjectPage({
            userId: userId!,
            projectId: project.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id });
              // await router.push(Routes.ProjectsPage({ userId: userId! }));
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowProjectPage = () => {
  const userId = useParam("userId", "number");

  return (
    <div>
      <p>
        <Link href={Routes.ProjectsPage({ userId: userId! })}>Projects</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  );
};

ShowProjectPage.authenticate = true;
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowProjectPage;
