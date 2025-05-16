import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import expressSession from "express-session";
import { PrismaClient } from "../generated/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { errorHandler } from "./middlewares/errorHandler";
import indexRoute from "./routes/indexRoute";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";
import passport from "passport";
import { initializePassport } from "./config/passport";
import logoutRoute from "./routes/logoutRoute";
import uploadFileRoute from "./routes/uploadFileRoute";
import myFilesRoute from "./routes/myFilesRoute";
import myFoldersRoute from "./routes/myFoldersRoute";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

initializePassport();

app.use(
  expressSession({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.authenticate("session"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user;
  console.log(req.user);
  next();
});

app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/logout", logoutRoute);
app.use("/upload", uploadFileRoute);
app.use("/my-files", myFilesRoute);
app.use("/my-folders", myFoldersRoute);

app.use(errorHandler);
app.use((req: Request, res: Response) => {
  res.status(404).json("Route not found");
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port  ${process.env.PORT}`)
);
