import { useRef, useState } from "react";
import { CheckCircle2, FileText, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePortal } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function FileUploader({ label }: { label: string }) {
  const { aid, setAidDocuments } = usePortal();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach((file) => {
      const id = `doc_${Math.random().toString(36).slice(2, 9)}`;
      setAidDocuments((docs) => [
        ...docs,
        { id, name: file.name, size: file.size, type: label, status: "uploading", progress: 12 },
      ]);
      let progress = 12;
      const timer = setInterval(() => {
        progress += 22;
        if (progress >= 100) {
          clearInterval(timer);
          setAidDocuments((docs) =>
            docs.map((d) => (d.id === id ? { ...d, progress: 100, status: "done" } : d)),
          );
          toast.success(`${file.name} uploaded.`);
        } else {
          setAidDocuments((docs) => docs.map((d) => (d.id === id ? { ...d, progress } : d)));
        }
      }, 320);
    });
  };

  const docs = aid.documents.filter((d) => d.type === label);

  return (
    <div className="grid gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-2xl border-2 border-dashed border-border bg-secondary/50 p-5 text-center transition-colors",
          dragging && "border-action bg-accent-soft",
        )}
      >
        <UploadCloud className="mx-auto size-7 text-action" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-primary">{label}</p>
        <p className="text-xs text-muted-foreground">Drag & drop, or choose a file (PDF, JPG, PNG · max 10 MB)</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 min-h-11"
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          aria-label={`Upload ${label}`}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {docs.length > 0 && (
        <ul className="grid gap-2">
          {docs.map((d) => (
            <li key={d.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
              <FileText className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{d.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(d.size)} · {d.status === "done" ? "Uploaded" : `Uploading ${d.progress}%`}
                </p>
                {d.status === "uploading" && (
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-action transition-all" style={{ width: `${d.progress}%` }} />
                  </div>
                )}
              </div>
              {d.status === "done" && <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${d.name}`}
                onClick={() => setAidDocuments((prev) => prev.filter((x) => x.id !== d.id))}
              >
                <Trash2 className="text-destructive" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
