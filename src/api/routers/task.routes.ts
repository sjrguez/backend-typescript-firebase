import { Router } from 'express';
import { TaskController } from '../controllers';

export const TaskRoutes = ({TaskController}: { TaskController: TaskController}): Router => {
  const router = Router();

  router.get('/', TaskController.getAllTasks);
  router.post('/', TaskController.createTask);
  router.get('/:id', TaskController.getTaskById);
  router.patch('/:id', TaskController.updateTask);
  router.delete('/:id', TaskController.deleteTask);

  return router;
};