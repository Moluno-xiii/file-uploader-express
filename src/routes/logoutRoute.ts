import { Router, Request, Response, NextFunction } from "express";
const logoutRoute = Router();

logoutRoute.get("/", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
  });

  // req.session.destroy((err) => {
  //   if (err) return next(err);

  //   res.clearCookie("connect-sid");
  res.redirect("/");
  // });
});

export default logoutRoute;
