import express, { Application, Request, Response } from "express";
import { routes } from "./routes";

const app: Application = express();
const PORT: number = 8000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("This root api");
});

routes(app);

app.listen(PORT, () => console.log("Running on Port ", PORT));
