export type ProductStatus = "Active" | "Draft" | "Inactive";

export type Product = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  status: ProductStatus;
  image: string;
  duration: string;
  capacity: number;
  views: number;
};

export type AvailabilityItem = {
  id: number;
  productId: number;
  productName: string;
  date: string;
  startTime: string;
  endTime: string;
  riders: number;
  priceOverride: number | null;
  status: "Available" | "Unavailable";
};

export type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export type Booking = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  trail: string;
  location: string;
  date: string;
  time: string;
  riders: number;
  amount: number;
  status: BookingStatus;
  productId: number;
};

const PRODUCTS_KEY = "horse-trails-products";
const AVAILABILITY_KEY = "horse-trails-availability";
const BOOKINGS_KEY = "horse-trails-bookings";

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Aspen Mountain Trail",
    location: "Aspen, Colorado",
    price: 120,
    rating: 4.9,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=80",
    duration: "2 Hours",
    capacity: 8,
    views: 3280,
  },
  {
    id: 2,
    name: "Golden Beach Ride",
    location: "Big Sur, California",
    price: 145,
    rating: 4.8,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&w=900&q=80",
    duration: "90 Minutes",
    capacity: 6,
    views: 2940,
  },
  {
    id: 3,
    name: "Forest Adventure Ride",
    location: "Montana, USA",
    price: 115,
    rating: 4.7,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1508343919546-4a5792fee935?auto=format&fit=crop&w=900&q=80",
    duration: "3 Hours",
    capacity: 10,
    views: 1960,
  },
];

export const defaultAvailability: AvailabilityItem[] = [
  {
    id: 1,
    productId: 1,
    productName: "Aspen Mountain Trail",
    date: "2026-07-28",
    startTime: "08:30",
    endTime: "10:30",
    riders: 8,
    priceOverride: null,
    status: "Available",
  },
  {
    id: 2,
    productId: 2,
    productName: "Golden Beach Ride",
    date: "2026-07-30",
    startTime: "16:00",
    endTime: "17:30",
    riders: 6,
    priceOverride: 155,
    status: "Available",
  },
];

export const defaultBookings: Booking[] = [
  {
    id: "HT-1001",
    customer: "Sophia Miller",
    email: "sophia@example.com",
    phone: "+1 555 101 2020",
    trail: "Aspen Mountain Trail",
    location: "Aspen, Colorado",
    date: "28 July 2026",
    time: "08:30 AM",
    riders: 2,
    amount: 240,
    status: "Confirmed",
    productId: 1,
  },
  {
    id: "HT-1002",
    customer: "Daniel Carter",
    email: "daniel@example.com",
    phone: "+1 555 303 4040",
    trail: "Golden Beach Ride",
    location: "Big Sur, California",
    date: "4 August 2026",
    time: "05:00 PM",
    riders: 3,
    amount: 435,
    status: "Pending",
    productId: 2,
  },
  {
    id: "HT-1003",
    customer: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1 555 505 6060",
    trail: "Forest Adventure Ride",
    location: "Montana, USA",
    date: "12 August 2026",
    time: "10:00 AM",
    riders: 1,
    amount: 115,
    status: "Cancelled",
    productId: 3,
  },
  {
    id: "HT-1004",
    customer: "James Walker",
    email: "james@example.com",
    phone: "+1 555 707 8080",
    trail: "Aspen Mountain Trail",
    location: "Aspen, Colorado",
    date: "18 July 2026",
    time: "09:00 AM",
    riders: 4,
    amount: 480,
    status: "Completed",
    productId: 1,
  },
];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(data));

  window.dispatchEvent(
    new CustomEvent("horse-trails-data-updated", {
      detail: {
        key,
      },
    }),
  );
}

export function getProducts() {
  return readStorage<Product[]>(
    PRODUCTS_KEY,
    defaultProducts,
  );
}

export function saveProducts(products: Product[]) {
  writeStorage(PRODUCTS_KEY, products);
}

export function getAvailability() {
  return readStorage<AvailabilityItem[]>(
    AVAILABILITY_KEY,
    defaultAvailability,
  );
}

export function saveAvailability(
  availability: AvailabilityItem[],
) {
  writeStorage(AVAILABILITY_KEY, availability);
}

export function getBookings() {
  return readStorage<Booking[]>(
    BOOKINGS_KEY,
    defaultBookings,
  );
}

export function saveBookings(bookings: Booking[]) {
  writeStorage(BOOKINGS_KEY, bookings);
}