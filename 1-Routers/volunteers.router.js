import express from "express";
import controller from '../2-Controllers/volunteer.controller.js';

const router = express.Router();

router.get('/', controller.getAll)

router.get('/:id', controller.get)

router.put('/:id', controller.update)

router.post('/', controller.insert)

router.delete('/:id', controller.delete)

export default router;