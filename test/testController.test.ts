import { TaskRepository } from '../src/api/repositories';
import { TaskController } from '../src/api/controllers';
import { DataBase } from '../src/config/database';



describe('TaskController', () => {
  let taskController: TaskController;
  let taskRepository: TaskRepository;

  beforeEach(() => {

    taskRepository = new TaskRepository({ db: DataBase });
    taskController = new TaskController({ TaskRepository: taskRepository });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  describe('getAllTasks', () => {
    it('should return all tasks', async () => {

      const tasks = [
        {
          id: "vMWZrWLY3KyWdnKMFAfk",
          descripcion: "Remover la sabana",
          estado: "Pendiente",
          titulo: "Cambiar la cama"
        },
        {
          id: "oyWZrWLY3KyWdnKMFAfk",
          descripcion: "Limpiar todas las areas",
          estado: "Completado",
          titulo: "Limpiar el piso"
        }
      ]
      taskRepository.getAllTasks = jest.fn().mockResolvedValue(tasks);

      const req: any = {}
      const res: any = {
        json: jest.fn(),
      };

      await taskController.getAllTasks(req, res);

      expect(res.json).toHaveBeenCalledWith(tasks);
    });

    it('should handle errors and return 500 status code', async () => {
      taskRepository.getAllTasks = jest.fn().mockRejectedValue(new Error('Mock error'));

      const req: any = {};
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.getAllTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener las tareas' });
    });
  })

  describe('getTaskById', () => {
    const task =         {
      id: "vMWZrWLY3KyWdnKMFAfk",
      descripcion: "Remover la sabana",
      estado: "Pendiente",
      titulo: "Cambiar la cama"
    }

    it('should return a task by ID', async () => {
      taskRepository.getTaskById = jest.fn().mockResolvedValue(task);

      const req: any = {
        params: { id: task.id },
      };
      const res: any = {
        json: jest.fn(),
      };

      await taskController.getTaskById(req, res);

      expect(res.json).toHaveBeenCalledWith({ task });
    });

    it('should handle invalid ID and return 400 status code', async () => {
      const req: any = {
        params: { id: '' }
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.getTaskById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "El id de la tarea es inválido, ''" });
    });

    it('should handle non-existing ID and return 404 status code', async () => {
      taskRepository.getTaskById = jest.fn().mockResolvedValue(null);

      const req: any = {
        params: { id: 'nonExistingTaskId' },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.getTaskById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No existe un id con 'nonExistingTaskId'" });
    });

    it('should handle errors and return 500 status code', async () => {
      taskRepository.getTaskById = jest.fn().mockRejectedValue(new Error('Mock error'));

      const req: any = {
        params: { id: task.id },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.getTaskById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener tarea por ID' });
    });
  });


  describe('createTask', () => {
    const task = {
      descripcion: "Remover la sabana",
      estado: "Pendiente",
      titulo: "Cambiar la cama"
    }

    const taskId = 'vMWZrWLY3KyWdnKMFAfk'
    it('should create a new task', async () => {
      const req: any = {
        body: task,
      };
      const res: any = {
        json: jest.fn(),
      };

      taskRepository.createTask = jest.fn().mockResolvedValue(taskId);

      await taskController.createTask(req, res);

      expect(taskRepository.createTask).toHaveBeenCalledWith(task);
      expect(res.json).toHaveBeenCalledWith({
        id: taskId,
        ...task,
        message: 'Tarea se ha sido creada correctamente',
      });
    });

    it('should handle validation errors and return 400 status code', async () => {
      const req: any = {
        body: {...task, titulo: '' }
      };

      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: ['"titulo" is not allowed to be empty'],
      });

    });

    it('should handle errors and return 500 status code', async () => {
      taskRepository.createTask = jest.fn().mockRejectedValue(new Error('Mock error'));

      const req: any = {
        body: task,
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al crear la tarea' });
    });
  });

  describe('updateTask', () => {
    const task = {
      estado: "Completado",
    }
    
    const taskId = 'vMWZrWLY3KyWdnKMFAfk'

    it('should update an existing task', async () => {
      const req: any = {
        params: { id: taskId },
        body: task,
      };

      const res: any = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    
      taskRepository.updateTask = jest.fn().mockResolvedValue(taskId);
    
      await taskController.updateTask(req, res);
    
      expect(taskRepository.updateTask).toHaveBeenCalledWith(taskId, task);
      expect(res.json).toHaveBeenCalledWith({ message: 'Tarea actualizada correctamente' });
    });

    it('should handle invalid ID and return 400 status code', async () => {
      const req: any = {
        params: { id: taskId },
        body: task,
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        internalErrorMine: true,
        statusCode: 400,
        message: `El id de la tarea es inválido, '${ taskId}'`
    }
      const validateMock = jest.spyOn(taskController, 'validateId').mockImplementation(() => {
        throw error;
      });

      await taskController.updateTask(req, res);

      expect(validateMock).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message:error.message });
    });


    it('should return a 404 status code and error message if task does not exist', async () => {
      const req: any = {
        params: { id: taskId },
        body: task,
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        internalErrorMine: true,
        statusCode: 404,
        message: `No existe un id con '${taskId}'`,
      };
      const validateMock = jest.spyOn(taskController, 'validateId').mockImplementation(() => {
        throw error;
      });

      await taskController.updateTask(req, res);

      expect(validateMock).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle errors and return 500 status code', async () => {
      taskRepository.updateTask = jest.fn().mockRejectedValue(new Error('Mock error'));

      const req: any = {
        params: { id: taskId },
        body: task,
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al actualizar la tarea' });
    });
  });

  describe('deleteTask', () => {
   
    const taskId = 'vMWZrWLY3KyWdnKMFAfk'
   
    it('should delete an existing task', async () => {
      const req: any = {
        params: { id: taskId },
      };
      const res: any = {
        json: jest.fn(),
      };

      taskRepository.deleteTask = jest.fn().mockResolvedValue(taskId);

      await taskController.deleteTask(req, res);

      expect(taskRepository.deleteTask).toHaveBeenCalledWith(taskId);
      expect(res.json).toHaveBeenCalledWith({ message: 'Tarea eliminada correctamente' });
    });

    it('should handle invalid ID and return 400 status code', async () => {
      const req: any = {
        params: { id: taskId },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        internalErrorMine: true,
        statusCode: 400,
        message: `El id de la tarea es inválido, '${ taskId}'`
    }
      const validateMock = jest.spyOn(taskController, 'validateId').mockImplementation(() => {
        throw error;
      });

      await taskController.deleteTask(req, res);

      expect(validateMock).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message:error.message });
    });

    it('should return a 404 status code and error message if task does not exist', async () => {
      const req: any = {
        params: { id: taskId },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = {
        internalErrorMine: true,
        statusCode: 404,
        message: `No existe un id con '${taskId}'`,
      };
      const validateMock = jest.spyOn(taskController, 'validateId').mockImplementation(() => {
        throw error;
      });

      await taskController.deleteTask(req, res);

      expect(validateMock).toHaveBeenCalledWith(taskId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should handle errors and return 500 status code', async () => {
      taskRepository.deleteTask = jest.fn().mockRejectedValue(new Error('Mock error'));

      const req: any = {
        params: { id: taskId },
      };
      const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await taskController.deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error al eliminar la tarea' });
    });
  });

})