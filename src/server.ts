import express from "express";
import cors from "cors";

import { changeDecree, routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

changeDecree();

app.listen(process.env.PORT || 3333, () => console.log("Server is running!"));
