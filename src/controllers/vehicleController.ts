import { Router, type Request, type Response } from 'express';
import type { VehicleRequestBody } from '../types/vehicleTypes.js';
import { VehicleService } from '../services/vehicleService.js';
import { logger } from '../../main.js';

export class VehicleController {
  private service: VehicleService;
  private router = Router();
  constructor(service: VehicleService) {
    this.service = service;
    this.POST();
    this.GET();
    this.PUT();
    this.DELETE();
  }
  private POST() {
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const data: VehicleRequestBody = req.body;
        logger.info(data, 'data');
        const vehicle = await this.service.createVehicle(data);
        res.status(201).json({ message: 'Vehicle Created', data: vehicle });
      } catch (err: unknown) {
        res
          .status(500)
          .json({ message: 'Failed to create vehicle', error: err });
        logger.error(err, 'Failed to create vehicle');
      }
    });
  }
  private GET() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send('GET REQUEST');
    });
  }

  private PUT() {
    this.router.put('/:id', (req: Request, res: Response) => {});
  }

  private DELETE() {
    this.router.delete('/:id', (req: Request, res: Response) => {});
  }

  public getRouter() {
    return this.router;
  }
}
