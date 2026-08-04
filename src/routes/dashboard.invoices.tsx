import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileText,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/invoices")({
  head: () => ({
    meta: [
      {
        title: "Invoices — Horse Trails",
      },
      {
        name: "description",
        content:
          "View, filter, preview and download Horse Trails booking invoices.",
      },
    ],
  }),
  component: InvoicesPage,
});

type InvoiceStatus =
  | "Paid"
  | "Pending"
  | "Cancelled";

type Invoice = {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  customer: string;
  email: string;
  bookingId: string;
  riders: number;
  paymentMethod: string;
  description: string;
};

const initialInvoices: Invoice[] = [
  {
    id: "INV-2026-001",
    title: "Premium Mountain Trail",
    date: "Jul 18, 2026",
    amount: 450,
    status: "Paid",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    bookingId: "HT-100421",
    riders: 2,
    paymentMethod: "Credit Card",
    description:
      "Invoice for the Premium Mountain Trail booking.",
  },
  {
    id: "INV-2026-002",
    title: "Sunset Horse Riding Experience",
    date: "Jul 12, 2026",
    amount: 280,
    status: "Paid",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    bookingId: "HT-100522",
    riders: 2,
    paymentMethod: "UPI",
    description:
      "Invoice for the Sunset Horse Riding Experience.",
  },
  {
    id: "INV-2026-003",
    title: "Countryside Adventure Package",
    date: "Jul 05, 2026",
    amount: 620,
    status: "Pending",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    bookingId: "HT-100623",
    riders: 4,
    paymentMethod: "Pending",
    description:
      "Payment is pending for the Countryside Adventure Package.",
  },
  {
    id: "INV-2026-004",
    title: "Private Horse Trail",
    date: "Jun 28, 2026",
    amount: 350,
    status: "Cancelled",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    bookingId: "HT-100724",
    riders: 1,
    paymentMethod: "Refunded",
    description:
      "Cancelled booking invoice for the Private Horse Trail.",
  },
];

