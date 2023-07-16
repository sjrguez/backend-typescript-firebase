import { Request, Response } from 'express';
import Joi from 'joi'
import { TaskRepository } from '../repositories/task.repository';
import  { TaskDto, taskDtoSchema } from '../interfaces'

export class TaskController {
    private TaskRepository: TaskRepository
    constructor(private readonly opts: any) {
        this.TaskRepository  = this.opts.TaskRepository
    }

    getAllTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await this.TaskRepository.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las tareas' });
        }
    };

    getTaskById = async  (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;

           const task =  await this.validateId(taskId)
            return res.json({task})
        } catch (error: any) {
            if(error.internalErrorMine) {
                return res.status(error.statusCode).json({
                    message: error.message
                })
            }

            res.status(500).json({ message: 'Error al obtener tarea por ID' });
        }
    }

    createTask = async (req: Request, res: Response) => {
        try {
            const data: TaskDto = req.body;
            const { error } = taskDtoSchema.validate(data, { stripUnknown: true, presence: "required" });
            
            if (error) {
                return res.status(400).json({
                    message:error.details.map((e) => {
                        return e.message
                    })
                })
            } 
        
            const taskId = await this.TaskRepository.createTask(data);
            res.json({ id: taskId, ...data, message: "Tarea se ha sido creada correctamente" });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la tarea' });
        }
    };

    updateTask = async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const taskData: TaskDto = req.body;
            
            await this.validateId(taskId)
            const partialInfo = taskDtoSchema.validate(taskData, {stripUnknown: true });
            if (partialInfo.error) {
                return res.status(400).json({
                    message: partialInfo.error.details.map((e) => {
                        return e.message
                    })
                })
            }
            await this.TaskRepository.updateTask(taskId, taskData);
            res.json({ message: 'Tarea actualizada correctamente' });
        } catch (error: any) {
            if(error.internalErrorMine) {
                return res.status(error.statusCode).json({
                    message: error.message
                })
            }

            res.status(500).json({ message: 'Error al actualizar la tarea' });
        }
    };

    deleteTask = async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            await this.validateId( taskId )
            await this.TaskRepository.deleteTask(taskId);

            res.json({ message: 'Tarea eliminada correctamente' });
        } catch (error: any) {
            console.log({error})
            if(error.internalErrorMine) {
                return res.status(error.statusCode).json({
                    message: error.message
                })
            }
            res.status(500).json({ message: 'Error al eliminar la tarea' });
        }
    };



    public async validateId (taskId: string) {
        const { error } = Joi.string().required().validate(taskId);
        if (error) {
            throw {
                internalErrorMine: true,
                statusCode: 400,
                message: `El id de la tarea es inválido, '${ taskId}'`
            }
        }

        const task = await this.TaskRepository.getTaskById(taskId);

        if(!task) { 
            throw {
                internalErrorMine: true,
                statusCode: 404,
                message: `No existe un id con '${taskId}'`
            }
        }

        return task
    }
}