import Joi from 'joi'
export interface TaskDto {
    id?: string;
    titulo: string;
    descripcion: string;
    estado: TaskStatusEnum;
}

export enum TaskStatusEnum  {
    Completado= "Completado",
    Pendiente= "Pendiente"
}

export const taskDtoSchema = Joi.object({
    titulo: Joi.string(),
    descripcion: Joi.string(),
    estado: Joi.string().valid(TaskStatusEnum.Completado, TaskStatusEnum.Pendiente),
});


