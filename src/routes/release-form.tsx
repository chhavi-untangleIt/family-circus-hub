import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/release-form")({
  component: ReleaseFormPage,
});

function ReleaseFormPage() {
  return null;
}
