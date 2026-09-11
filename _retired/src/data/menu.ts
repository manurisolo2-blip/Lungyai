import type { Category, MenuItem, ProteinOption, ExtraOption } from "@/types/lungyai";

export const RESTAURANT_INFO = {
  name: "Lung Yai Thai Tapas",
  tagline: "Bangkok Street Food · Michelin Bib Gourmand",
  address: "1731 SW 8th St, Miami, FL 33135",
  neighborhood: "Little Havana / Calle Ocho",
  phone: "(305) 649-4766",
  phoneRaw: "+13056494766",
  whatsapp: "+13056494766",
  hours: {
    days: "Wednesday – Monday (Closed Tuesday)",
    time: "5:00 PM – 11:00 PM",
    lunch: "Fri – Sun: 12:00 PM – 3:00 PM",
    dinner: "Daily: 5:00 PM – 11:00 PM",
  },
  awards: [
    { year: "2025", title: "Michelin Guide Bib Gourmand", desc: "Recognized for exceptional quality and authentic Bangkok street flavors at great value." },
    { year: "2023", title: "Michelin Guide Bib Gourmand", desc: "Consecutive honor for uncompromising authenticity." },
    { year: "2022", title: "Inaugural Florida Michelin Guide", desc: "First Thai restaurant in Miami to receive the Bib Gourmand distinction." },
    { year: "2021", title: "Miami New Times", desc: "Best Thai Restaurant in Miami." },
  ],
  policies: [
    {
      title: "The Single-Order Symphony (Comanda Única)",
      badge: "Wok Hei Philosophy",
      short: "Order all food items at once.",
      description:
        "Our high-velocity woks ignite at over 500°F (Wok Hei). Dishes exit the flame within seconds of searing to preserve crisp textures and volatile herbal aromatics. To coordinate this culinary rhythm without disrupting the flame, all food must be ordered together upon seating.",
    },
    {
      title: "Walk-Ins Only",
      badge: "Street Spirit",
      short: "No reservations needed.",
      description:
        "In true Bangkok night-market tradition, we seat guests on a first-come, first-served basis. Add your name at our door host, soak in the Calle Ocho rhythm, and we will seat you promptly.",
    },
    {
      title: "Complete Parties Only",
      badge: "Intimate Dining",
      short: "Seated when everyone arrives.",
      description:
        "Our cozy Little Havana dining room fills rapidly. To honor everyone waiting in line, parties are invited inside once every member has arrived.",
    },
  ],
};

export const defaultProteinOptions: ProteinOption[] = [
  { id: "chicken", name: "Free-range Chicken (Gai)", extraPrice: 0 },
  { id: "pork", name: "Tender Pork Shoulder (Moo)", extraPrice: 0 },
  { id: "tofu", name: "Crispy Organic Tofu & Bok Choy", extraPrice: 0 },
  { id: "beef", name: "Marinated Flank Steak (Neua)", extraPrice: 3.5 },
  { id: "shrimp", name: "Wild Tiger Prawns (Goong)", extraPrice: 4.5 },
  { id: "duck", name: "Roasted Crispy Duck (Ped)", extraPrice: 6.0 },
];

export const defaultExtraOptions: ExtraOption[] = [
  { id: "egg", name: "Crispy Fried Thai Egg (Kai Dao)", price: 2.5 },
  { id: "jasmine-rice", name: "Steamed Fragrant Jasmine Rice", price: 3.0 },
  { id: "sticky-rice", name: "Warm Thai Sticky Rice (Khao Niew)", price: 3.5 },
  { id: "crispy-noodles", name: "Crisp Fried Egg Noodles", price: 2.0 },
  { id: "pickled-chili", name: "House Fermented Bird's Eye Chilis & Garlic", price: 1.5 },
];

