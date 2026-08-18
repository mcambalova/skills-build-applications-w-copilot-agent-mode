import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

function createResourceRouter(model: Model<unknown>): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean());
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', details: String(error) });
    }
  });

  router.get('/:id', async (request, response) => {
    try {
      const item = await model.findById(request.params.id).lean();
      if (!item) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(item);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource id', details: String(error) });
    }
  });

  router.post('/', async (request, response) => {
    try {
      response.status(201).json(await model.create(request.body));
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: String(error) });
    }
  });

  router.put('/:id', async (request, response) => {
    try {
      const item = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      }).lean();
      if (!item) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(item);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: String(error) });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const item = await model.findByIdAndDelete(request.params.id).lean();
      if (!item) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource id', details: String(error) });
    }
  });

  return router;
}

export const apiRouter = Router();
apiRouter.use('/users', createResourceRouter(User));
apiRouter.use('/teams', createResourceRouter(Team));
apiRouter.use('/activities', createResourceRouter(Activity));
apiRouter.use('/leaderboard', createResourceRouter(Leaderboard));
apiRouter.use('/workouts', createResourceRouter(Workout));