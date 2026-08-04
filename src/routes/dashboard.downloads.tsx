import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  Eye,
  FileArchive,
  FileText,
  MoreVertical,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/downloads")({
  head: () => ({
    meta: [
      {
        title: "Downloads — Horse Trails",
      },
      {
        name: "description",
        content:
          "View, search, preview and download Horse Trails booking documents.",
      },
    ],
  }),
  component: DownloadsPage,
});

type DownloadFile = {
  id: number;
  name: string;
  type: "PDF Document" | "ZIP Archive";
  date: string;
  size: string;
  sizeInMb: number;
  category: "Invoice" | "Guide" | "Confirmation" | "Gallery";
  description: string;
};

const initialDownloads: DownloadFile[] = [
  {
    id: 1,
    name: "Premium Mountain Trail Invoice",
    type: "PDF Document",
    date: "Jul 18, 2026",
    size: "245 KB",
    sizeInMb: 0.245,
    category: "Invoice",
    description:
      "Invoice document for your Premium Mountain Trail booking.",
  },
  {
    id: 2,
    name: "Horse Riding Experience Guide",
    type: "PDF Document",
    date: "Jul 12, 2026",
    size: "1.2 MB",
    sizeInMb: 1.2,
    category: "Guide",
    description:
      "Complete guide containing safety rules, meeting point and riding instructions.",
  },
  {
    id: 3,
    name: "Your Booking Confirmation",
    type: "PDF Document",
    date: "Jul 05, 2026",
    size: "180 KB",
    sizeInMb: 0.18,
    category: "Confirmation",
    description:
      "Booking confirmation for your scheduled Horse Trails experience.",
  },
  {
    id: 4,
    name: "Horse Trails Gallery Pack",
    type: "ZIP Archive",
    date: "Jun 28, 2026",
    size: "8.4 MB",
    sizeInMb: 8.4,
    category: "Gallery",
    description:
      "A downloadable collection of Horse Trails experience photographs.",
  },
];

