import hero from "@/assets/hero.jpg";
import t1 from "@/assets/trail-1.jpg";
import t2 from "@/assets/trail-2.jpg";
import t3 from "@/assets/trail-3.jpg";
import t4 from "@/assets/trail-4.jpg";
import t5 from "@/assets/trail-5.jpg";
import t6 from "@/assets/trail-6.jpg";
import t7 from "@/assets/trail-7.jpg";
import t8 from "@/assets/trail-8.jpg";
import portrait from "@/assets/horse-portrait.jpg";

export const images = { hero, portrait, t1, t2, t3, t4, t5, t6, t7, t8 };

export type Trail = {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  country: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  duration: string;
  hours: number;
  distanceKm: number;
  price: number;
  originalPrice?: number;
  slots: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  breed: string;
  category: string;
  instant: boolean;
  private: boolean;
  tags: string[];
  short: string;
  description: string;
  included: string[];
  notIncluded: string[];
  bring: string[];
  meetingPoint: string;
  cancellation: string;
};

export const categories = [
  { key: "sunrise", label: "Sunrise Ride", icon: "Sunrise", image: t1 },
  { key: "sunset", label: "Sunset Ride", icon: "Sunset", image: t2 },
  { key: "family", label: "Family Ride", icon: "Users", image: t3 },
  { key: "private", label: "Private Ride", icon: "Lock", image: t5 },
  { key: "couple", label: "Couple Ride", icon: "Heart", image: t5 },
  { key: "kids", label: "Kids Ride", icon: "Baby", image: t6 },
  { key: "training", label: "Horse Training", icon: "GraduationCap", image: t3 },
  { key: "camping", label: "Horse Camping", icon: "Tent", image: t7 },
  { key: "photography", label: "Photography", icon: "Camera", image: t2 },
  { key: "safari", label: "Horse Safari", icon: "Compass", image: t8 },
  { key: "trekking", label: "Trekking", icon: "Mountain", image: t4 },
  { key: "events", label: "Events", icon: "PartyPopper", image: t5 },
] as const;

