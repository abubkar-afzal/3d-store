// Run: npm run seed  (needs MONGODB_URI in .env.local or shell env)
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI missing');
  process.exit(1);
}

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  basePrice: Number,
  modelFile: String,
  parts: [
    {
      name: String,
      materials: [{ name: String, color: String, priceAdd: Number }],
    },
  ],
  featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);

  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log(`Already ${existing} products, skipping`);
    process.exit(0);
  }

  await Product.create([
    {
      name: 'Aurora Chair',
      description: 'A minimalist lounge chair. Customize the seat and legs.',
      category: 'furniture',
      basePrice: 249,
      modelFile: 'chair.glb',
      featured: true,
      parts: [
        {
          name: 'seat',
          materials: [
            { name: 'Natural Oak', color: '#8B6F47', priceAdd: 0 },
            { name: 'Walnut', color: '#4A2C17', priceAdd: 40 },
            { name: 'White', color: '#F5F5F5', priceAdd: 20 },
          ],
        },
        {
          name: 'legs',
          materials: [
            { name: 'Matte Black', color: '#1F1F1F', priceAdd: 0 },
            { name: 'Polished Steel', color: '#C0C0C0', priceAdd: 30 },
            { name: 'Brass', color: '#B5A642', priceAdd: 60 },
          ],
        },
      ],
    },
    {
      name: 'Nova Desk',
      description: 'A modern work desk with configurable top and frame.',
      category: 'furniture',
      basePrice: 399,
      modelFile: 'desk.glb',
      featured: true,
      parts: [
        {
          name: 'top',
          materials: [
            { name: 'Birch', color: '#E4D5B7', priceAdd: 0 },
            { name: 'Smoked Oak', color: '#5C4332', priceAdd: 50 },
          ],
        },
      ],
    },
  ]);

  console.log('Seeded products');
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });