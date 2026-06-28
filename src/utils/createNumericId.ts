import type { Request, Response } from 'express';

export function createNumericId(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'no parameter provided' });
    return;
  }
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    res.status(400).json({ message: 'invalid id' });
    return;
  }
  return numericId;
}
