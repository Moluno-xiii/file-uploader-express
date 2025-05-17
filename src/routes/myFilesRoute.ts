import { Router, Request, Response } from "express";
import prisma from "..";
import authCheck from "../middlewares/authCheck";
const myFilesRoute = Router();

myFilesRoute.get("/", authCheck, async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    where: {
      owner_id: (req.user as any).id,
      folder_id: null,
    },
  });
  res.render("myFiles", { files });
});

export default myFilesRoute;
