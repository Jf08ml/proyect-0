import {Router} from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyValidatorLink, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

//GET            /api/v1/links              all links
//GET            /api/v1/Links/:id          single link
//POST           /api/v1/Links              create Link
//PATCH O PUT    /api/v1/Links/:id          update Link
//DELETE         /api/v1/Links/:id          delete Link


router.get('/', requireToken, getLinks);
// CRUD tradicional con ruta protegida router.get('/:id', requireToken, getLink)
router.get('/:nanoLink', getLink)
router.post('/', requireToken, bodyValidatorLink, createLink);
router.delete('/:id', requireToken, paramLinkValidator, removeLink)
router.patch("/:id", requireToken, paramLinkValidator, bodyValidatorLink, updateLink);
export default router;