import { Router } from 'express';
import {
  getAllEntries,
  createEntry,

} from '../controllers/formEntry.controller';

const router = Router();

router.get('/', getAllEntries);
router.post('/', createEntry);

export default router;
