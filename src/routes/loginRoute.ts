import { Router, Request, Response } from "express";
import passport from "passport";
const loginRoute = Router();

loginRoute.get("/", (req: Request, res: Response) => {
  const messages = (req.session as any).messages || [];
  const message = messages.length > 0 ? messages[0] : undefined;
  res.render("login", { message });
});

loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

export default loginRoute;
