// import { createFileRoute } from "@tanstack/react-router";
// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {
//   CalendarDays,
//   Clock,
//   Download,
//   Eye,
//   Mail,
//   MapPin,
//   Phone,
//   Search,
//   Users,
// } from "lucide-react";
// import { jsPDF } from "jspdf";

// import { SiteLayout } from "@/components/site/Layout";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import {
//   Booking,
//   BookingStatus,
//   getBookings,
//   saveBookings,
// } from "@/lib/dashboard-store";

// export const Route = createFileRoute(
//   "/my-bookings",
// )({
//   head: () => ({
//     meta: [
//       {
//         title: "My Bookings — Horse Trails",
//       },
//       {
//         name: "description",
//         content:
//           "View and manage your horse trail bookings.",
//       },
//     ],
//   }),
//   component: MyBookings,
// });

// function MyBookings() {
//   const [bookings, setBookings] =
//     useState<Booking[]>([]);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] =
//     useState("All");

//   const [selectedBooking, setSelectedBooking] =
//     useState<Booking | null>(null);

//   const [detailsOpen, setDetailsOpen] =
//     useState(false);

//   useEffect(() => {
//     setBookings(getBookings());
//   }, []);

//   const filteredBookings = useMemo(() => {
//     const keyword = search.trim().toLowerCase();

//     return bookings.filter((booking) => {
//       const matchesSearch =
//         booking.id
//           .toLowerCase()
//           .includes(keyword) ||
//         booking.trail
//           .toLowerCase()
//           .includes(keyword) ||
//         booking.customer
//           .toLowerCase()
//           .includes(keyword);

//       const matchesStatus =
//         statusFilter === "All" ||
//         booking.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [bookings, search, statusFilter]);

//   const updateBookingStatus = (
//     bookingId: string,
//     status: BookingStatus,
//   ) => {
//     const updated = bookings.map((booking) =>
//       booking.id === bookingId
//         ? {
//             ...booking,
//             status,
//           }
//         : booking,
//     );

//     setBookings(updated);
//     saveBookings(updated);

//     setSelectedBooking((current) =>
//       current?.id === bookingId
//         ? {
//             ...current,
//             status,
//           }
//         : current,
//     );
//   };

//   const downloadTicket = (
//     booking: Booking,
//   ) => {
//     const pdf = new jsPDF();

//     pdf.setFillColor(31, 74, 55);
//     pdf.rect(0, 0, 210, 38, "F");

//     pdf.setTextColor(255, 255, 255);
//     pdf.setFontSize(23);
//     pdf.text(
//       "HORSE TRAILS",
//       20,
//       18,
//     );

//     pdf.setFontSize(11);
//     pdf.text(
//       "Premium Equestrian Booking Ticket",
//       20,
//       27,
//     );

//     pdf.setTextColor(30, 30, 30);
//     pdf.setFontSize(15);
//     pdf.text(
//       "Booking Confirmation",
//       20,
//       53,
//     );

//     pdf.setDrawColor(220, 220, 220);
//     pdf.line(20, 58, 190, 58);

//     const ticketLines = [
//       ["Booking ID", booking.id],
//       ["Customer", booking.customer],
//       ["Email", booking.email],
//       ["Phone", booking.phone],
//       ["Trail", booking.trail],
//       ["Location", booking.location],
//       ["Date", booking.date],
//       ["Time", booking.time],
//       ["Riders", String(booking.riders)],
//       [
//         "Total Amount",
//         `$${booking.amount}`,
//       ],
//       ["Status", booking.status],
//     ];

//     let y = 70;

//     ticketLines.forEach(([label, value]) => {
//       pdf.setFontSize(10);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text(`${label}:`, 20, y);

//       pdf.setFontSize(11);
//       pdf.setTextColor(25, 25, 25);
//       pdf.text(value, 65, y);

//       y += 11;
//     });

//     pdf.setFillColor(247, 242, 224);
//     pdf.roundedRect(
//       20,
//       y + 3,
//       170,
//       36,
//       4,
//       4,
//       "F",
//     );

