import express from 'express';
import countries from './countries/countries';
const router = express.Router();

router.use('/countries', countries);
export default router;
