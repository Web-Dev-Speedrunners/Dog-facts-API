import { Router } from 'express';
import echoRouter from './echo';
import dogRouter from './dog';

const router = Router();

router.use('/echo', echoRouter);
router.use('/dogfact', dogRouter);

router.route('/').get((_, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export default router;
