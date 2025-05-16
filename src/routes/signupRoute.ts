import { Router, Request, Response, NextFunction } from "express";
const signupRoute = Router();
import bcrypt from "bcryptjs";
import prisma from "..";

interface SignUpBody {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

signupRoute.get("/", (req: Request, res: Response) => {
  res.render("signup", { error: undefined });
});

signupRoute.post(
  "/",
  async (
    req: Request<{}, {}, SignUpBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password, confirmPassword, firstname, lastname } = req.body;
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Password fields do not match." });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    try {
      await prisma.users.create({
        data: {
          email,
          hashed_password,
          firstname,
          lastname,
        },
      });
      res.redirect("/login");
    } catch (err: unknown) {
      next(err);
    }
  }
);

export default signupRoute;
