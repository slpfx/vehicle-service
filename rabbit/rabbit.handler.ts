import { VehicleService } from '../src/services/vehicleService.js';
import type { VehicleRequestBody } from '../src/types/vehicleTypes.js';

const handler = {
  'user.create': (owner: string) =>
    VehicleService.createVehicle({ make: 'null', model: 'null', year: 2026, owner: owner }),
  'vehicle.create': (data: VehicleRequestBody) => VehicleService.createVehicle(data),
  'vehicle.get-all': (owner: string) => VehicleService.getAllUserVehicles(owner),
};
export default handler;
