import express, { Application, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";

const app: Application = express();
const PORT: number = 8000;
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "This is root api News Mobile App" });
});

routes(app);

app.listen(PORT, () => console.log("Running on Port ", PORT));
