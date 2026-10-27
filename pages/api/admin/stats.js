import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import Configuration from '@/models/Configuration';
import User from '@/models/User';
import { requireAdmin } from '@/lib/withAuth';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  if (!requireAdmin(req, res)) return;

  await connectDB();
  const [products, configurations, users] = await Promise.all([
    Product.countDocuments(),
    Configuration.countDocuments(),
    User.countDocuments(),
  ]);

  return res.json({ products, configurations, users });
}