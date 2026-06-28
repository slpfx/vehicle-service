import type { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import { logger } from '../../main.js';

export const ValidateVehicleData =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      logger.error(result.error.flatten(), 'Vehicle Data Validation Error');
      return res
        .status(400)
        .json({ message: 'validation error', err: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
