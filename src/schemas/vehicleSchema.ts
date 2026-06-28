import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z.string().min(8).optional(),
  model: z.string().min(3).optional(),
  year: z.number().min(1886).max(2026).optional(),
});
