import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/financial-aid")({
  component: FinancialAidPage,
});

function FinancialAidPage() {
  return null;
}
