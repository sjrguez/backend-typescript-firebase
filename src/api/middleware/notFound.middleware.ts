import {Request, Response, NextFunction} from 'express'

export const NotFoundMiddleware = ((req: Request, res: Response, next: NextFunction) => {
    res
        .status(404)
        .json({ message: 'Ruta no encontrada' });
});