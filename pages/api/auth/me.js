import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { getUserIdFromReq } from '@/lib/withAuth';

export default async function handler(req, res) {
  await connectDB();
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await User.findById(userId).select('-passwordHash');
  if (!user) return res.status(404).json({ error: 'User not found' });

  return res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}