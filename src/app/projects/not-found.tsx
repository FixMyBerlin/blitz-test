import { Metadata } from "next"

export const metadata: Metadata = {
  robots: "noindex",
  title: "Seite nicht gefunden (Fehler 404)",
}

export default function Page404() {
  return (
    <h1>
      Not found in PROJECTS using invoke (server component){" "}
      <code>src/app/projects/not-found.tsx</code>
    </h1>
  )
}