function InvoicesPage() {
  const [invoices, setInvoices] =
    useState<Invoice[]>(initialInvoices);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const filteredInvoices = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.title
          .toLowerCase()
          .includes(keyword) ||
        invoice.id
          .toLowerCase()
          .includes(keyword) ||
        invoice.bookingId
          .toLowerCase()
          .includes(keyword) ||
        invoice.customer
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        invoice.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [invoices, search, statusFilter]);

  const paidCount = invoices.filter(
    (invoice) =>
      invoice.status === "Paid",
  ).length;

  const pendingCount = invoices.filter(
    (invoice) =>
      invoice.status === "Pending",
  ).length;

  const paidAmount = invoices
    .filter(
      (invoice) =>
        invoice.status === "Paid",
    )
    .reduce(
      (total, invoice) =>
        total + invoice.amount,
      0,
    );

  const openInvoice = (
    invoice: Invoice,
  ) => {
    setSelectedInvoice(invoice);
    setPreviewOpen(true);
  };

  const markAsPaid = (
    invoiceId: string,
  ) => {
    const updatedInvoices = invoices.map(
      (invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              status:
                "Paid" as InvoiceStatus,
              paymentMethod:
                invoice.paymentMethod ===
                "Pending"
                  ? "Online Payment"
                  : invoice.paymentMethod,
            }
          : invoice,
    );

    setInvoices(updatedInvoices);

    setSelectedInvoice((current) =>
      current?.id === invoiceId
        ? {
            ...current,
            status: "Paid",
            paymentMethod:
              current.paymentMethod ===
              "Pending"
                ? "Online Payment"
                : current.paymentMethod,
          }
        : current,
    );
  };

  const deleteInvoice = (
    invoiceId: string,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?",
    );

    if (!confirmed) {
      return;
    }

    setInvoices((current) =>
      current.filter(
        (invoice) =>
          invoice.id !== invoiceId,
      ),
    );

    if (
      selectedInvoice?.id === invoiceId
    ) {
      setPreviewOpen(false);
      setSelectedInvoice(null);
    }
  };

  const createInvoiceHtml = (
    invoice: Invoice,
  ) => {
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${invoice.id}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #1f2937;
      background: #ffffff;
    }

    .invoice {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #d1d5db;
      border-radius: 18px;
      padding: 32px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 24px;
    }

    .brand {
      font-size: 26px;
      font-weight: 700;
      color: #214e34;
    }

    .muted {
      color: #6b7280;
      font-size: 14px;
    }

    .status {
      display: inline-block;
      padding: 7px 14px;
      border-radius: 999px;
      background: ${
        invoice.status === "Paid"
          ? "#dcfce7"
          : invoice.status === "Pending"
            ? "#ffedd5"
            : "#fee2e2"
      };
      color: ${
        invoice.status === "Paid"
          ? "#15803d"
          : invoice.status === "Pending"
            ? "#c2410c"
            : "#b91c1c"
      };
      font-size: 13px;
      font-weight: 700;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 28px;
    }

    .label {
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .value {
      margin-top: 5px;
      font-weight: 700;
    }

    .total {
      margin-top: 30px;
      border-top: 1px solid #e5e7eb;
      padding-top: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .amount {
      font-size: 28px;
      font-weight: 700;
      color: #214e34;
    }

    @media print {
      body {
        padding: 0;
      }

      .invoice {
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div>
        <div class="brand">Horse Trails</div>
        <div class="muted">Premium Equestrian Experiences</div>
      </div>

      <div style="text-align:right">
        <h2 style="margin:0 0 8px">Invoice</h2>
        <div class="muted">${invoice.id}</div>
        <div style="margin-top:10px">
          <span class="status">${invoice.status}</span>
        </div>
      </div>
    </div>

    <div class="grid">
      <div>
        <div class="label">Experience</div>
        <div class="value">${invoice.title}</div>
      </div>

      <div>
        <div class="label">Invoice date</div>
        <div class="value">${invoice.date}</div>
      </div>

      <div>
        <div class="label">Customer</div>
        <div class="value">${invoice.customer}</div>
      </div>

      <div>
        <div class="label">Customer email</div>
        <div class="value">${invoice.email}</div>
      </div>

      <div>
        <div class="label">Booking ID</div>
        <div class="value">${invoice.bookingId}</div>
      </div>

      <div>
        <div class="label">Travellers</div>
        <div class="value">${invoice.riders}</div>
      </div>

      <div>
        <div class="label">Payment method</div>
        <div class="value">${invoice.paymentMethod}</div>
      </div>

      <div>
        <div class="label">Status</div>
        <div class="value">${invoice.status}</div>
      </div>
    </div>

    <p style="margin-top:28px; line-height:1.6">
      ${invoice.description}
    </p>

    <div class="total">
      <div>
        <div class="label">Total amount</div>
        <div class="muted">Taxes included</div>
      </div>

      <div class="amount">
        $${invoice.amount.toFixed(2)}
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  };

  const downloadInvoice = (
    invoice: Invoice,
  ) => {
    const html =
      createInvoiceHtml(invoice);

    const blob = new Blob([html], {
      type: "text/html;charset=utf-8",
    });

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;
    anchor.download = `${invoice.id}-${invoice.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.html`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  const printInvoice = (
    invoice: Invoice,
  ) => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=700",
    );

    if (!printWindow) {
      window.alert(
        "Please allow popups to print the invoice.",
      );
      return;
    }

    printWindow.document.open();
    printWindow.document.write(
      createInvoiceHtml(invoice),
    );
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">
            Invoices
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all your booking
            invoices in one place.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground">
          <CalendarDays size={17} />
          All Time
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            setStatusFilter("Paid")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <CheckCircle2 size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Paid Invoices
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {paidCount}
          </h3>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatusFilter("Pending")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <Clock3 size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {pendingCount}
          </h3>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatusFilter("All")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <FileText size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Invoices
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {invoices.length}
          </h3>
        </button>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Download size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Paid Amount
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            ${paidAmount.toFixed(2)}
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
            placeholder="Search invoices..."
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
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value,
            )
          }
          className="h-12 rounded-2xl border border-border bg-white px-4 text-sm shadow-sm outline-none"
        >
          <option value="All">
            All Statuses
          </option>

          <option value="Paid">
            Paid
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Recent Invoices
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {filteredInvoices.length} invoices
            found.
          </p>
        </div>

        <div className="space-y-3">
          {filteredInvoices.map(
            (invoice) => (
              <div
                key={invoice.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-[#faf8f1] p-4 transition hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <button
                  type="button"
                  onClick={() =>
                    openInvoice(invoice)
                  }
                  className="flex min-w-0 items-center gap-4 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                    <FileText size={22} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-forest">
                      {invoice.title}
                    </p>

                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>
                        {invoice.id}
                      </span>

                      <span>•</span>

                      <span>
                        {invoice.date}
                      </span>

                      <span>•</span>

                      <span>
                        {
                          invoice.bookingId
                        }
                      </span>
                    </div>
                  </div>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-5 md:justify-end">
                  <div className="text-left md:text-right">
                    <p className="font-bold text-forest">
                      $
                      {invoice.amount.toFixed(
                        2,
                      )}
                    </p>

                    <StatusBadge
                      status={
                        invoice.status
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="View Invoice"
                      onClick={() =>
                        openInvoice(invoice)
                      }
                      className="rounded-xl border border-border bg-white p-2.5 text-forest transition hover:bg-forest hover:text-white"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Download Invoice"
                      onClick={() =>
                        downloadInvoice(
                          invoice,
                        )
                      }
                      className="rounded-xl border border-border bg-white p-2.5 text-forest transition hover:bg-forest hover:text-white"
                    >
                      <Download size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ),
          )}

          {filteredInvoices.length ===
            0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No invoices found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or
                status filter.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      >
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  Invoice Details
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-display text-2xl font-bold text-forest">
                      Horse Trails
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Premium Equestrian
                      Experiences
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xl font-bold text-foreground">
                      Invoice
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedInvoice.id}
                    </p>

                    <div className="mt-2">
                      <StatusBadge
                        status={
                          selectedInvoice.status
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <InvoiceField
                    label="Experience"
                    value={
                      selectedInvoice.title
                    }
                  />

                  <InvoiceField
                    label="Invoice date"
                    value={
                      selectedInvoice.date
                    }
                  />

                  <InvoiceField
                    label="Customer"
                    value={
                      selectedInvoice.customer
                    }
                  />

                  <InvoiceField
                    label="Email"
                    value={
                      selectedInvoice.email
                    }
                  />

                  <InvoiceField
                    label="Booking ID"
                    value={
                      selectedInvoice.bookingId
                    }
                  />

                  <InvoiceField
                    label="Travellers"
                    value={String(
                      selectedInvoice.riders,
                    )}
                  />

                  <InvoiceField
                    label="Payment method"
                    value={
                      selectedInvoice.paymentMethod
                    }
                  />

                  <InvoiceField
                    label="Status"
                    value={
                      selectedInvoice.status
                    }
                  />
                </div>

                <div className="mt-6 rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-foreground">
                    {
                      selectedInvoice.description
                    }
                  </p>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Total Amount
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Taxes included
                    </p>
                  </div>

                  <p className="font-display text-3xl font-bold text-forest">
                    $
                    {selectedInvoice.amount.toFixed(
                      2,
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {selectedInvoice.status ===
                    "Pending" && (
                    <Button
                      type="button"
                      onClick={() =>
                        markAsPaid(
                          selectedInvoice.id,
                        )
                      }
                      className="bg-green-700 text-white hover:bg-green-800"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Mark as Paid
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      deleteInvoice(
                        selectedInvoice.id,
                      )
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
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
                    variant="outline"
                    onClick={() =>
                      printInvoice(
                        selectedInvoice,
                      )
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Print / Save PDF
                  </Button>

                  <Button
                    type="button"
                    onClick={() =>
                      downloadInvoice(
                        selectedInvoice,
                      )
                    }
                    className="bg-forest text-white hover:bg-forest/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: InvoiceStatus;
}) {
  return (
    <span
      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        status === "Paid"
          ? "bg-green-100 text-green-700"
          : status === "Pending"
            ? "bg-orange-100 text-orange-700"
            : "bg-red-100 text-red-700"
      }`}
    >
      {status === "Paid" && (
        <CheckCircle2 size={12} />
      )}

      {status === "Pending" && (
        <Clock3 size={12} />
      )}

      {status === "Cancelled" && (
        <XCircle size={12} />
      )}

      {status}
    </span>
  );
}

function InvoiceField({
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

      <p className="mt-1 break-words font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}