export const trails: Trail[] = [
  {
    id: "1", slug: "aspen-sunrise-ridge", name: "Aspen Sunrise Ridge",
    location: "Aspen, Colorado", city: "Aspen", country: "USA",
    image: t1, gallery: [t1, t4, t3, hero],
    rating: 4.9, reviews: 342, duration: "3 hours", hours: 3, distanceKm: 12,
    price: 189, originalPrice: 249, slots: 6,
    difficulty: "Moderate", breed: "Quarter Horse", category: "sunrise",
    instant: true, private: false, tags: ["Popular", "Sunrise"],
    short: "Golden light through alpine pines with panoramic ridge views.",
    description: "Rise before dawn and traverse the storied Aspen ridgeline as first light spills across the peaks. Our seasoned Quarter Horses know every switchback, giving even intermediate riders a confident, unforgettable ascent.",
    included: ["Certified guide", "Helmet & safety gear", "Hot coffee & pastries", "Trail insurance"],
    notIncluded: ["Transport to ranch", "Gratuities", "Professional photos"],
    bring: ["Long trousers", "Closed-toe boots", "Sunscreen", "Layered jacket"],
    meetingPoint: "Silver Bell Ranch, 4210 Castle Creek Rd, Aspen CO",
    cancellation: "Free cancellation up to 48 hours before the ride.",
  },
  {
    id: "2", slug: "pacific-sunset-shoreline", name: "Pacific Sunset Shoreline",
    location: "Big Sur, California", city: "Big Sur", country: "USA",
    image: t2, gallery: [t2, t5, hero],
    rating: 4.95, reviews: 512, duration: "2 hours", hours: 2, distanceKm: 8,
    price: 219, slots: 4,
    difficulty: "Easy", breed: "Andalusian", category: "sunset",
    instant: true, private: true, tags: ["Featured", "Sunset"],
    short: "Gallop along a private Pacific beach as the sky turns amber.",
    description: "A signature ride along a private stretch of Big Sur coast, timed exactly to golden hour. Elegant Andalusians, warm blankets, and a bottle of local sparkling wine waiting at the turnaround point.",
    included: ["Private guide", "Sparkling wine toast", "Photography stops", "All gear"],
    notIncluded: ["Dinner", "Hotel transfer"],
    bring: ["Warm layers", "Camera", "Sense of adventure"],
    meetingPoint: "Andrew Molera trailhead, Big Sur CA",
    cancellation: "Free cancellation up to 72 hours before the ride.",
  },
  {
    id: "3", slug: "meadowlark-family-loop", name: "Meadowlark Family Loop",
    location: "Cotswolds, England", city: "Cotswolds", country: "UK",
    image: t3, gallery: [t3, t6, t1],
    rating: 4.8, reviews: 218, duration: "1.5 hours", hours: 1.5, distanceKm: 5,
    price: 129, slots: 8,
    difficulty: "Easy", breed: "Welsh Cob", category: "family",
    instant: true, private: false, tags: ["Family", "Beginner"],
    short: "A gentle wildflower meadow loop perfect for the whole family.",
    description: "Designed for families with children eight and older. Our calm Welsh Cobs walk a signposted loop through wildflower meadows, with a picnic stop at a photogenic stone bridge.",
    included: ["Family guide", "Kid-sized helmets", "Picnic snacks", "Family photo"],
    notIncluded: ["Full lunch", "Hotel transfer"],
    bring: ["Sun hat", "Water bottle", "Long trousers"],
    meetingPoint: "Bourton Riding Centre, Bourton-on-the-Water",
    cancellation: "Free cancellation up to 24 hours before the ride.",
  },
  {
    id: "4", slug: "red-canyon-trek", name: "Red Canyon Trek",
    location: "Moab, Utah", city: "Moab", country: "USA",
    image: t4, gallery: [t4, hero, t1],
    rating: 4.85, reviews: 176, duration: "6 hours", hours: 6, distanceKm: 22,
    price: 349, slots: 6,
    difficulty: "Challenging", breed: "Mustang", category: "trekking",
    instant: false, private: false, tags: ["Adventure", "Full Day"],
    short: "Cross rivers and slot canyons on a full-day mustang trek.",
    description: "A serious day in the saddle for confident riders. Wade shallow rivers, thread through red slot canyons, and lunch beneath a hidden waterfall.",
    included: ["Expert guide", "Trail lunch", "Saddlebags", "Emergency comms"],
    notIncluded: ["Alcohol", "Solo tips"],
    bring: ["Riding gloves", "Sun protection", "3L water"],
    meetingPoint: "Red Cliffs Lodge, Moab UT",
    cancellation: "50% refund up to 72 hours before the ride.",
  },
  {
    id: "5", slug: "tuscan-vineyard-couples", name: "Tuscan Vineyard Couples Ride",
    location: "Chianti, Italy", city: "Chianti", country: "Italy",
    image: t5, gallery: [t5, t2, portrait],
    rating: 4.97, reviews: 289, duration: "2.5 hours", hours: 2.5, distanceKm: 9,
    price: 279, originalPrice: 329, slots: 2,
    difficulty: "Easy", breed: "Maremmano", category: "couple",
    instant: true, private: true, tags: ["Romantic", "Luxury"],
    short: "A private ride through Chianti vines ending with a wine tasting.",
    description: "Two horses, one perfect afternoon. Wind through terraced vineyards to a family cantina for a curated tasting of three Chianti Classicos.",
    included: ["Private guide", "Wine tasting", "Cheese board", "Return transfer"],
    notIncluded: ["Bottles to take home"],
    bring: ["Comfortable trousers", "Light jacket"],
    meetingPoint: "Tenuta Il Poggio, Greve in Chianti",
    cancellation: "Free cancellation up to 48 hours before the ride.",
  },
  {
    id: "6", slug: "pony-club-first-canter", name: "Pony Club First Canter",
    location: "Killarney, Ireland", city: "Killarney", country: "Ireland",
    image: t6, gallery: [t6, t3],
    rating: 4.9, reviews: 431, duration: "1 hour", hours: 1, distanceKm: 3,
    price: 69, slots: 10,
    difficulty: "Easy", breed: "Connemara Pony", category: "kids",
    instant: true, private: false, tags: ["Kids", "Beginner"],
    short: "A patient first ride for children aged 5–12 with expert instructors.",
    description: "Our safest introduction to riding: gentle Connemara ponies, one-to-one guidance, and a graduation rosette to take home.",
    included: ["Instructor", "Full safety gear", "Certificate", "Photo"],
    notIncluded: ["Parent ride"],
    bring: ["Long trousers", "Sturdy shoes"],
    meetingPoint: "Killarney Riding Stables",
    cancellation: "Free cancellation up to 24 hours before the ride.",
  },
  {
    id: "7", slug: "highlands-overnight-camp", name: "Highlands Overnight Camp",
    location: "Cairngorms, Scotland", city: "Cairngorms", country: "UK",
    image: t7, gallery: [t7, t4, hero],
    rating: 4.88, reviews: 154, duration: "2 days", hours: 24, distanceKm: 34,
    price: 599, slots: 6,
    difficulty: "Challenging", breed: "Highland Pony", category: "camping",
    instant: false, private: false, tags: ["Overnight", "Adventure"],
    short: "Two days across the Cairngorms with a canvas camp by a loch.",
    description: "Ride sturdy Highland Ponies across heather moors to a private canvas camp on the shore of a hidden loch. Whisky by the fire included.",
    included: ["Two guides", "All meals", "Canvas tent", "Sleeping gear"],
    notIncluded: ["Personal riding boots", "Trip insurance"],
    bring: ["Waterproofs", "Warm layers", "Head torch"],
    meetingPoint: "Rothiemurchus Estate, Aviemore",
    cancellation: "50% refund up to 14 days before the ride.",
  },
  {
    id: "8", slug: "serengeti-horse-safari", name: "Serengeti Horse Safari",
    location: "Serengeti, Tanzania", city: "Serengeti", country: "Tanzania",
    image: t8, gallery: [t8, t4, portrait],
    rating: 4.99, reviews: 98, duration: "3 hours", hours: 3, distanceKm: 15,
    price: 459, slots: 5,
    difficulty: "Moderate", breed: "Boerperd", category: "safari",
    instant: false, private: false, tags: ["Luxury", "Wildlife"],
    short: "Ride amongst giraffes and zebras on the open plains.",
    description: "A truly rare experience: horseback among the great herds. Our safari-trained Boerperds move quietly enough to bring you within meters of grazing giraffes.",
    included: ["Armed guide", "Refreshments", "Photographer"],
    notIncluded: ["Park fees", "Charter flights"],
    bring: ["Neutral clothing", "Wide-brim hat"],
    meetingPoint: "Singita Grumeti airstrip pickup",
    cancellation: "50% refund up to 30 days before the ride.",
  },
];

