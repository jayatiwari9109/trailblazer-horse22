import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarCheck,
  Check,
  CheckCircle2,
  CreditCard,
  Eye,
  Gift,
  Info,
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

export const Route = createFileRoute(
  "/dashboard/notifications",
)({
  head: () => ({
    meta: [
      {
        title: "Notifications — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage Horse Trails booking, payment and account notifications.",
      },
    ],
  }),

  component: NotificationsPage,
});

type NotificationType =
  | "success"
  | "payment"
  | "offer"
  | "info";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  type: NotificationType;
  unread: boolean;
};

const STORAGE_KEY =
  "horse-trails-dashboard-notifications";

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Booking Confirmed",
    message:
      "Your Premium Mountain Trail booking has been successfully confirmed.",
    time: "2 hours ago",
    date: "Jul 23, 2026",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Payment Successful",
    message:
      "Your payment of $450.00 for the Premium Mountain Trail was successful.",
    time: "Yesterday",
    date: "Jul 22, 2026",
    type: "payment",
    unread: true,
  },
  {
    id: 3,
    title: "Special Offer Just for You",
    message:
      "Enjoy 15% off your next horse riding experience. Offer ends soon!",
    time: "2 days ago",
    date: "Jul 21, 2026",
    type: "offer",
    unread: false,
  },
  {
    id: 4,
    title: "Profile Updated",
    message:
      "Your profile information has been successfully updated.",
    time: "4 days ago",
    date: "Jul 19, 2026",
    type: "success",
    unread: false,
  },
  {
    id: 5,
    title: "New Experience Available",
    message:
      "Explore our new Sunset Valley Horse Trail experience.",
    time: "1 week ago",
    date: "Jul 16, 2026",
    type: "info",
    unread: false,
  },
];

