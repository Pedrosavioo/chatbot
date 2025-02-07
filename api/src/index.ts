import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
   res.status(200).send("Tudo tranquilo");
});

app.listen(PORT, () => {
   console.log(`Server is listening in port ${PORT}`);
});
