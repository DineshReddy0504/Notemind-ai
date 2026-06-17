import "dotenv/config";
import express from "express";
import cors from "cors";
import { notesRouter } from "./routes/notes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`NoteMind API listening on port ${PORT}`);
});
