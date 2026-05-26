import mongoose, { Document, Schema } from 'mongoose';

export interface IField {
  label: string;
  value: string;
  type: 'text' | 'number' | 'email' | 'date';
}

export interface IFormEntry extends Document {
  title: string;
  fields: IField[];
  createdAt: Date;
  updatedAt: Date;
}

const FieldSchema = new Schema<IField>({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true },
  type: {
    type: String,
    enum: ['text', 'number', 'email', 'date'],
    default: 'text',
  },
});

const FormEntrySchema = new Schema<IFormEntry>(
  {
    title: { type: String, required: true, trim: true },
    fields: { type: [FieldSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IFormEntry>('FormEntry', FormEntrySchema);
