import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

// Rule-based fallback used when ML service is unavailable
function ruleBased(product, all) {
  return all
    .filter((p) => p._id.toString() !== product._id.toString())
    .filter((p) => p.category === product.category || p.featured)
    .slice(0, 4);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDB();
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const all = await Product.find();

  // Try the Python ML service first
  try {
    const mlUrl = process.env.ML_SERVICE_URL;
    if (mlUrl) {
      const r = await fetch(`${mlUrl}/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          category: product.category,
          basePrice: product.basePrice,
        }),
      });
      if (r.ok) {
        const data = await r.json();
        const ids = data.recommendedIds || [];
        const recs = await Product.find({ _id: { $in: ids } });
        if (recs.length) return res.json({ recommendations: recs, source: 'ml' });
      }
    }
  } catch {
    // fall through to rule-based
  }

  return res.json({ recommendations: ruleBased(product, all), source: 'rules' });
}