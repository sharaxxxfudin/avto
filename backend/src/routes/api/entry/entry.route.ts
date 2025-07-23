import { Router } from "express";
import getContacts from "../../../controllers/api/entry/entry.controller";

const router = Router();

router.get('/data/contacts', getContacts);
export default router;