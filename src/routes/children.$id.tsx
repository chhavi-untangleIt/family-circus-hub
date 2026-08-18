import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/children/$id")({
  component: ChildDetailPage,
});

function ChildDetailPage() {
  return null;
}
