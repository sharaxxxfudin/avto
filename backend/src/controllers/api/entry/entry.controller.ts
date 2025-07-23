import { Request, Response } from "express";
import { entryService } from "../../../services/api/entry/entry.service";

export default async function getContacts(req: Request, res: Response) {
  const { data } = await entryService.getContacts();
  res.json(data);
}