export const testimonials = [
  { name: "Sophia Reyes", location: "New York, USA", rating: 5,
    text: "The sunset ride in Big Sur was pure cinema. Every detail — from the horses to the wine at the turnaround — felt curated for us.",
    avatar: "https://i.pravatar.cc/120?img=47" },
  { name: "Liam O'Sullivan", location: "Dublin, Ireland", rating: 5,
    text: "Our kids finished the Pony Club ride grinning ear to ear. Best money I've ever spent on a family day out.",
    avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Amara Okafor", location: "Lagos, Nigeria", rating: 5,
    text: "The Serengeti horse safari changed how I think about wildlife travel. Unreal proximity, world-class guides.",
    avatar: "https://i.pravatar.cc/120?img=32" },
  { name: "Hiroshi Tanaka", location: "Kyoto, Japan", rating: 5,
    text: "As a first-time rider I was nervous — the team put me completely at ease. Aspen ridge at sunrise, I still dream about it.",
    avatar: "https://i.pravatar.cc/120?img=68" },
];

export const faqs = [
  { q: "Do I need prior riding experience?", a: "No. Every trail is graded Easy, Moderate, or Challenging. Beginners are welcome on all Easy rides and most Moderate rides — filter the trails page by difficulty to see what fits you." },
  { q: "What is your cancellation policy?", a: "Most bookings can be cancelled free of charge up to 48 hours before the ride. Multi-day and safari bookings have longer windows shown on each trail page." },
  { q: "Are helmets and safety gear included?", a: "Yes. Certified helmets, boots (on request), and safety briefings are included with every booking at no additional cost." },
  { q: "What is the minimum age for children?", a: "Kids Rides start from age 5 with a dedicated instructor. Family and Sunrise rides typically require age 8+; each trail page lists its own minimum age." },
  { q: "What happens if the weather is bad?", a: "Rides run in most weather. If our team cancels due to unsafe conditions, you receive a full refund or free rescheduling — your choice." },
  { q: "Can I book a fully private experience?", a: "Yes. Any trail can be booked privately for you and your group — toggle the Private option on the booking widget for a live private-ride quote." },
];

