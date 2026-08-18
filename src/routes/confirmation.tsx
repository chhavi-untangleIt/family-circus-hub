import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confirmation")({
  component: ConfirmationPage,
});

function ConfirmationPage() {
  return null;
}
