import { Router, Request, Response, NextFunction } from "express";
import upload from "../middlewares/multerUpload";
import prisma from "..";
import authCheck from "../middlewares/authCheck";

const uploadFileRoute = Router();

uploadFileRoute.get("/", async (req: Request, res: Response) => {
  const folders = await prisma.folder.findMany({
    where: {
      owner_id: (req.user as any).id,
    },
  });
  res.render("upload", {
    folders: [{ id: "none", name: "none" }, ...folders],
  });
});

uploadFileRoute.post(
  "/",
  upload.single("file"),
  authCheck,
  async (req: Request, res: Response, next: NextFunction) => {
    await prisma.file.create({
      data: {
        name: req.file?.originalname as string,
        file_url: req.file?.path as string,
        size: req.file?.size as number,
        owner_id: (req.user as any).id,
        folder_id: req.body.folderId !== "none" ? req.body.folderId : null,
      },
    });
    res.redirect("/my-files");
  }
);

export default uploadFileRoute;