// export const galleryImages = [t1, t2, t3, t4, t5, t6, t7, t8, hero, portrait, t2, t3];
// export const galleryImages = [
//   {
//     src: t1,
//     category: "Trails",
//   },
//   {
//     src: t2,
//     category: "Trails",
//   },
//   {
//     src: t3,
//     category: "Horses",
//   },
//   {
//     src: portrait,
//     category: "Horses",
//   },
//   {
//     src: t4,
//     category: "Adventure",
//   },
//   {
//     src: t5,
//     category: "Adventure",
//   },
//   {
//     src: hero,
//     category: "Drone",
//   },
//   {
//     src: t8,
//     category: "Drone",
//   },
//   {
//     src: t6,
//     category: "Horses",
//   },
//   {
//     src: t7,
//     category: "Adventure",
//   },
//   {
//     src: t2,
//     category: "Trails",
//   },
//   {
//     src: t3,
//     category: "Horses",
//   },
// ];
export const galleryImages = [
  // trails
  // TRAILS
{ src: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
{ src: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1200", category: "Trails" },
  

// HORSES
{ src: "https://i.pinimg.com/736x/88/d8/3e/88d83e53b5a21a9e935ccba97f3758e8.jpg", category: "Horses" },
{ src: "https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&w=1200&q=80", category: "Horses" },
{ src: "https://i.pinimg.com/1200x/b2/87/b9/b287b912cda171fb36fe6b2d73bdb1d3.jpg", category: "Horses" },
{ src: "https://i.pinimg.com/736x/6e/7f/44/6e7f447e8a547f5cd451e3307481ec55.jpg", category: "Horses" },
{ src: "https://i.pinimg.com/736x/29/3d/1e/293d1e1b2fe21bcc0b2288ec47e30c00.jpg", category: "Horses" },
{ src: "https://i.pinimg.com/736x/ba/34/ed/ba34ed55241617465d6f0e9cdefd374f.jpg", category: "Horses" },
{ src: "https://i.pinimg.com/736x/3f/25/95/3f25953e00007c2ead86044454117a6b.jpg", category: "Horses" },
{ src: "https://i.pinimg.com/736x/a0/50/23/a05023cc7eefed0a38f1dc7491f2f1e6.jpg", category: "Horses" },

// Adventure
  { src: "https://i.pinimg.com/1200x/ca/12/bf/ca12bf6eededd3609398dc9ceaaac8f8.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/736x/9f/fb/02/9ffb023ea740b52a3c39e50728fbe522.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/736x/88/a0/77/88a0772b8427d825e9394b30cd3d52e5.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/736x/0d/55/14/0d55148c6d9053dd4394367dfdee9368.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/1200x/01/95/a7/0195a770b3e8c5d5796d7aded5ec1a7d.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/736x/33/6a/c9/336ac957e336f5be8b104f6483fd3fca.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/1200x/45/fc/5b/45fc5b52ad394546036e6a9c63059207.jpg", category: "Adventure" },
  { src: "https://i.pinimg.com/1200x/45/fc/5b/45fc5b52ad394546036e6a9c63059207.jpg", category: "Adventure" },

  // drone

  { src: "https://picsum.photos/id/1050/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1051/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1052/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1053/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1054/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1055/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1056/800/600", category: "Drone" },
  { src: "https://picsum.photos/id/1057/800/600", category: "Drone" },
];
export const posts = [
  { slug: "beginners-guide", title: "A Beginner's Guide to Your First Trail Ride", category: "Tips", date: "Mar 12, 2026", image: t3, excerpt: "Everything you need to know before mounting up for the first time — from what to wear to how to communicate with your horse." },
  { slug: "safety-standards", title: "Behind Our Safety Standards", category: "Safety", date: "Feb 28, 2026", image: t6, excerpt: "How we vet every ranch, guide, and horse before adding them to the Horse Trails marketplace." },
  { slug: "sunrise-vs-sunset", title: "Sunrise vs Sunset: Which Ride is Right for You?", category: "Adventure", date: "Feb 04, 2026", image: t1, excerpt: "Two very different moods, two very different rides. Our guides break down the light, the pace, and the vibe." },
  { slug: "training-your-seat", title: "Training Your Seat in 30 Days", category: "Training", date: "Jan 20, 2026", image: t5, excerpt: "A month-long program from our head instructor to build the balance and confidence of a serious rider." },
];