//     pdf.setTextColor(31, 74, 55);
//     pdf.setFontSize(11);

//     pdf.text(
//       "Important Instructions",
//       27,
//       y + 15,
//     );

//     pdf.setFontSize(9);
//     pdf.text(
//       "Please arrive 20 minutes before the ride. Carry a valid ID.",
//       27,
//       y + 25,
//     );

//     pdf.text(
//       "Follow all safety instructions provided by your trail guide.",
//       27,
//       y + 32,
//     );

//     pdf.setFontSize(9);
//     pdf.setTextColor(110, 110, 110);

//     pdf.text(
//       "Thank you for booking with Horse Trails.",
//       20,
//       280,
//     );

//     pdf.save(
//       `horse-trails-ticket-${booking.id}.pdf`,
//     );
//   };

//   const getBadgeVariant = (
//     status: BookingStatus,
//   ) => {
//     if (
//       status === "Confirmed" ||
//       status === "Completed"
//     ) {
//       return "default" as const;
//     }

//     return "outline" as const;
//   };

//   return (
//     <SiteLayout>
//       <section className="container-wide py-10 sm:py-14">
//         <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
//           <div>
//             <Badge className="bg-gold text-gold-foreground">
//               Booking Management
//             </Badge>

//             <h1 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">
//               My Bookings
//             </h1>

//             <p className="mt-2 text-muted-foreground">
//               View booking details, update status and
//               download tickets.
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//           <div className="relative w-full sm:max-w-md">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search ID, customer or trail..."
//               className="pl-10"
//             />
//           </div>

//           <select
//             value={statusFilter}
//             onChange={(event) =>
//               setStatusFilter(event.target.value)
//             }
//             className="h-10 rounded-md border border-input bg-background px-3 text-sm"
//           >
//             <option value="All">
//               All Bookings
//             </option>
//             <option value="Pending">
//               Pending
//             </option>
//             <option value="Confirmed">
//               Confirmed
//             </option>
//             <option value="Completed">
//               Completed
//             </option>
//             <option value="Cancelled">
//               Cancelled
//             </option>
//           </select>
//         </div>

//         <div className="mt-8 grid gap-5">
//           {filteredBookings.map((booking) => (
//             <article
//               key={booking.id}
//               className="rounded-3xl border border-border/60 bg-card p-5 shadow-elegant sm:p-6"
//             >
//               <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
//                 <div className="min-w-0">
//                   <div className="flex flex-wrap items-center gap-3">
//                     <h2 className="font-display text-xl font-semibold text-forest">
//                       {booking.trail}
//                     </h2>

//                     <Badge
//                       variant={getBadgeVariant(
//                         booking.status,
//                       )}
//                     >
//                       {booking.status}
//                     </Badge>
//                   </div>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {booking.customer} • Booking ID:{" "}
//                     {booking.id}
//                   </p>

//                   <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-4">
//                     <span className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-forest" />
//                       {booking.location}
//                     </span>

//                     <span className="flex items-center gap-2">
//                       <CalendarDays className="h-4 w-4 text-forest" />
//                       {booking.date}
//                     </span>

//                     <span className="flex items-center gap-2">
//                       <Clock className="h-4 w-4 text-forest" />
//                       {booking.time}
//                     </span>

//                     <span className="flex items-center gap-2">
//                       <Users className="h-4 w-4 text-forest" />
//                       {booking.riders} riders
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-3">
//                   <div className="text-left xl:text-right">
//                     <p className="text-xs text-muted-foreground">
//                       Total amount
//                     </p>

//                     <p className="font-display text-xl font-bold text-forest">
//                       ${booking.amount}
//                     </p>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => {
//                         setSelectedBooking(
//                           booking,
//                         );

//                         setDetailsOpen(true);
//                       }}
//                     >
//                       <Eye className="mr-2 h-4 w-4" />
//                       View Details
//                     </Button>

