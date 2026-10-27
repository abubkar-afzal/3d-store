import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/withAuth';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.json({ product });
  }

  if (req.method === 'PUT') {
    if (!requireAdmin(req, res)) return;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ product });
  }

  if (req.method === 'DELETE') {
    if (!requireAdmin(req, res)) return;
    await Product.findByIdAndDelete(id);
    return res.json({ ok: true });
  }

  res.status(405).end();
}