function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState("All");

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  useEffect(() => {
    const storedNotifications =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (storedNotifications) {
      try {
        setNotifications(
          JSON.parse(
            storedNotifications,
          ) as NotificationItem[],
        );

        return;
      } catch {
        window.localStorage.removeItem(
          STORAGE_KEY,
        );
      }
    }

    setNotifications(
      initialNotifications,
    );
  }, []);

  const saveNotifications = (
    nextNotifications: NotificationItem[],
  ) => {
    setNotifications(nextNotifications);

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        nextNotifications,
      ),
    );
  };

  const filteredNotifications =
    useMemo(() => {
      const keyword = search
        .trim()
        .toLowerCase();

      return notifications.filter(
        (notification) => {
          const matchesSearch =
            notification.title
              .toLowerCase()
              .includes(keyword) ||
            notification.message
              .toLowerCase()
              .includes(keyword) ||
            notification.type
              .toLowerCase()
              .includes(keyword);

          const matchesType =
            typeFilter === "All" ||
            notification.type ===
              typeFilter;

          return (
            matchesSearch &&
            matchesType
          );
        },
      );
    }, [
      notifications,
      search,
      typeFilter,
    ]);

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.unread,
    ).length;

  const markAllAsRead = () => {
    const updatedNotifications =
      notifications.map(
        (notification) => ({
          ...notification,
          unread: false,
        }),
      );

    saveNotifications(
      updatedNotifications,
    );

    setSelectedNotification(
      (current) =>
        current
          ? {
              ...current,
              unread: false,
            }
          : current,
    );
  };

  const toggleReadStatus = (
    notificationId: number,
  ) => {
    const updatedNotifications =
      notifications.map(
        (notification) =>
          notification.id ===
          notificationId
            ? {
                ...notification,
                unread:
                  !notification.unread,
              }
            : notification,
      );

    saveNotifications(
      updatedNotifications,
    );

    setSelectedNotification(
      (current) =>
        current?.id ===
        notificationId
          ? {
              ...current,
              unread:
                !current.unread,
            }
          : current,
    );
  };

  const openNotification = (
    notification: NotificationItem,
  ) => {
    const updatedNotification = {
      ...notification,
      unread: false,
    };

    const updatedNotifications =
      notifications.map((item) =>
        item.id === notification.id
          ? updatedNotification
          : item,
      );

    saveNotifications(
      updatedNotifications,
    );

    setSelectedNotification(
      updatedNotification,
    );

    setDetailsOpen(true);
  };

  const deleteNotification = (
    notificationId: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?",
    );

    if (!confirmed) {
      return;
    }

    const updatedNotifications =
      notifications.filter(
        (notification) =>
          notification.id !==
          notificationId,
      );

    saveNotifications(
      updatedNotifications,
    );

    if (
      selectedNotification?.id ===
      notificationId
    ) {
      setSelectedNotification(null);
      setDetailsOpen(false);
    }
  };

  const clearAllNotifications = () => {
    if (
      notifications.length === 0
    ) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all notifications?",
    );

    if (!confirmed) {
      return;
    }

    saveNotifications([]);
    setSelectedNotification(null);
    setDetailsOpen(false);
  };

  const resetNotifications = () => {
    saveNotifications(
      initialNotifications,
    );
  };

  const getNotificationIcon = (
    type: NotificationType,
  ) => {
    switch (type) {
      case "success":
        return CalendarCheck;
      case "payment":
        return CreditCard;
      case "offer":
        return Gift;
      default:
        return Info;
    }
  };

  const getIconClasses = (
    type: NotificationType,
  ) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "payment":
        return "bg-blue-100 text-blue-700";
      case "offer":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Stay updated with your
            bookings, payments and latest
            activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={
              markAllAsRead
            }
            disabled={
              unreadCount === 0
            }
          >
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={
              clearAllNotifications
            }
            disabled={
              notifications.length ===
              0
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            setTypeFilter("All")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Bell size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Total Notifications
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {
              notifications.length
            }
          </h3>
        </button>

        <button
          type="button"
          onClick={() =>
            setTypeFilter("Unread")
          }
          className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Info size={20} />
          </div>

          <p className="text-sm text-muted-foreground">
            Unread Notifications
          </p>

          <h3 className="mt-1 text-2xl font-bold text-forest">
            {unreadCount}
          </h3>
        </button>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <CheckCircle2
              size={20}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Account Status
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-600">
            Active
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
            placeholder="Search notifications..."
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
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(
              event.target.value,
            )
          }
          className="h-12 rounded-2xl border border-border bg-white px-4 text-sm shadow-sm outline-none"
        >
          <option value="All">
            All Notifications
          </option>

          <option value="Unread">
            Unread Only
          </option>

          <option value="success">
            Booking & Account
          </option>

          <option value="payment">
            Payments
          </option>

          <option value="offer">
            Offers
          </option>

          <option value="info">
            Information
          </option>
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-forest">
            Recent Notifications
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {
              filteredNotifications.length
            }{" "}
            notifications found.
          </p>
        </div>

        <div className="space-y-3">
          {filteredNotifications
            .filter(
              (notification) =>
                typeFilter !== "Unread" ||
                notification.unread,
            )
            .map(
              (notification) => {
                const Icon =
                  getNotificationIcon(
                    notification.type,
                  );

                return (
                  <div
                    key={
                      notification.id
                    }
                    className={`flex flex-col gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-start ${
                      notification.unread
                        ? "border-green-200 bg-[#f4faf5]"
                        : "border-border bg-[#faf8f1]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openNotification(
                          notification,
                        )
                      }
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconClasses(
                        notification.type,
                      )}`}
                      aria-label="Open notification"
                    >
                      <Icon size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openNotification(
                          notification,
                        )
                      }
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-forest">
                            {
                              notification.title
                            }
                          </h3>

                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-green-600" />
                          )}
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {
                            notification.time
                          }
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {
                          notification.message
                        }
                      </p>
                    </button>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        title={
                          notification.unread
                            ? "Mark as read"
                            : "Mark as unread"
                        }
                        onClick={() =>
                          toggleReadStatus(
                            notification.id,
                          )
                        }
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-green-100 hover:text-green-700"
                      >
                        <Check
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="View notification"
                        onClick={() =>
                          openNotification(
                            notification,
                          )
                        }
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Eye
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="Delete notification"
                        onClick={() =>
                          deleteNotification(
                            notification.id,
                          )
                        }
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  </div>
                );
              },
            )}

          {filteredNotifications.filter(
            (notification) =>
              typeFilter !== "Unread" ||
              notification.unread,
          ).length === 0 && (
            <div className="rounded-2xl border border-dashed border-border px-6 py-14 text-center">
              <Bell className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-3 font-semibold text-forest">
                No notifications found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                There are no notifications
                matching your current
                filters.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setTypeFilter(
                      "All",
                    );
                  }}
                >
                  Clear Filters
                </Button>

                {notifications.length ===
                  0 && (
                  <Button
                    type="button"
                    onClick={
                      resetNotifications
                    }
                    className="bg-forest text-white hover:bg-forest/90"
                  >
                    Restore Demo Notifications
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >
        <DialogContent className="max-w-xl">
          {selectedNotification && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-forest">
                  Notification Details
                </DialogTitle>
              </DialogHeader>

              <div className="rounded-2xl border border-border bg-[#faf8f1] p-5">
                <div className="flex items-start gap-4">
                  {(() => {
                    const Icon =
                      getNotificationIcon(
                        selectedNotification.type,
                      );

                    return (
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconClasses(
                          selectedNotification.type,
                        )}`}
                      >
                        <Icon
                          size={22}
                        />
                      </div>
                    );
                  })()}

                  <div>
                    <h3 className="text-lg font-bold text-forest">
                      {
                        selectedNotification.title
                      }
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {
                        selectedNotification.date
                      }{" "}
                      •{" "}
                      {
                        selectedNotification.time
                      }
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-foreground">
                  {
                    selectedNotification.message
                  }
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <NotificationField
                    label="Notification type"
                    value={
                      selectedNotification.type
                    }
                  />

                  <NotificationField
                    label="Status"
                    value={
                      selectedNotification.unread
                        ? "Unread"
                        : "Read"
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    deleteNotification(
                      selectedNotification.id,
                    )
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      toggleReadStatus(
                        selectedNotification.id,
                      )
                    }
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {selectedNotification.unread
                      ? "Mark as Read"
                      : "Mark as Unread"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() =>
                      setDetailsOpen(false)
                    }
                    className="bg-forest text-white hover:bg-forest/90"
                  >
                    Close
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

function NotificationField({
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

      <p className="mt-1 capitalize font-semibold text-forest">
        {value}
      </p>
    </div>
  );
}