//                     <Button
//                       variant="outline"
//                       onClick={() =>
//                         downloadTicket(booking)
//                       }
//                     >
//                       <Download className="mr-2 h-4 w-4" />
//                       Download Ticket
//                     </Button>

//                     <select
//                       value={booking.status}
//                       onChange={(event) =>
//                         updateBookingStatus(
//                           booking.id,
//                           event.target
//                             .value as BookingStatus,
//                         )
//                       }
//                       className="h-10 rounded-md border border-input bg-background px-3 text-sm"
//                     >
//                       <option value="Pending">
//                         Pending
//                       </option>

//                       <option value="Confirmed">
//                         Confirmed
//                       </option>

//                       <option value="Completed">
//                         Completed
//                       </option>

//                       <option value="Cancelled">
//                         Cancelled
//                       </option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {filteredBookings.length === 0 && (
//           <div className="mt-8 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
//             No bookings found.
//           </div>
//         )}
//       </section>

//       <Dialog
//         open={detailsOpen}
//         onOpenChange={setDetailsOpen}
//       >
//         <DialogContent className="max-w-2xl">
//           {selectedBooking && (
//             <>
//               <DialogHeader>
//                 <DialogTitle>
//                   Booking Details
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="rounded-2xl bg-forest p-5 text-forest-foreground">
//                 <p className="text-sm opacity-80">
//                   Booking ID
//                 </p>

//                 <p className="font-display text-2xl font-bold">
//                   {selectedBooking.id}
//                 </p>

//                 <p className="mt-2">
//                   {selectedBooking.trail}
//                 </p>
//               </div>

//               <div className="grid gap-4 text-sm sm:grid-cols-2">
//                 <div>
//                   <p className="text-muted-foreground">
//                     Customer
//                   </p>

//                   <p className="font-medium">
//                     {selectedBooking.customer}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground">
//                     Status
//                   </p>

//                   <Badge className="mt-1">
//                     {selectedBooking.status}
//                   </Badge>
//                 </div>

//                 <div className="flex items-start gap-2">
//                   <Mail className="mt-0.5 h-4 w-4 text-forest" />

//                   <div>
//                     <p className="text-muted-foreground">
//                       Email
//                     </p>

//                     <p>
//                       {selectedBooking.email}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-2">
//                   <Phone className="mt-0.5 h-4 w-4 text-forest" />

//                   <div>
//                     <p className="text-muted-foreground">
//                       Phone
//                     </p>

//                     <p>
//                       {selectedBooking.phone}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground">
//                     Date and Time
//                   </p>

//                   <p>
//                     {selectedBooking.date},{" "}
//                     {selectedBooking.time}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground">
//                     Riders
//                   </p>

//                   <p>
//                     {selectedBooking.riders}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground">
//                     Location
//                   </p>

//                   <p>
//                     {selectedBooking.location}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground">
//                     Total Amount
//                   </p>

//                   <p className="font-bold text-forest">
//                     ${selectedBooking.amount}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5">
//                 <Button
//                   variant="outline"
//                   onClick={() =>
//                     setDetailsOpen(false)
//                   }
//                 >
//                   Close
//                 </Button>

//                 <Button
//                   onClick={() =>
//                     downloadTicket(
//                       selectedBooking,
//                     )
//                   }
//                   className="bg-forest text-forest-foreground"
//                 >
//                   <Download className="mr-2 h-4 w-4" />
//                   Download Ticket
//                 </Button>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </SiteLayout>
//   );
// }
import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CalendarDays,
  Clock,
  Download,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getBookings, saveBookings } from "@/lib/dashboard-store";
import type { Booking, BookingStatus } from "@/lib/dashboard-store";

export const Route = createFileRoute("/my-bookings")({
  head: () => ({
    meta: [
      {
        title: "My Bookings — Horse Trails",
      },
      {
        name: "description",
        content:
          "View bookings, open e-tickets and download booking tickets.",
      },
    ],
  }),
  component: MyBookings,
});

