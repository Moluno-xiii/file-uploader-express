import { Router, Request, Response, NextFunction } from "express";
import upload from "../middlewares/multerUpload";
import prisma from "..";

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
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("file uploaded", req.file);
    await prisma.file.create({
      data: {
        name: req.file?.originalname as string,
        file_url: req.file?.path as string,
        size: req.file?.size as number,
        owner_id: (req.user as any).id,
        folder_id: req.body.folderId !== "none" ? req.body.folderId : null,
      },
    });
    console.log("request body :", req.body);
    res.redirect("/my-files");
    // res.json({ message: "file uploaded successfully" });
  }
);

export default uploadFileRoute;
