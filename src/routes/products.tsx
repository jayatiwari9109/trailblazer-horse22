import { createFileRoute } from "@tanstack/react-router";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Edit3,
  Eye,
  MapPin,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
  X,
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
  getProducts,
  Product,
  ProductStatus,
  saveProducts,
} from "@/lib/dashboard-store";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "Products — Horse Trails",
      },
      {
        name: "description",
        content:
          "Manage horse trail products and experiences.",
      },
    ],
  }),
  component: Products,
});

type ProductForm = {
  name: string;
  location: string;
  price: string;
  rating: string;
  status: ProductStatus;
  image: string;
  duration: string;
  capacity: string;
};

const emptyForm: ProductForm = {
  name: "",
  location: "",
  price: "",
  rating: "4.5",
  status: "Active",
  image:
    "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=80",
  duration: "2 Hours",
  capacity: "8",
};

function Products() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [formOpen, setFormOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [form, setForm] =
    useState<ProductForm>(emptyForm);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const updateProducts = (
    updatedProducts: Product[],
  ) => {
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(keyword) ||
        product.location
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      location: product.location,
      price: String(product.price),
      rating: String(product.rating),
      status: product.status,
      image: product.image,
      duration: product.duration,
      capacity: String(product.capacity),
    });

    setFormOpen(true);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.location.trim() ||
      Number(form.price) <= 0 ||
      Number(form.capacity) <= 0
    ) {
      return;
    }

    if (editingProduct) {
      const updated = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: form.name.trim(),
              location: form.location.trim(),
              price: Number(form.price),
              rating: Number(form.rating),
              status: form.status,
              image: form.image.trim(),
              duration: form.duration.trim(),
              capacity: Number(form.capacity),
            }
          : product,
      );

      updateProducts(updated);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: form.name.trim(),
        location: form.location.trim(),
        price: Number(form.price),
        rating: Number(form.rating),
        status: form.status,
        image: form.image.trim(),
        duration: form.duration.trim(),
        capacity: Number(form.capacity),
        views: 0,
      };

      updateProducts([newProduct, ...products]);
    }

    setFormOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const confirmDelete = () => {
    if (!selectedProduct) {
      return;
    }

    updateProducts(
      products.filter(
        (product) =>
          product.id !== selectedProduct.id,
      ),
    );

    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  const toggleStatus = (product: Product) => {
    const nextStatus: ProductStatus =
      product.status === "Active"
        ? "Inactive"
        : "Active";

    updateProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              status: nextStatus,
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
              Product Management
            </Badge>

            <h1 className="mt-3 font-display text-3xl font-bold text-forest sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add, edit and manage horse trails and
              experiences.
            </p>
          </div>

          <Button
            type="button"
            onClick={openAddForm}
            className="w-fit bg-forest text-forest-foreground hover:bg-forest/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
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
              placeholder="Search product or location..."
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="All">
              All Status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Draft">
              Draft
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(product);
                  setDetailsOpen(true);
                }}
                className="relative block aspect-[4/3] w-full overflow-hidden text-left"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <Badge className="absolute left-4 top-4 bg-background/90 text-foreground">
                  {product.status}
                </Badge>
              </button>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {product.name}
                  </h2>

                  <span className="font-display text-lg font-bold text-forest">
                    ${product.price}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                  </span>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      {product.rating}
                    </span>

                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {product.capacity} riders
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      openEditForm(product)
                    }
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedProduct(product);
                      setDetailsOpen(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      toggleStatus(product)
                    }
                  >
                    {product.status === "Active"
                      ? "Deactivate"
                      : "Activate"}
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No products found.
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
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="product-name">
                Product Name
              </Label>

              <Input
                id="product-name"
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-location">
                Location
              </Label>

              <Input
                id="product-location"
                value={form.location}
                onChange={(event) =>
                  setForm({
                    ...form,
                    location: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-price">
                Price
              </Label>

              <Input
                id="product-price"
                type="number"
                min="1"
                value={form.price}
                onChange={(event) =>
                  setForm({
                    ...form,
                    price: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-rating">
                Rating
              </Label>

              <Input
                id="product-rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(event) =>
                  setForm({
                    ...form,
                    rating: event.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-capacity">
                Maximum Riders
              </Label>

              <Input
                id="product-capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={(event) =>
                  setForm({
                    ...form,
                    capacity: event.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-duration">
                Duration
              </Label>

              <Input
                id="product-duration"
                value={form.duration}
                onChange={(event) =>
                  setForm({
                    ...form,
                    duration: event.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="product-status">
                Status
              </Label>

              <select
                id="product-status"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status:
                      event.target
                        .value as ProductStatus,
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Active">
                  Active
                </option>
                <option value="Draft">
                  Draft
                </option>
                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="product-image">
                Image URL
              </Label>

              <Input
                id="product-image"
                value={form.image}
                onChange={(event) =>
                  setForm({
                    ...form,
                    image: event.target.value,
                  })
                }
              />
            </div>

            {form.image && (
              <img
                src={form.image}
                alt="Product preview"
                className="h-48 w-full rounded-2xl object-cover sm:col-span-2"
              />
            )}

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
                Save Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >
        <DialogContent className="max-w-xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-60 w-full rounded-2xl object-cover"
              />

              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedProduct.location}
                </p>

                <p>
                  <strong>Price:</strong> $
                  {selectedProduct.price}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {selectedProduct.duration}
                </p>

                <p>
                  <strong>Capacity:</strong>{" "}
                  {selectedProduct.capacity} riders
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  {selectedProduct.rating}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedProduct.status}
                </p>

                <p>
                  <strong>Views:</strong>{" "}
                  {selectedProduct.views}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Delete Product
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground">
            Are you sure you want to delete{" "}
            <strong>
              {selectedProduct?.name}
            </strong>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() =>
                setDeleteOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