function MyBookings() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [ticketOpen, setTicketOpen] =
    useState(false);

   useEffect(() => {
  const refreshBookings = () => {
    setBookings(getBookings());
  };

  refreshBookings();

  window.addEventListener(
    "horse-trails-data-updated",
    refreshBookings,
  );

  window.addEventListener(
    "storage",
    refreshBookings,
  );

  return () => {
    window.removeEventListener(
      "horse-trails-data-updated",
      refreshBookings,
    );

    window.removeEventListener(
      "storage",
      refreshBookings,
    );
  };
}, []);
  const filteredBookings = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id
          .toLowerCase()
          .includes(keyword) ||
        booking.trail
          .toLowerCase()
          .includes(keyword) ||
        booking.customer
          .toLowerCase()
          .includes(keyword) ||
        booking.location
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const updateBookingStatus = (
    bookingId: string,
    status: BookingStatus,
  ) => {
    const updatedBookings = bookings.map(
      (booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status,
            }
          : booking,
    );

    setBookings(updatedBookings);
    saveBookings(updatedBookings);

    setSelectedBooking((current) =>
      current?.id === bookingId
        ? {
            ...current,
            status,
          }
        : current,
    );
  };

  const openTicket = (booking: Booking) => {
    setSelectedBooking(booking);
    setTicketOpen(true);
  };

  const downloadTicket = (booking: Booking) => {
    const bookingReference =
      booking.id.replace(/\D/g, "") || String(booking.productId);

    const barcodeBars = Array.from({ length: 52 }, (_, index) => {
      const digit = Number(
        bookingReference.padEnd(10, "7")[
          index % bookingReference.padEnd(10, "7").length
        ],
      );
      const width = index % 5 === 0 ? 4 : index % 3 === 0 ? 3 : digit % 2 === 0 ? 2 : 1;
      return `<span style="display:block;width:${width}px;height:64px;background:#000"></span>`;
    }).join("");

    const ticketWindow = window.open("", "_blank", "width=1100,height=800");

    if (!ticketWindow) {
      window.alert("Popup blocked. Please allow popups and try again.");
      return;
    }

    ticketWindow.document.write(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Horse Trails Ticket - ${booking.id}</title>
  <style>
    *{box-sizing:border-box} body{margin:0;background:#faf9f5;color:#111;font-family:Arial,sans-serif}
    .page{max-width:1050px;margin:0 auto;padding:34px}.title{font-size:34px;font-weight:800;margin:0}
    .subtitle{margin:18px 0 34px;color:#333}.ticket{display:grid;grid-template-columns:220px 1fr;border:2px solid #d9d9d3;border-radius:18px;overflow:hidden;background:#fff}
    .left{padding:28px;border-right:1px solid #d9d9d3}.left h2{font-size:20px;margin:0 0 12px}.muted{color:#666;font-size:13px;line-height:1.5}
    .right{padding:28px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:26px 55px}.label{font-size:12px;color:#666;margin-bottom:5px}.value{font-size:15px;font-weight:700}
    .barcode{display:flex;justify-content:flex-end;gap:2px;align-items:stretch;margin-top:6px}.barcode-number{text-align:right;font-size:12px;margin-top:8px}
    .download-note{display:flex;align-items:center;gap:10px;margin:24px 0;border-top:1px solid #ddd;padding-top:22px;font-weight:700}
    .info{border-top:1px solid #ddd;padding-top:26px;margin-top:18px}.info h3{font-size:18px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:22px}
    .actions{margin-top:30px;display:flex;gap:12px}.btn{border:0;border-radius:10px;padding:12px 18px;font-weight:700;cursor:pointer}.primary{background:#1f4a37;color:#fff}.secondary{background:#eee;color:#111}
    @media(max-width:760px){.ticket{grid-template-columns:1fr}.left{border-right:0;border-bottom:1px solid #ddd}.grid,.info-grid{grid-template-columns:1fr}.page{padding:18px}}
    @media print{.actions,.download-note{display:none}.page{padding:0}.ticket{break-inside:avoid}body{background:#fff}}
  </style>
</head>
<body>
  <main class="page">
    <h1 class="title">Ticket Info</h1>
    <p class="subtitle">This is your e-ticket, please present this on the day of your experience.</p>
    <section class="ticket">
      <div class="left"><h2>${booking.trail}</h2><div class="muted">${booking.location}</div></div>
      <div class="right">
        <div class="grid">
          <div><div class="label">Date & time</div><div class="value">${booking.date} • ${booking.time}</div></div>
          <div><div class="label">Travellers</div><div class="value">${booking.customer} • ${booking.riders} ${booking.riders === 1 ? "adult" : "adults"}</div></div>
          <div><div class="label">Language</div><div class="value">English - Guide</div></div>
          <div><div class="label">Activity provider</div><div class="value">Horse Trails Premium Tours</div></div>
          <div><div class="label">Booking ref.</div><div class="value">${bookingReference}</div></div>
          <div><div class="barcode">${barcodeBars}</div><div class="barcode-number">${bookingReference}</div></div>
        </div>
      </div>
    </section>
    <div class="download-note">↓ Download as PDF</div>
    <section class="info">
      <h3>Booking Information</h3>
      <div class="info-grid">
        <div><div class="label">Tour operator confirmation no.</div><div class="value">HT-${bookingReference}</div></div>
        <div><div class="label">Tour operator product code</div><div class="value">HTP-${booking.productId}-${bookingReference.slice(-4)}</div></div>
        <div><div class="label">Customer email</div><div class="value">${booking.email}</div></div>
        <div><div class="label">Customer phone</div><div class="value">${booking.phone}</div></div>
        <div><div class="label">Total amount</div><div class="value">$${booking.amount}</div></div>
        <div><div class="label">Booking status</div><div class="value">${booking.status}</div></div>
      </div>
    </section>
    <div class="actions"><button class="btn primary" onclick="window.print()">Download / Save as PDF</button><button class="btn secondary" onclick="window.close()">Close</button></div>
  </main>
</body>
</html>`);

    ticketWindow.document.close();
    ticketWindow.focus();

    window.setTimeout(() => {
      ticketWindow.print();
    }, 400);
  };

  const getStatusClasses = (
    status: BookingStatus,
  ) => {
    switch (status) {
      case "Confirmed":
        return "border-green-200 bg-green-50 text-green-700";
      case "Completed":
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "Cancelled":
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "border-amber-200 bg-amber-50 text-amber-700";
    }
  };

  return (
    <SiteLayout>
      <section className="container-wide py-10 sm:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="bg-gold text-gold-foreground">
              Booking Management
            </Badge>

            <h1 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-2 text-muted-foreground">
              View booking details, manage status
              and download customer e-tickets.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search booking, customer or trail..."
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value,
              )
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="All">
              All Bookings
            </option>
            <option value="Pending">
              Pending
            </option>
            <option value="Confirmed">
              Confirmed
            </option>
            <option value="Completed">
              Completed
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        <div className="mt-8 grid gap-5">
          {filteredBookings.map(
            (booking) => (
              <article
                key={booking.id}
                className="rounded-3xl border border-border/60 bg-card p-5 shadow-elegant transition hover:-translate-y-0.5 sm:p-6"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-semibold text-forest">
                        {booking.trail}
                      </h2>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.customer} • Booking
                      ID: {booking.id}
                    </p>

                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 xl:grid-cols-4">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-forest" />
                        {booking.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-forest" />
                        {booking.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-forest" />
                        {booking.time}
                      </span>

                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-forest" />
                        {booking.riders} travellers
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="text-left xl:text-right">
                      <p className="text-xs text-muted-foreground">
                        Total amount
                      </p>

                      <p className="font-display text-xl font-bold text-forest">
                        ${booking.amount}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          openTicket(booking)
                        }
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        View Ticket
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          downloadTicket(
                            booking,
                          )
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>

                      <select
                        value={booking.status}
                        onChange={(event) =>
                          updateBookingStatus(
                            booking.id,
                            event.target
                              .value as BookingStatus,
                          )
                        }
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="Confirmed">
                          Confirmed
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>

        {filteredBookings.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No bookings found.
          </div>
        )}
      </section>

      <Dialog
        open={ticketOpen}
        onOpenChange={setTicketOpen}
      >
        <DialogContent className="max-h-[94vh] max-w-5xl overflow-y-auto bg-[#faf9f5] p-0">
          {selectedBooking && (
            <div className="p-5 sm:p-8 lg:p-10">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-foreground">
                  Ticket Info
                </DialogTitle>
              </DialogHeader>

              <p className="mt-4 text-sm text-foreground/80 sm:text-base">
                This is your e-ticket, please
                present this on the day of your
                experience.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border-2 border-border bg-white">
                <div className="grid lg:grid-cols-[190px_1fr]">
                  <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                      {selectedBooking.trail}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      {selectedBooking.location}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-7 md:grid-cols-2">
                      <div className="grid gap-6">
                        <TicketField
                          label="Date & time"
                          value={`${selectedBooking.date} • ${selectedBooking.time}`}
                        />

                        <TicketField
                          label="Language"
                          value="English - Guide"
                        />

                        <TicketField
                          label="Booking ref."
                          value={selectedBooking.id.replace(
                            /\D/g,
                            "",
                          )}
                        />
                      </div>

                      <div className="grid gap-6">
                        <TicketField
                          label="Travellers"
                          value={`${selectedBooking.customer} • ${selectedBooking.riders} ${
                            selectedBooking.riders ===
                            1
                              ? "adult"
                              : "adults"
                          }`}
                        />

                        <TicketField
                          label="Activity provider"
                          value="Horse Trails Premium Tours"
                        />

                        <div className="pt-2">
                          <Barcode
                            value={selectedBooking.id.replace(
                              /\D/g,
                              "",
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  downloadTicket(
                    selectedBooking,
                  )
                }
                className="mt-6 inline-flex items-center gap-3 text-base font-medium text-foreground transition hover:text-forest"
              >
                <Download className="h-5 w-5" />
                Download as PDF
              </button>

              <div className="mt-8 border-t border-border pt-8">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Booking Information
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <TicketField
                    label="Tour operator confirmation no."
                    value={`HT-${selectedBooking.id.replace(
                      /\D/g,
                      "",
                    )}`}
                  />

                  <TicketField
                    label="Tour operator product code"
                    value={`HTP-${selectedBooking.productId}-${selectedBooking.id.slice(
                      -4,
                    )}`}
                  />

                  <TicketField
                    label="Customer email"
                    value={selectedBooking.email}
                  />

                  <TicketField
                    label="Customer phone"
                    value={selectedBooking.phone}
                  />

                  <TicketField
                    label="Total amount"
                    value={`$${selectedBooking.amount}`}
                  />

                  <TicketField
                    label="Booking status"
                    value={selectedBooking.status}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-border pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setTicketOpen(false)
                  }
                >
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    downloadTicket(
                      selectedBooking,
                    )
                  }
                  className="bg-forest text-forest-foreground hover:bg-forest/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

function TicketField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-foreground/60">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
        {value}
      </p>
    </div>
  );
}

function Barcode({
  value,
}: {
  value: string;
}) {
  const barcodeValue =
    value.padEnd(10, "7");

  const bars = Array.from({
    length: 42,
  });

  return (
    <div className="flex flex-col items-center md:items-end">
      <div className="flex h-16 items-stretch gap-[2px] overflow-hidden">
        {bars.map((_, index) => {
          const number = Number(
            barcodeValue[
              index %
                barcodeValue.length
            ],
          );

          const width =
            index % 5 === 0
              ? 4
              : index % 3 === 0
                ? 3
                : number % 2 === 0
                  ? 2
                  : 1;

          return (
            <span
              key={index}
              className="block bg-black"
              style={{
                width: `${width}px`,
              }}
            />
          );
        })}
      </div>

      <p className="mt-2 text-xs text-foreground/70">
        {value}
      </p>
    </div>
  );
}