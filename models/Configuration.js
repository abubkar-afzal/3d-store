import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    selections: { type: mongoose.Schema.Types.Mixed, default: {} },
    totalPrice: { type: Number, required: true },
    shareId: { type: String, required: true, unique: true },
    name: { type: String, default: 'Untitled' },
  },
  { timestamps: true }
);

export default mongoose.models.Configuration ||
  mongoose.model('Configuration', ConfigurationSchema);