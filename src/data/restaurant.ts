/*
  Everything on the page comes from this file. Sources for each fact:
    - lungyai.com (hours, phone, house policies, awards, sister restaurants)
    - Miami New Times, Oct 13 2015 review (chef, grandfather, opening date)
    - Miami New Times Best of Miami 2022 and 2024 (Best Thai Restaurant)
    - The restaurant's published menu on SinglePlatform (dish names and descriptions)
  Prices are intentionally left off: the only current, official prices live on
  the online ordering page, which is linked wherever a price would appear.
*/

export const RESTAURANT = {
  name: "Lung Yai Thai Tapas",
  street: "1731 SW 8th St",
  city: "Miami, FL 33135",
  neighborhood: "Little Havana",
  phone: "(786) 334-6262",
  phoneHref: "tel:+17863346262",
  orderUrl: "https://order.online/store/-27918858/?pickup=true&hideModal=true",
  instagram: "https://www.instagram.com/lungyaithai/",
  timezone: "America/New_York",
} as const;

export interface ServiceWindow {
  label: "Lunch" | "Dinner";
  open: string;
  close: string;
}

export interface DaySchedule {
  day: number;
  name: string;
  windows: ServiceWindow[];
}

const LUNCH: ServiceWindow = { label: "Lunch", open: "12:00", close: "15:00" };
const DINNER: ServiceWindow = { label: "Dinner", open: "17:00", close: "22:00" };

/** Day index follows Date.getDay(), 0 is Sunday. Listed Monday first for display. */
export const WEEKLY_HOURS: DaySchedule[] = [
  { day: 1, name: "Monday", windows: [] },
  { day: 2, name: "Tuesday", windows: [LUNCH, DINNER] },
  { day: 3, name: "Wednesday", windows: [LUNCH, DINNER] },
  { day: 4, name: "Thursday", windows: [LUNCH, DINNER] },
  { day: 5, name: "Friday", windows: [LUNCH, DINNER] },
  { day: 6, name: "Saturday", windows: [LUNCH, DINNER] },
  { day: 0, name: "Sunday", windows: [DINNER] },
];

/** The restaurant's own list, lightly edited for length. Order matters: it follows a visit. */
export const HOUSE_RULES: { title: string; detail: string }[] = [
  {
    title: "No reservations",
    detail: "First come, first served. That is the only way in.",
  },
  {
    title: "Put your name down",
    detail: "Tell the host your name and how many you are. We call you when the table is ready.",
  },
  {
    title: "Everyone has to be here",
    detail: "We seat the party once the whole party has arrived.",
  },
  {
    title: "Order everything at once",
    detail:
      "Take your time with the menu, then order it all in one go. The kitchen fires your table together. More water and beer are always fine.",
  },
  {
    title: "Pay, then pass the table on",
    detail: "When you finish we bring the check, so the next people in line can sit down.",
  },
  {
    title: "Come early",
    detail: "The easiest times to get a table are noon to 3pm and 5 to 7pm.",
  },
];

export const AWARDS: { source: string; title: string; years: string; href: string }[] = [
  {
    source: "Michelin Guide",
    title: "Bib Gourmand",
    years: "2022, 2023, 2025",
    href: "https://guide.michelin.com/us/en/florida/miami/restaurant/lung-yai-thai-tapas",
  },
  {
    source: "Miami New Times",
    title: "Best Thai Restaurant",
    years: "2022",
    href: "https://www.miaminewtimes.com/best-of/2022/eat-and-drink/best-thai-restaurant-14714860",
  },
  {
    source: "Miami New Times",
    title: "Best Thai Restaurant",
    years: "2024",
    href: "https://www.miaminewtimes.com/best-of/2024/eat-and-drink/best-thai-restaurant-20441946",
  },
];

/** Short quotes, each checked word for word against the original article. */
export const PRESS_QUOTES: { quote: string; source: string; detail?: string; href: string }[] = [
  {
    quote: "One of the city’s hottest Thai kitchens.",
    source: "MICHELIN Guide",
    href: "https://guide.michelin.com/us/en/florida/miami/restaurant/lung-yai-thai-tapas",
  },
  {
    quote: "A perfect expression of the peerless balance of salty, sweet, and sour.",
    source: "Miami New Times",
    detail: "Zachary Fagenson, October 2015",
    href: "https://www.miaminewtimes.com/restaurants/lung-yai-thai-tapas-a-veteran-cooks-passion-project-breathes-fire-in-little-havana-7972662",
  },
];

export const PRESS_REVIEW = {
  outlet: "Miami New Times",
  date: "October 2015",
  headline: "Lung Yai Thai Tapas, a Veteran Cook’s Passion Project, Breathes Fire in Little Havana",
  href: "https://www.miaminewtimes.com/restaurants/lung-yai-thai-tapas-a-veteran-cooks-passion-project-breathes-fire-in-little-havana-7972662",
};

