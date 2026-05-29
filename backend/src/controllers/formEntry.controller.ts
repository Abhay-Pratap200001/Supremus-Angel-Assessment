import { Request, Response } from 'express';
import FormEntry from '../models/formEntry.model';


export const getAllEntries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const entries = await FormEntry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};


export const createEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const entry = new FormEntry(req.body);
    const saved = await entry.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation error', error });
  }
};
