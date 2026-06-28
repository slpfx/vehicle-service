import express from 'express';
import { VehicleController } from './src/controllers/vehicleController.js';
import { VehicleService } from './src/services/vehicleService.js';
import pino from 'pino';
import { limiter } from './src/middleware/rateLimiter.js';

export const logger = pino({
  level: 'debug',
});
const PORT = 3000;
const app = express();
const vehicleService = new VehicleService();
const vehicleController = new VehicleController(vehicleService);

app.use(express.json());
app.use(limiter);
app.use('/vehicle', vehicleController.getRouter());

app.listen(PORT, () => {
  console.log('Server running on PORT: ', PORT);
});

export { app };
