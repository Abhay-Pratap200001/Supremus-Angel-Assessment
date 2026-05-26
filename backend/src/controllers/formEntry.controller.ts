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

export const getEntryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const entry = await FormEntry.findById(req.params.id);
    if (!entry) {
      res.status(404).json({ success: false, message: 'Entry not found' });
      return;
    }
    res.json({ success: true, data: entry });
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

export const updateEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const entry = await FormEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) {
      res.status(404).json({ success: false, message: 'Entry not found' });
      return;
    }
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Validation error', error });
  }
};

export const deleteEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const entry = await FormEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      res.status(404).json({ success: false, message: 'Entry not found' });
      return;
    }
    res.json({ success: true, message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
