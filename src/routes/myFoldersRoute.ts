import { Router, Request, Response } from "express";
import prisma from "..";
const myFoldersRoute = Router();

myFoldersRoute.get("/", async (req: Request, res: Response) => {
  const folders = await prisma.folder.findMany({
    where: {
      owner_id: (req.user as any).id,
    },
  });
  console.log("user folders :", folders);
  res.render("myFolders", { folders });
});

myFoldersRoute.get("/new", (req: Request, res: Response) => {
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

myFoldersRoute.get("/:folderId", async (req: Request, res: Response) => {
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
  console.log("folder details :", folder);
  res.render("folderDetails", { folder, folderFiles });
  console.log("folder id", req.params.folderId);
});

myFoldersRoute.post("/:folderId", async (req: Request, res: Response) => {
  await prisma.folder.delete({
    where: {
      id: req.body.folderId,
    },
  });
  res.redirect("/my-folders");
});

export default myFoldersRoute;
