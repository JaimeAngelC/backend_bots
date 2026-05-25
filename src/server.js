import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { askQuestion } from "./services/chatService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const answer = await askQuestion(question);

    res.json({
      answer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error interno",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en puerto 3000");
});