export const SISTER_RESTAURANTS: { name: string; description: string; href: string }[] = [
  {
    name: "Daek Thai Eatery",
    description: "Thai food in Midtown.",
    href: "https://daekmiami.com/",
  },
  {
    name: "Ahi Sushi",
    description: "Sushi and omakase, two blocks from Lung Yai.",
    href: "https://ahisushimiami.com/",
  },
];

export type Spice = "mild" | "medium";

export interface MenuDish {
  name: string;
  thai?: string;
  description: string;
  spice?: Spice;
  /** Key into PHOTOS in data/photos.ts. Only set when a photo truly shows this dish. */
  photo?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  thai: string;
  note?: string;
  dishes: MenuDish[];
}

export const MENU: MenuSection[] = [
  {
    id: "chef",
    title: "Chef’s recommendations",
    thai: "อาหารแนะนำ",
    dishes: [
      {
        name: "Khao soi",
        thai: "ข้าวซอย",
        photo: "khao-soi",
        description:
          "Fresh egg noodles in golden curry, crispy noodles, coriander and red onion. Braised beef, chicken breast or chicken drumstick.",
      },
      {
        name: "Palo moo",
        thai: "หมูพะโล้",
        photo: "palo-moo",
        description:
          "Slow-cooked pork and pork belly, tofu, shiitake and boiled egg in a sweet, savory herbal broth.",
      },
      {
        name: "Khao man gai",
        thai: "ข้าวมันไก่",
        photo: "khao-man-gai",
        description:
          "Poached chicken over rice cooked in the chicken broth with ginger, garlic and galangal. Fermented soybean and chili sauce, soup on the side.",
      },
      {
        name: "Ho mok talay",
        thai: "ห่อหมกทะเล",
        photo: "ho-mok-talay",
        description:
          "Mixed seafood in house curry with young coconut meat, napa cabbage, egg and kaffir lime leaf.",
      },
      {
        name: "Dumplings",
        photo: "dumplings",
        description: "Shrimp and pork, steamed, with a soy vinaigrette.",
      },
    ],
  },
  {
    id: "north",
    title: "From the north",
    thai: "อาหารเหนือ",
    dishes: [
      {
        name: "Larb muang",
        thai: "ลาบเมือง",
        description:
          "Northern ground pork salad with the northern spice mix, cilantro, green onion and fried garlic. Fresh vegetables on the side.",
      },
      {
        name: "Nam prik ong",
        photo: "nam-prik-ong",
        thai: "น้ำพริกอ่อง",
        description:
          "Ground pork cooked down with tomato and chili. Steamed vegetables, cucumber and pork rinds for dipping.",
      },
      {
        name: "Khanom jeen nam ngiao",
        thai: "ขนมจีนน้ำเงี้ยว",
        description:
          "Rice vermicelli in nam ngiao curry with pork rib, ground pork and tomato. Pork rinds, pickled mustard greens and bean sprouts.",
      },
    ],
  },
  {
    id: "snacks",
    title: "Snacks",
    thai: "อาหารทานเล่น",
    dishes: [
      {
        name: "Crispy mushroom",
        thai: "เห็ดทอด",
        description: "Fried oyster mushrooms with sweet chili and peanut sauce.",
      },
      {
        name: "Grilled pork",
        photo: "grilled-pork",
        thai: "หมูปิ้ง",
        description: "Pork marinated Thai style and grilled.",
      },
      {
        name: "Roasted baby back ribs",
        description: "Bean paste marinade, sesame and cilantro.",
        spice: "mild",
      },
      {
        name: "Crispy tofu",
        thai: "เต้าหู้ทอด",
        description: "With peanut and a tamarind chili sauce.",
        spice: "mild",
      },
      {
        name: "Chicken curry puffs",
        thai: "กะหรี่ปั๊บ",
        description: "Caramelized chicken, onion and sweet potato, with cucumber relish.",
      },
      {
        name: "Chicken wings",
        thai: "ปีกไก่ทอด",
        description: "Marinated Thai style in the chef’s sauce.",
      },
      {
        name: "Crispy spring rolls",
        thai: "ปอเปี๊ยะทอด",
        description: "Vegetable spring rolls with plum sauce.",
      },
    ],
  },
  {
    id: "salads",
    title: "Salads",
    thai: "ยำ",
    dishes: [
      {
        name: "Som tam",
        photo: "som-tam",
        thai: "ส้มตำ",
        description: "Green papaya, tomato, peanut, chili and string beans in lime dressing.",
      },
      {
        name: "Larb e-sarn",
        photo: "larb-e-sarn",
        thai: "ลาบอีสาน",
        description:
          "Ground chicken with chili, red onion, scallion, toasted rice powder and cilantro in a spicy lime dressing.",
      },
      {
        name: "Neua nam tok",
        thai: "เนื้อน้ำตก",
        description: "Grilled beef with shallot, mint, cilantro and scallion, Isan dressing.",
      },
      {
        name: "Yum woon sen",
        thai: "ยำวุ้นเส้น",
        description: "Seafood and glass noodles with red onion, chili and scallion in spicy lime.",
      },
      {
        name: "Moo manao",
        thai: "หมูมะนาว",
        description: "Sliced pork with Thai chili, garlic and lime sauce.",
      },
      {
        name: "Shrimp and calamari herb salad",
        description: "Kaffir lime, lemongrass, mint, shallot, peanut, ginger and chili lime.",
      },
    ],
  },
  {
    id: "soups-curries",
    title: "Soups and curries",
    thai: "ต้มและแกง",
    note: "Curries come with chicken, pork, beef, tofu or vegetables. Shrimp is extra.",
    dishes: [
      {
        name: "Tom kha",
        thai: "ต้มข่า",
        description: "Coconut milk soup with chicken, lime, mushroom and galangal.",
      },
      {
        name: "Tom yum",
        thai: "ต้มยำ",
        description: "Clear hot and sour soup with lime, mushroom and chili paste.",
      },
      {
        name: "Green curry",
        photo: "green-curry",
        thai: "แกงเขียวหวาน",
        description: "Eggplant, bamboo shoot, green peas, bell pepper and basil.",
      },
      {
        name: "Red curry",
        thai: "แกงแดง",
        description: "Bamboo shoot, green beans, bell pepper and basil.",
      },
      {
        name: "Panang curry",
        photo: "panang-curry",
        thai: "พะแนง",
        description: "Green peas, bell pepper and basil.",
      },
      {
        name: "Massaman curry",
        thai: "มัสมั่น",
        description: "Mild golden curry with potato, sweet onion, cashews and garlic, topped with avocado.",
      },
    ],
  },
  {
    id: "wok",
    title: "From the wok",
    thai: "ผัด",
    dishes: [
      {
        name: "Pad kee mao with chicken",
        photo: "pad-kee-mao",
        thai: "ผัดขี้เมา",
        description: "Flat rice noodles, tomato, baby bok choy, chili and Thai basil.",
        spice: "medium",
      },
      {
        name: "Pad thai with shrimp",
        thai: "ผัดไทย",
        description: "Rice noodles, dried shrimp, peanut, bean sprouts, scallion, egg and tamarind.",
      },
      {
        name: "Pad see ew with beef",
        thai: "ผัดซีอิ๊ว",
        description: "Vermicelli or flat noodles, Chinese broccoli, egg and yellow bean soy.",
      },
      {
        name: "Fried rice with lump crab",
        thai: "ข้าวผัดปู",
        description: "Egg, Chinese broccoli, tomato, scallion and light soy.",
      },
      {
        name: "Jungle curry fried rice",
        thai: "ข้าวผัดแกงป่า",
        description: "Long hot chili, string beans, snow peas and Thai basil.",
        spice: "medium",
      },
      {
        name: "Pad woon sen with vegetables",
        thai: "ผัดวุ้นเส้น",
        description: "Glass noodles, mushroom, napa cabbage, Chinese celery and sesame ginger soy.",
      },
    ],
  },
  {
    id: "noodles",
    title: "Noodles",
    thai: "ก๋วยเตี๋ยว",
    note: "Dry or in soup. Handmade egg noodles, thin rice, flat rice or vermicelli.",
    dishes: [
      {
        name: "Duck noodle soup",
        thai: "ก๋วยเตี๋ยวเป็ด",
        description: "Braised duck, bean sprouts and Chinese celery in five-spice soy broth.",
      },
      {
        name: "Beef noodle soup",
        thai: "ก๋วยเตี๋ยวเนื้อ",
        description: "Braised beef, meatballs, Chinese broccoli and bean sprouts in galangal pandan broth.",
      },
      {
        name: "Crab and pork dry noodles",
        description: "Handmade egg noodles, roasted pork, lump crab, yu choy and scallion.",
      },
      {
        name: "Pork noodle soup",
        thai: "ก๋วยเตี๋ยวหมู",
        description: "Roasted pork, long beans, bean sprouts, peanut and dried shrimp.",
        spice: "medium",
      },
      {
        name: "Seafood noodle soup",
        description:
          "Shrimp, calamari, fish ball, water spinach and fermented tofu in tomato pork broth. Not for first-timers, and not returnable.",
        spice: "medium",
      },
    ],
  },
];
