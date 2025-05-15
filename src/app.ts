import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import indexRoute from "./routes/indexRoute";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", indexRoute);

app.use(errorHandler);
app.use((req: Request, res: Response) => {
  res.status(404).json("Route not found");
});

app.listen(7001, () => console.log("listening on port 7001"));
