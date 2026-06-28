import { Router, type Request, type Response } from 'express';
import type { VehicleRequestBody } from '../types/vehicleTypes.js';
import { VehicleService } from '../services/vehicleService.js';
import { logger } from '../../main.js';
import { ValidateVehicleData } from '../middleware/vehicleDataValidation.js';
import { vehicleSchema } from '../schemas/vehicleSchema.js';
import { createNumericId } from '../utils/createNumericId.js';

export class VehicleController {
  private service: VehicleService;
  private router = Router();
  constructor(service: VehicleService) {
    this.service = service;
    this.POST();
    this.GET();
    this.GETALL();
    this.PUT();
    this.DELETE();
  }
  private POST() {
    this.router.post(
      '/',
      ValidateVehicleData(vehicleSchema),
      async (req: Request, res: Response) => {
        try {
          const data: VehicleRequestBody = req.body;
          const vehicle = await this.service.createVehicle(data);
          res.status(201).json({ message: 'Vehicle Created', data: vehicle });
        } catch (err: unknown) {
          res
            .status(500)
            .json({ message: 'Failed to create vehicle', error: err });
          logger.error(err, 'Failed to create vehicle');
        }
      },
    );
  }
  private GETALL() {
    this.router.get('/', async (req: Request, res: Response) => {
      try {
        const vehicles = await this.service.getAllUserVehicles();
        res.status(200).json({ message: 'Success', data: vehicles });
      } catch (err: unknown) {
        res.status(500).json({ message: 'failed to return vehicles' });
        logger.error(err, 'Can not return all vehicles');
      }
    });
  }
  private GET() {
    this.router.get('/:id', async (req: Request, res: Response) => {
      try {
        const id = createNumericId(req, res);
        if (!id) return res.status(400).json({ message: 'Invalid id' });
        const vehicle = await this.service.getUserVehicleById(id);
        return res.json(vehicle);
      } catch (err: unknown) {
        res.status(500).json({ message: 'Failed to fetch data', error: err });
      }
    });
  }

  private PUT() {
    this.router.put('/:id', async (req: Request, res: Response) => {
      try {
        const id = createNumericId(req, res);
        if (!id) return res.status(400).json({ message: 'Invalid id' });
        await this.service.changeVehicleData(id, req.body);
        return res.status(200).json({ message: 'Vehicle updated' });
      } catch (err: unknown) {
        res
          .status(500)
          .json({ message: 'Failed to update vehicle data', error: err });
      }
    });
  }

  private DELETE() {
    this.router.delete('/:id', (req: Request, res: Response) => {
      const id = createNumericId(req, res);
      if (typeof id !== 'number') return;
      this.service.removeUserVehicle(id);
    });
  }

  public getRouter() {
    return this.router;
  }
}
