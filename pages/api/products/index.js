import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/withAuth';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ products });
  }

  if (req.method === 'POST') {
    if (!requireAdmin(req, res)) return;
    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  }

  res.status(405).end();
}