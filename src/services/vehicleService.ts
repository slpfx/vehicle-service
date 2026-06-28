import { prisma } from '../lib/prisma.js';
import type { VehicleRequestBody } from '../types/vehicleTypes.js';

export class VehicleService {
  async createVehicle(data: VehicleRequestBody) {
    await prisma.vihecle.create({
      data: {
        model: data.model,
        make: data.make,
        year: data.year,
      },
    });
  }

  getAllUserVehicles() {
    console.log('All user Vehicles');
  }

  getUserVehicleById(id: number) {
    console.log('Vehicle under id: ', id);
  }

  changeVehicleData(id: number, make?: string, model?: string, year?: number) {
    console.log('vehicle under id: ', id, ' has been changed');
  }

  removeUserVehicle(id: number) {
    console.log('vehicle under id: ', id, ' has been removed');
  }
}
