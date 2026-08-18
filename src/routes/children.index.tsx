import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/children/")({
  component: ChildrenPage,
});

function ChildrenPage() {
  return null;
}
