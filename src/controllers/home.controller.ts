import { Request, Response } from "express";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Wisata Anyer API V1.1" });
}
