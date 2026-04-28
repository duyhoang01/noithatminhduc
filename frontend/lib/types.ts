export interface Province {
  id: number;
  name: string;
}

export interface Distributor {
  id: string;
  name: string;
  code: string | null;
  villa_surcharge_pct: string; // Decimal serialized as string
}

export interface Package {
  id: string;
  name: string | null;
  segment: 'LOW' | 'MID' | 'HIGH' | null;
  base_price: string | null;
  package_discount_amount: string | null;
  min_adherence: string | null;
}

export interface ProductImage {
  id: string;
  public_url: string | null;
  image_type: string | null; // "3D" | "2D" | "TECH" | "REAL"
  is_primary: boolean | null;
}

export interface Variant {
  id: string;
  size: string | null;
  material: string | null;
  color: string | null;
  product_images: ProductImage[];
  prices: Array<{ current_unit_price: string | null }>;
}

export interface PackageItem {
  id: string;
  quantity: number;
  is_mandatory: boolean | null;
  room: { id: string; name: string | null } | null;
  product: {
    id: string;
    name: string | null;
    default_image_url: string | null;
    product_images: ProductImage[];
  } | null;
  product_variant: Variant | null; // default variant
}

export interface PackageWithItems extends Package {
  package_item: PackageItem[];
}

export interface ConfigurationLine {
  id: string;
  variant_id: string;
  product_id: string | null;
  quantity: number | null;
  unit_price_snapshot: string | null;
}

export interface Session {
  id: string;
  distributor_id: string | null;
  package_id: string | null;
  property_type: 'APARTMENT' | 'VILLA' | null;
  configuration_line: ConfigurationLine[];
}

export interface PatchLinesResponse {
  session: Session;
  pricing: {
    subtotal: number;
    discount: number;
    totalPrice: number;
  };
}

// Wizard state
export interface SelectionItem {
  variantId: string;
  unitPrice: number; // resolved, includes villa surcharge
  quantity: number;
  isSelected: boolean;
  productId: string;
  roomId: string;
  isMandatory: boolean;
}

export const SEGMENT_LABEL: Record<string, string> = {
  LOW: 'Tiêu chuẩn',
  MID: 'Nâng cao',
  HIGH: 'Sang trọng',
};

export const PROPERTY_TYPE_LABEL: Record<string, string> = {
  APARTMENT: 'Chung cư',
  VILLA: 'Nhà phố / Biệt thự',
};

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}