function DownloadsPage() {
  const [downloads, setDownloads] =
    useState<DownloadFile[]>(initialDownloads);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  const [selectedFile, setSelectedFile] =
    useState<DownloadFile | null>(null);

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [activeMenu, setActiveMenu] =
    useState<number | null>(null);

  const filteredDownloads = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return downloads.filter((file) => {
      const matchesSearch =
        file.name
          .toLowerCase()
          .includes(keyword) ||
        file.type
          .toLowerCase()
          .includes(keyword) ||
        file.category
          .toLowerCase()
          .includes(keyword);

      const matchesCategory =
        category === "All" ||
        file.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [downloads, search, category]);

  const documentCount = downloads.filter(
    (file) =>
      file.type === "PDF Document",
  ).length;

  const totalStorage = downloads.reduce(
    (total, file) =>
      total + file.sizeInMb,
    0,
  );

  const storagePercentage = Math.min(
    Math.round(
      (totalStorage / 100) * 100,
    ),
    100,
  );

  const createFileContent = (
    file: DownloadFile,
  ) => {
    return `
HORSE TRAILS

${file.name}

Document type: ${file.type}
Category: ${file.category}
Date: ${file.date}
File size: ${file.size}

${file.description}

Thank you for choosing Horse Trails.
Premium Equestrian Experiences
    `.trim();
  };

  const downloadFile = (
    file: DownloadFile,
  ) => {
    const content =
      createFileContent(file);

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const downloadUrl =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    const extension =
      file.type === "ZIP Archive"
        ? "txt"
        : "pdf.txt";

    anchor.href = downloadUrl;
    anchor.download = `${file.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.${extension}`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(downloadUrl);
    setActiveMenu(null);
  };

  const downloadAll = () => {
    filteredDownloads.forEach(
      (file, index) => {
        window.setTimeout(() => {
          downloadFile(file);
        }, index * 300);
      },
    );
  };

  const openPreview = (
    file: DownloadFile,
  ) => {
    setSelectedFile(file);
    setPreviewOpen(true);
    setActiveMenu(null);
  };

  const deleteFile = (
    fileId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this download?",
    );

    if (!confirmed) {
      return;
    }

    setDownloads((current) =>
      current.filter(
        (file) => file.id !== fileId,
      ),
    );

    setActiveMenu(null);

    if (
      selectedFile?.id === fileId
    ) {
      setPreviewOpen(false);
      setSelectedFile(null);
    }
  };

  const getFileIcon = (
    type: DownloadFile["type"],
  ) => {
    return type === "ZIP Archive"
      ? FileArchive
      : FileText;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">
            Downloads
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Access and manage all your
            downloaded files and documents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground">
            <CalendarDays size={17} />
            All Downloads
          </div>

          <Button
            type="button"
            onClick={downloadAll}
            disabled={
              filteredDownloads.length ===
              0
            }
            className="bg-forest text-white hover:bg-forest/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Download size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Downloads
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {downloads.length}
          </h3>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <FileText size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Documents
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {documentCount}
          </h3>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <FileArchive size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Storage
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {totalStorage.toFixed(1)} MB
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
          <Search
            size={19}
            className="text-muted-foreground"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search downloaded files..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="rounded-full p-1 text-muted-foreground transition hover:bg-muted"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <select
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value,
            )
          }
          className="h-12 rounded-2xl border border-border bg-white px-4 text-sm shadow-sm outline-none"
        >
          <option value="All">
            All Categories
          </option>

          <option value="Invoice">
            Invoice
          </option>

          <option value="Guide">
            Guide
          </option>

          <option value="Confirmation">
            Confirmation
          </option>

          <option value="Gallery">
            Gallery
          </option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Recent Downloads
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {filteredDownloads.length} files
            found.
          </p>
        </div>

        <div className="space-y-3">
          {filteredDownloads.map(
            (file) => {
              const Icon =
                getFileIcon(file.type);

              return (
                <div
                  key={file.id}
                  className="relative flex flex-col gap-4 rounded-2xl border border-border bg-[#faf8f1] p-4 transition hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:justify-between"
                >
                  <button
                    type="button"
                    onClick={() =>
                      openPreview(file)
                    }
                    className="flex min-w-0 items-center gap-4 text-left"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-forest">
                        {file.name}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>
                          {file.type}
                        </span>

                        <span>•</span>

                        <span>
                          {file.date}
                        </span>

                        <span>•</span>

                        <span>
                          {file.size}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() =>
                        downloadFile(file)
                      }
                      className="bg-forest text-white hover:bg-forest/90"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu ===
                              file.id
                              ? null
                              : file.id,
                          )
                        }
                        className="rounded-xl border border-border bg-white p-2.5 text-forest transition hover:bg-forest hover:text-white"
                        aria-label="File actions"
                      >
                        <MoreVertical
                          size={18}
                        />
                      </button>

                      {activeMenu ===
                        file.id && (
                        <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border border-border bg-white p-2 shadow-xl">
                          <button
                            type="button"
                            onClick={() =>
                              openPreview(
                                file,
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              downloadFile(
                                file,
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteFile(
                                file.id,
                              )
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            },
          )}

          {filteredDownloads.length ===
            0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No files found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or
                category filter.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-forest">
              Storage Usage
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {totalStorage.toFixed(1)} MB of
              100 MB used
            </p>
          </div>

          <span className="text-sm font-semibold text-forest">
            {storagePercentage}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-forest transition-all duration-500"
            style={{
              width: `${storagePercentage}%`,
            }}
          />
        </div>
      </div>

      <Dialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      >
        <DialogContent className="max-w-2xl">
          {selectedFile && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  File Preview
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                    {selectedFile.type ===
                    "ZIP Archive" ? (
                      <FileArchive className="h-7 w-7" />
                    ) : (
                      <FileText className="h-7 w-7" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-forest">
                      {selectedFile.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedFile.type} •{" "}
                      {selectedFile.size}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <PreviewField
                    label="Category"
                    value={
                      selectedFile.category
                    }
                  />

                  <PreviewField
                    label="Downloaded date"
                    value={selectedFile.date}
                  />

                  <PreviewField
                    label="File type"
                    value={selectedFile.type}
                  />

                  <PreviewField
                    label="File size"
                    value={selectedFile.size}
                  />
                </div>

                <div className="mt-6 rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {
                      selectedFile.description
                    }
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setPreviewOpen(false)
                  }
                >
                  Close
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    downloadFile(
                      selectedFile,
                    )
                  }
                  className="bg-forest text-white hover:bg-forest/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PreviewField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}