export const categories: Category[] = [
  {
    id: "insignias",
    name: "Michelin & Chef Signatures",
    thaiSubtitle: "อาหารแนะนำพิเศษ",
    description: "The crown jewels of Chef Bas: legendary recipes celebrated by the Michelin Guide.",
  },
  {
    id: "noodles",
    name: "Noodle Bowls & Soups",
    thaiSubtitle: "ก๋วยเตี๋ยวรสเด็ด",
    description: "Handcrafted egg noodles, slow-simmered broths, and authentic Northern Thai curries.",
  },
  {
    id: "wok",
    name: "Wok Hei Stir-Fry",
    thaiSubtitle: "ผัดไฟแรงกระทะเหล็ก",
    description: "Seared over roaring 500°F fire to seal in smoke, garlic, chili, and holy basil.",
  },
  {
    id: "tapas",
    name: "Street Tapas & Skewers",
    thaiSubtitle: "อาหารว่างสตรีทฟู้ด",
    description: "Small plates, grilled skewers, and herbaceous Northern Thai sausages perfect for sharing.",
  },
  {
    id: "curries",
    name: "Fragrant Curries",
    thaiSubtitle: "แกงไทยเข้มข้น",
    description: "Simmered fresh coconut cream, hand-pounded herbs, Thai eggplants and kaffir lime leaves.",
  },
  {
    id: "duck-specials",
    name: "Crispy Duck & House Plates",
    thaiSubtitle: "เป็ดย่างกรอบสูตรลับ",
    description: "Golden crispy skin duck, rich tamarind glazes, and house-specialty seafood.",
  },
  {
    id: "drinks-desserts",
    name: "Desserts & Refreshments",
    thaiSubtitle: "ของหวานและเครื่องดื่ม",
    description: "Traditional Thai iced drinks, sweet mango sticky rice, and chilled Singha beers.",
  },
];

