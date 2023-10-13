"use client"

import { usePaginatedQuery } from "@blitzjs/rpc";
import Head from "next/head";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Layout from "src/core/layouts/Layout";
import getProjects from "src/projects/queries/getProjects";

const ITEMS_PER_PAGE = 100;

export const ProjectsList = () => {
  const router = useRouter();
  const page = 0 // Number(router.query.page) || 0;
  const userId = Number(useParams()?.userId)
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    where: { user: { id: userId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push("/#query: { page: page - 1 } }");
  const goToNextPage = () => router.push("/#{ query: { page: page + 1 } }");

  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  console.log('render', render)
  if (!render) {
    return <div>Loading…</div>;
  }

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/#Routes.ShowProjectPage({ projectId: project.id })`}>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ProjectsPage = () => {
  const userId = useParams()?.userId;

  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>

      <div>
        <p>
          <Link href={'/#Routes.NewProjectPage({ userId: userId! })'}>
            Create Project
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
