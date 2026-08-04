import { createFileRoute } from "@tanstack/react-router";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CalendarDays,
  Clock,
  Edit3,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AvailabilityItem,
  getAvailability,
  getProducts,
  Product,
  saveAvailability,
} from "@/lib/dashboard-store";

export const Route = createFileRoute(
  "/availability",
)({
  head: () => ({
    meta: [
      {
        title: "Availability — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage available dates and rider limits.",
      },
    ],
  }),
  component: Availability,
});

type AvailabilityForm = {
  productId: string;
  date: string;
  startTime: string;
  endTime: string;
  riders: string;
  priceOverride: string;
  status: "Available" | "Unavailable";
};

const emptyForm: AvailabilityForm = {
  productId: "",
  date: "",
  startTime: "",
  endTime: "",
  riders: "1",
  priceOverride: "",
  status: "Available",
};

function Availability() {
  const [items, setItems] = useState<
    AvailabilityItem[]
  >([]);

  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] =
    useState("");

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState<AvailabilityItem | null>(null);

  const [form, setForm] =
    useState<AvailabilityForm>(emptyForm);

  useEffect(() => {
    setItems(getAvailability());
    setProducts(getProducts());
  }, []);

  const updateItems = (
    updated: AvailabilityItem[],
  ) => {
    setItems(updated);
    saveAvailability(updated);
  };

  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        item.productName
          .toLowerCase()
          .includes(keyword);

      const matchesDate =
        !filterDate ||
        item.date === filterDate;

      return matchesSearch && matchesDate;
    });
  }, [items, search, filterDate]);

  const openAddForm = () => {
    setEditingItem(null);

    setForm({
      ...emptyForm,
      productId:
        products[0]?.id.toString() ?? "",
    });

    setFormOpen(true);
  };

  const openEditForm = (
    item: AvailabilityItem,
  ) => {
    setEditingItem(item);

    setForm({
      productId: String(item.productId),
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      riders: String(item.riders),
      priceOverride:
        item.priceOverride?.toString() ?? "",
      status: item.status,
    });

    setFormOpen(true);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const selectedProduct = products.find(
      (product) =>
        product.id === Number(form.productId),
    );

    if (
      !selectedProduct ||
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      Number(form.riders) < 1
    ) {
      return;
    }

    if (editingItem) {
      updateItems(
        items.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                productId:
                  selectedProduct.id,
                productName:
                  selectedProduct.name,
                date: form.date,
                startTime: form.startTime,
                endTime: form.endTime,
                riders: Number(form.riders),
                priceOverride:
                  form.priceOverride
                    ? Number(
                        form.priceOverride,
                      )
                    : null,
                status: form.status,
              }
            : item,
        ),
      );
    } else {
      const newItem: AvailabilityItem = {
        id: Date.now(),
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        riders: Number(form.riders),
        priceOverride: form.priceOverride
          ? Number(form.priceOverride)
          : null,
        status: form.status,
      };

      updateItems([newItem, ...items]);
    }

    setFormOpen(false);
    setEditingItem(null);
    setForm(emptyForm);
  };

  const removeItem = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this availability slot?",
    );

    if (!confirmed) {
      return;
    }

    updateItems(
      items.filter((item) => item.id !== id),
    );
  };

  const toggleStatus = (
    selectedItem: AvailabilityItem,
  ) => {
    updateItems(
      items.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status:
                item.status === "Available"
                  ? "Unavailable"
                  : "Available",
            }
          : item,
      ),
    );
  };

  return (
    <SiteLayout>
      <section className="container-wide py-10 sm:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge className="bg-gold text-gold-foreground">
              Schedule Management
            </Badge>

            <h1 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">
              Availability
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage product dates, timings,
              rider limits and pricing.
            </p>
          </div>

          <Button
            onClick={openAddForm}
            className="w-fit bg-forest text-forest-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Availability
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search product..."
              className="pl-10"
            />
          </div>

          <Input
            type="date"
            value={filterDate}
            onChange={(event) =>
              setFilterDate(event.target.value)
            }
            className="sm:w-52"
          />

          {filterDate && (
            <Button
              variant="outline"
              onClick={() => setFilterDate("")}
            >
              Clear Date
            </Button>
          )}
        </div>

        <div className="mt-7 grid gap-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-border/60 bg-card p-5 shadow-elegant sm:p-6"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-semibold text-forest">
                      {item.productName}
                    </h2>

                    <Badge
                      variant={
                        item.status === "Available"
                          ? "default"
                          : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-5">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-forest" />
                      {item.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-forest" />
                      {item.startTime}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-forest" />
                      {item.endTime}
                    </span>

                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-forest" />
                      {item.riders} riders
                    </span>

                    <span>
                      Price:{" "}
                      {item.priceOverride
                        ? `$${item.priceOverride}`
                        : "Default"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      openEditForm(item)
                    }
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      toggleStatus(item)
                    }
                  >
                    {item.status === "Available"
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No availability slots found.
          </div>
        )}
      </section>

      <Dialog
        open={formOpen}
        onOpenChange={setFormOpen}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? "Edit Availability"
                : "Add Availability"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="product">
                Product
              </Label>

              <select
                id="product"
                value={form.productId}
                onChange={(event) =>
                  setForm({
                    ...form,
                    productId:
                      event.target.value,
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                required
              >
                <option value="">
                  Select product
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">
                Available Date
              </Label>

              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm({
                    ...form,
                    date: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="riders">
                Maximum Riders
              </Label>

              <Input
                id="riders"
                type="number"
                min="1"
                value={form.riders}
                onChange={(event) =>
                  setForm({
                    ...form,
                    riders: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="start-time">
                Start Time
              </Label>

              <Input
                id="start-time"
                type="time"
                value={form.startTime}
                onChange={(event) =>
                  setForm({
                    ...form,
                    startTime:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="end-time">
                End Time
              </Label>

              <Input
                id="end-time"
                type="time"
                value={form.endTime}
                onChange={(event) =>
                  setForm({
                    ...form,
                    endTime:
                      event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="override">
                Price Override
              </Label>

              <Input
                id="override"
                type="number"
                min="0"
                placeholder="Optional"
                value={form.priceOverride}
                onChange={(event) =>
                  setForm({
                    ...form,
                    priceOverride:
                      event.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">
                Status
              </Label>

              <select
                id="status"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target
                      .value as
                      | "Available"
                      | "Unavailable",
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Available">
                  Available
                </option>

                <option value="Unavailable">
                  Unavailable
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-3 sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-forest text-forest-foreground"
              >
                Save Availability
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}