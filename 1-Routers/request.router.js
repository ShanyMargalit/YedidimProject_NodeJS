import express from "express";
import repo from '../4-Repositories/volunteers.repo.js';
import controller from '../2-Controllers/request.controller.js';

const router = express.Router();

router.get('/', controller.getAll)

router.get('/:id', controller.get)

router.put('/:id', controller.update)

router.post('/', controller.insert)

router.delete('/:id', controller.delete)

export default router;