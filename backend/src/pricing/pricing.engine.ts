export interface ConfigurationLine {
  variantId: string;
  quantity: number;
  unitPrice: bigint;
}

export interface DistributorVariantPrice {
  variantId: string;
  price: bigint;
}

export interface PricingInput {
  lines: ConfigurationLine[];
  distributorPrices?: DistributorVariantPrice[];
  discount?: bigint;
}

export interface PricingResult {
  subtotal: bigint;
  discount: bigint;
  totalPrice: bigint;
  lines: Array<{ variantId: string; quantity: number; unitPrice: bigint; lineTotal: bigint }>;
}

function resolveUnitPrice(
  line: ConfigurationLine,
  priceMap: Map<string, bigint>,
): bigint {
  return priceMap.get(line.variantId) ?? line.unitPrice;
}

export function calculatePrice(input: PricingInput): PricingResult {
  const { lines, distributorPrices = [], discount = 0n } = input;

  const priceMap = new Map(distributorPrices.map((d) => [d.variantId, d.price]));

  const resolvedLines = lines.map((line) => {
    const unitPrice = resolveUnitPrice(line, priceMap);
    return {
      variantId: line.variantId,
      quantity: line.quantity,
      unitPrice,
      lineTotal: unitPrice * BigInt(line.quantity),
    };
  });

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.lineTotal, 0n);
  const totalPrice = subtotal > discount ? subtotal - discount : 0n;

  return { subtotal, discount, totalPrice, lines: resolvedLines };
}
