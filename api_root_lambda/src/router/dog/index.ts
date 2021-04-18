import { Router } from 'express';
import dogRouteHandler from './dog.handler';

const router = Router();

router
  .route('/')
  .get(dogRouteHandler);

export default router;
