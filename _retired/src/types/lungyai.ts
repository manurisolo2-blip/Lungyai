export type CategoryId =
  | "insignias"
  | "noodles"
  | "wok"
  | "tapas"
  | "curries"
  | "duck-specials"
  | "drinks-desserts";

export interface Category {
  id: CategoryId;
  name: string;
  thaiSubtitle: string;
  description: string;
}

export interface ProteinOption {
  id: string;
  name: string;
  extraPrice: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface MenuItem {
  id: string;
  name: string;
  thaiName: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: "Michelin Recommended" | "Chef Signature" | "Street Classic" | "House Specialty" | "Spicy Favorite";
  defaultSpice?: SpiceLevel;
  customizable?: boolean;
  proteinOptions?: ProteinOption[];
  extrasAllowed?: boolean;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedProtein?: ProteinOption;
  selectedSpice: SpiceLevel;
  selectedExtras: ExtraOption[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}
