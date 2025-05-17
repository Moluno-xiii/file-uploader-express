import { Request, Response, NextFunction } from "express";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res
      .status(401)
      .json(
        "You're not authorized to visit this page, only authenticated users can visit this page."
      );
    return;
  }
  next();
};

export default authCheck;