export const menuItems: MenuItem[] = [
  // --- Michelin & Chef Signatures ---
  {
    id: "khao-soi-gai",
    name: "Khao Soi Chiang Mai",
    thaiName: "ข้าวซอยไก่เชียงใหม่",
    description:
      "Legendary Northern Thai curry soup with tender chicken drumstick, fresh egg noodles, topped with a nest of golden crispy noodles, pickled mustard greens, shallots, roasted chili oil, and lime wedge.",
    price: 18.5,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category: "insignias",
    badge: "Michelin Recommended",
    defaultSpice: 2,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "crispy-tamarind-duck",
    name: "Crispy Tamarind Duck (Ped Krob)",
    thaiName: "เป็ดกรอบซอสมะขาม",
    description:
      "Half roasted duck with impeccably crackling crispy skin, bathed in Chef Bas's sweet-sour tamarind reduction, wok-fried crispy holy basil leaves, and toasted cashews over steamed bok choy.",
    price: 27.0,
    image: "https://images.unsplash.com/photo-1514944298350-93ff912a2334?auto=format&fit=crop&w=800&q=80",
    category: "insignias",
    badge: "Chef Signature",
    defaultSpice: 1,
    customizable: true,
    extrasAllowed: true,
  },
  {
    id: "moo-ping-skewers",
    name: "Moo Ping with Sticky Rice",
    thaiName: "หมูปิ้งข้าวเหนียวนุ่ม",
    description:
      "Three grilled skewers of tender pork shoulder marinated for 24 hours in condensed milk, garlic, white pepper, and cilantro roots, served with hot sticky rice in banana leaf and nam jim jaew (smoky tamarind chili dip).",
    price: 13.5,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
    category: "insignias",
    badge: "House Specialty",
    defaultSpice: 1,
    customizable: false,
  },

  // --- Noodle Bowls & Soups ---
  {
    id: "pad-thai-boran",
    name: "Pad Thai Boran (Old-School)",
    thaiName: "ผัดไทยโบราณ",
    description:
      "Thin rice noodles wok-charred with authentic tamarind paste, dried shrimp, pressed yellow tofu, sweet pickled radish, garlic chives, crunchy bean sprouts, toasted peanuts, and fresh lime.",
    price: 16.5,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    category: "noodles",
    badge: "Street Classic",
    defaultSpice: 1,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "pad-kee-mao",
    name: "Pad Kee Mao (Drunken Noodles)",
    thaiName: "ผัดขี้เมาเส้นใหญ่",
    description:
      "Wide flat rice noodles blasted in the wok with intense Wok Hei heat, Thai bird's eye chilies, smashed garlic, fresh holy basil, sweet bell peppers, and young green peppercorns.",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category: "noodles",
    badge: "Spicy Favorite",
    defaultSpice: 3,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "pad-see-ew",
    name: "Pad See Ew",
    thaiName: "ผัดซีอิ๊วเตาถ่าน",
    description:
      "Wide rice noodles caramelized in dark sweet soy sauce, organic scrambled egg, and Chinese broccoli (gai lan) with signature smoky plancha aroma.",
    price: 16.5,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    category: "noodles",
    defaultSpice: 0,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "tom-yum-goong",
    name: "Tom Yum Goong",
    thaiName: "ต้มยำกุ้งน้ำข้น",
    description:
      "Aromatic lemongrass and galangal hot & sour soup with wild tiger prawns, oyster mushrooms, kaffir lime leaves, roasted chili jam, and a splash of coconut cream.",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800&q=80",
    category: "noodles",
    badge: "Michelin Recommended",
    defaultSpice: 2,
    customizable: true,
    extrasAllowed: true,
  },

  // --- Wok Hei Stir-Fry ---
  {
    id: "pad-kra-pao",
    name: "Pad Kra Pao (Holy Basil Wok)",
    thaiName: "ผัดกะเพราราดข้าวไข่ดาว",
    description:
      "Hand-minced pork or chicken flash-fried with fiery bird's eye chilis, lots of garlic, and fragrant holy basil in oyster-soy glaze. Served with a crispy sunny Thai egg over jasmine rice.",
    price: 17.0,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    category: "wok",
    badge: "Chef Signature",
    defaultSpice: 3,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "crab-fried-rice",
    name: "Khao Pad Poo (Lump Crab Fried Rice)",
    thaiName: "ข้าวผัดปูเนื้อก้อน",
    description:
      "Jasmine rice wok-tossed with jumbo lump blue crab meat, scrambled eggs, scallions, and light fish sauce seasoning, accompanied by fresh cucumber slices and spicy lime nam pla prik.",
    price: 22.0,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    category: "wok",
    badge: "House Specialty",
    defaultSpice: 0,
    customizable: false,
    extrasAllowed: true,
  },
  {
    id: "cashew-nut-stir-fry",
    name: "Gai Pad Med Mamuang (Cashew Wok)",
    thaiName: "ไก่ผัดเม็ดมะม่วงหิมพานต์",
    description:
      "Golden chicken wok-tossed with roasted whole cashews, dried smoked chilis, sweet onions, bell peppers, and scallions in a sweet-savory chili jam glaze.",
    price: 17.0,
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    category: "wok",
    defaultSpice: 1,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },

  // --- Street Tapas & Skewers ---
  {
    id: "sai-oua-sausage",
    name: "Sai Oua (Northern Thai Herb Sausage)",
    thaiName: "ไส้อั่วสมุนไพรเชียงใหม่",
    description:
      "Artisanal coarse-ground pork sausage packed with lemongrass, kaffir lime zest, turmeric, and galangal. Sliced hot off the charcoal grill with fresh ginger, peanuts, and raw bird's eye chilis.",
    price: 13.0,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    category: "tapas",
    badge: "Michelin Recommended",
    defaultSpice: 2,
    customizable: false,
  },
  {
    id: "larb-gai",
    name: "Larb Gai (Isan Herbal Chicken)",
    thaiName: "ลาบไก่ข้าวคั่วหอม",
    description:
      "Zesty warm minced chicken tossed with toasted cracked sticky rice powder, fresh mint, cilantro, red shallots, lime juice, and roasted chili powder. Served with crisp romaine hearts.",
    price: 14.0,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    category: "tapas",
    defaultSpice: 2,
    customizable: false,
  },
  {
    id: "som-tum-thai",
    name: "Som Tum Thai (Green Papaya Salad)",
    thaiName: "ส้มตำไทยถั่วลิสง",
    description:
      "Hand-shredded crunchy green papaya pounded in a clay mortar with bird's eye chili, garlic, green long beans, cherry tomatoes, dried shrimp, toasted peanuts, lime, and coconut palm sugar.",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category: "tapas",
    badge: "Street Classic",
    defaultSpice: 2,
    customizable: true,
    extrasAllowed: true,
  },

  // --- Fragrant Curries ---
  {
    id: "green-curry",
    name: "Gaeng Keow Wan (Thai Green Curry)",
    thaiName: "แกงเขียวหวานไก่กะทิสด",
    description:
      "Rich aromatic curry made with fresh green chili paste and rich coconut cream, simmered with round Thai apple eggplants, tender bamboo shoots, and fresh sweet Thai basil.",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
    category: "curries",
    badge: "Michelin Recommended",
    defaultSpice: 2,
    customizable: true,
    proteinOptions: defaultProteinOptions,
    extrasAllowed: true,
  },
  {
    id: "massaman-curry",
    name: "Massaman Short Rib Curry",
    thaiName: "แกงมัสมั่นเนื้อน่องลาย",
    description:
      "Slow-braised tender beef in warm aromatic spices—cinnamon, cloves, cardamom, roasted whole peanuts, and tender baby Yukon potatoes simmered in velvety coconut sauce.",
    price: 21.0,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    category: "curries",
    badge: "Chef Signature",
    defaultSpice: 1,
    customizable: false,
    extrasAllowed: true,
  },

  // --- Crispy Duck & House Plates ---
  {
    id: "duck-panang-curry",
    name: "Crispy Duck Panang Curry",
    thaiName: "พะแนงเป็ดกรอบใบมะกรูด",
    description:
      "Roasted crispy duck topped with thick, nutty Panang curry reduction, julienned kaffir lime leaves, and sweet red chili strips.",
    price: 26.5,
    image: "https://images.unsplash.com/photo-1514944298350-93ff912a2334?auto=format&fit=crop&w=800&q=80",
    category: "duck-specials",
    badge: "Chef Signature",
    defaultSpice: 2,
    customizable: false,
    extrasAllowed: true,
  },

  // --- Desserts & Refreshments ---
  {
    id: "mango-sticky-rice",
    name: "Mango Sticky Rice (Khao Niew Mamuang)",
    thaiName: "ข้าวเหนียวมะม่วงน้ำดอกไม้",
    description:
      "Sweet fragrant Thai sticky rice steeped in warm coconut cream, served alongside ripe honey sweet champagne mango, drizzled with salty-sweet coconut sauce and toasted mung beans.",
    price: 10.5,
    image: "https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=800&q=80",
    category: "drinks-desserts",
    badge: "House Specialty",
    customizable: false,
  },
  {
    id: "thai-iced-tea",
    name: "Traditional Cha Yen (Thai Iced Tea)",
    thaiName: "ชาเย็นชงสดหอมหวาน",
    description:
      "Freshly brewed star anise and crushed black tea poured over crushed ice, crowned with sweet evaporated milk.",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    category: "drinks-desserts",
    badge: "Street Classic",
    customizable: false,
  },
  {
    id: "singha-beer",
    name: "Singha Thai Lager (Chilled)",
    thaiName: "เบียร์สิงห์เย็นเฉียบ",
    description:
      "Classic Bangkok pale lager (5.0% ABV) with rich body, crisp herbal hop aroma, perfectly refreshing against wok spices.",
    price: 7.0,
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80",
    category: "drinks-desserts",
    customizable: false,
  },
];

