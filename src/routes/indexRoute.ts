import { Router, Request, Response } from "express";

const indexRoute = Router();

indexRoute.get("/", (req: Request, res: Response) => {
  res.render("index");
});

export default indexRoute;
