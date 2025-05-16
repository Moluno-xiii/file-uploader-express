import { Router, Request, Response } from "express";
import prisma from "..";
const myFilesRoute = Router();

myFilesRoute.get("/", async (req: Request, res: Response) => {
  console.log("user details : ", req.user);
  const files = await prisma.file.findMany({
    where: {
      owner_id: (req.user as any).id,
      folder_id: null,
    },
  });
  console.log("user files :", files);
  res.render("myFiles", { files });
});

export default myFilesRoute;