/* -------------------------------------------------------------------------
   Service windows — used by the live "open now" indicator and the hours
   table. Times are 24h strings in the restaurant's own timezone (Miami).
   Day index follows Date.getDay(): 0 = Sunday.
   ------------------------------------------------------------------------- */
export const RESTAURANT_TIMEZONE = "America/New_York";

export interface ServiceWindow {
  label: string;
  open: string;
  close: string;
}

export interface DaySchedule {
  day: number;
  name: string;
  short: string;
  windows: ServiceWindow[];
}

const DINNER: ServiceWindow = { label: "Dinner", open: "17:00", close: "23:00" };
const LUNCH: ServiceWindow = { label: "Lunch", open: "12:00", close: "15:00" };

export const WEEKLY_HOURS: DaySchedule[] = [
  { day: 0, name: "Sunday", short: "Sun", windows: [LUNCH, DINNER] },
  { day: 1, name: "Monday", short: "Mon", windows: [DINNER] },
  { day: 2, name: "Tuesday", short: "Tue", windows: [] },
  { day: 3, name: "Wednesday", short: "Wed", windows: [DINNER] },
  { day: 4, name: "Thursday", short: "Thu", windows: [DINNER] },
  { day: 5, name: "Friday", short: "Fri", windows: [LUNCH, DINNER] },
  { day: 6, name: "Saturday", short: "Sat", windows: [LUNCH, DINNER] },
];

/* -------------------------------------------------------------------------
   Editorial collections powering the two dish carousels.
   ------------------------------------------------------------------------- */
export interface DishCollection {
  id: string;
  eyebrow: string;
  title: string;
  thaiTitle: string;
  blurb: string;
  itemIds: string[];
}

export const DISH_COLLECTIONS: DishCollection[] = [
  {
    id: "inspector-picks",
    eyebrow: "What the inspectors ordered",
    title: "Inspector Picks",
    thaiTitle: "จานเด็ดที่ถูกยกย่อง",
    blurb:
      "The three plates that carried Lung Yai through three Michelin Bib Gourmand cycles. Start here if it is your first night on Calle Ocho.",
    itemIds: ["khao-soi-gai", "crispy-tamarind-duck", "pad-kee-mao"],
  },
  {
    id: "more-than-noodles",
    eyebrow: "There is life beyond the noodle bowl",
    title: "More Than Noodles",
    thaiTitle: "ไม่ได้มีแค่เส้น",
    blurb:
      "Charcoal skewers, herb sausage from Chiang Mai and a clay-mortar papaya salad. Small plates built for sharing across a loud table.",
    itemIds: ["moo-ping-skewers", "sai-oua-sausage", "som-tum-thai"],
  },
];

/* Quick lookup used across the UI. */
export const menuItemById = (id: string) => menuItems.find((item) => item.id === id);
