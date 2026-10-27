export function computeTotalPrice(product, selections) {
  if (!product) return 0;
  let total = product.basePrice || 0;
  if (!product.parts) return total;

  for (const part of product.parts) {
    const selected = selections?.[part.name];
    if (!selected) continue;
    const material = part.materials.find((m) => m.name === selected.material);
    if (material) total += material.priceAdd || 0;
  }
  return total;
}