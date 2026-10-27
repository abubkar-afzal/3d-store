import { connectDB } from '@/lib/db';
import Configuration from '@/models/Configuration';
import { requireAuth } from '@/lib/withAuth';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // Public share access
  if (req.method === 'GET') {
    const config = await Configuration.findOne({
      $or: [{ _id: id.match(/^[a-f0-9]{24}$/) ? id : null }, { shareId: id }],
    }).populate('product');
    if (!config) return res.status(404).json({ error: 'Not found' });
    return res.json({ configuration: config });
  }

  const userId = requireAuth(req, res);
  if (!userId) return;

  if (req.method === 'DELETE') {
    const config = await Configuration.findOneAndDelete({ _id: id, user: userId });
    if (!config) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  }

  res.status(405).end();
}