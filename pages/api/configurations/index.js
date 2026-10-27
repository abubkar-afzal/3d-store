import { connectDB } from '@/lib/db';
import Configuration from '@/models/Configuration';
import Product from '@/models/Product';
import { requireAuth } from '@/lib/withAuth';
import { computeTotalPrice } from '@/lib/pricing';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  await connectDB();
  const userId = requireAuth(req, res);
  if (!userId) return;

  if (req.method === 'GET') {
    const configs = await Configuration.find({ user: userId })
      .populate('product')
      .sort({ createdAt: -1 });
    return res.json({ configurations: configs });
  }

  if (req.method === 'POST') {
    const { productId, selections, name } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const totalPrice = computeTotalPrice(product, selections);
    const config = await Configuration.create({
      user: userId,
      product: productId,
      selections,
      totalPrice,
      name: name || 'Untitled',
      shareId: nanoid(10),
    });
    return res.status(201).json({ configuration: config });
  }

  res.status(405).end();
}