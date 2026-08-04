import { prisma } from '../lib/prisma.js';
import type { VehicleRequestBody } from '../types/vehicleTypes.js';
import { logger } from '../../main.js';

export class VehicleService {
  static async createVehicle(data: VehicleRequestBody) {
    await prisma.vihecle.create({
      data: {
        model: data.model,
        make: data.make,
        year: data.year,
        owner: data.owner,
      },
    });
  }

  static async getAllUserVehicles(owner: number) {
    logger.info('GET ALL USER VEHICLES');
    const vehicles = await prisma.vihecle.findMany({ where: { owner: owner } });
    return vehicles;
  }

  static async getUserVehicleById(id: number) {
    logger.info('GET VEHICLE BY ID');

    const vehicle = await prisma.vihecle.findUnique({
      where: {
        id: id,
      },
    });
    return vehicle;
  }

  static async changeVehicleData(
    id: number,
    data: Partial<VehicleRequestBody>,
  ) {
    await prisma.vihecle.update({ where: { id: id }, data });
  }

  static async removeUserVehicle(id: number) {
    await prisma.vihecle.delete({
      where: {
        id: id,
      },
    });
  }
}
