import { Router } from 'express';
import { actionController } from '../../../controllers/api/action/action.controller';

const router = Router();
router.get('/vechicle/japan', actionController.getAvtoJapan);
router.get('/vechicle/korea', actionController.getAvtoKorea);

router.get('/vechicle/brands', actionController.getJapanBrands);
router.get('/vechicle/models', actionController.getJapanModels);
router.get('/vechicle/bodies', actionController.getJapanBodies);
export default router;
