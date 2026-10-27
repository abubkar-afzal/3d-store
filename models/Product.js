import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    priceAdd: { type: Number, default: 0 },
  },
  { _id: false }
);

const PartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    materials: [MaterialSchema],
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'general' },
    basePrice: { type: Number, required: true },
    modelFile: { type: String, required: true },
    parts: [PartSchema],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);