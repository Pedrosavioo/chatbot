import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { ResponseGenerator } from "./chatbot/responseGenerator";

config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
   res.status(200).send("Tudo tranquilo");
});

const responseGenerator = new ResponseGenerator();

app.post(
   "/api/bot-message",
   responseGenerator.generate.bind(responseGenerator)
);

app.listen(PORT, () => {
   console.log(`Server is listening in port ${PORT}`);
});
