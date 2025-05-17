import { Router, Request, Response } from "express";
import prisma from "..";
import authCheck from "../middlewares/authCheck";
const myFoldersRoute = Router();

myFoldersRoute.get("/", authCheck, async (req: Request, res: Response) => {
  const folders = await prisma.folder.findMany({
    where: {
      owner_id: (req.user as any).id,
    },
  });
  res.render("myFolders", { folders });
});

myFoldersRoute.get("/new", authCheck, (req: Request, res: Response) => {
  res.render("newFolder");
});
myFoldersRoute.post("/new", async (req: Request, res: Response) => {
  await prisma.folder.create({
    data: {
      name: req.body.name as string,
      owner_id: Number(req.body.userId),
    },
  });
  res.redirect("/my-folders");
});

myFoldersRoute.get(
  "/:folderId",
  authCheck,
  async (req: Request, res: Response) => {
    const folder = await prisma.folder.findUnique({
      where: {
        id: req.params.folderId,
      },
    });
    const folderFiles = await prisma.file.findMany({
      where: {
        folder_id: req.params.folderId,
      },
    });
    res.render("folderDetails", { folder, folderFiles });
  }
);

myFoldersRoute.post(
  "/:folderId",
  authCheck,
  async (req: Request, res: Response) => {
    await prisma.folder.delete({
      where: {
        id: req.body.folderId,
      },
    });
    res.redirect("/my-folders");
  }
);

export default myFoldersRoute;
