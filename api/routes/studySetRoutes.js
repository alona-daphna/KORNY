import { Router } from 'express';
import {
  addCardsToSet,
  createSet,
  deleteSet,
  getAllSets,
  getSetById,
} from '../controllers/studySetController.js';

const router = Router();

router.get('/', getAllSets);
router.get('/:id', getSetById);
router.post('/', createSet);
router.post('/:id', addCardsToSet);
router.delete('/:id', deleteSet);

export default router;
