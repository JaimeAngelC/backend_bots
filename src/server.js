import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ragRoutes from "./routes/ragRoutes.js";
import ragRoutesPdf from "./routes/ragRoutesPdf.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/*app.use("/api/rag", ragRoutes);*/
app.use("/api/rag", ragRoutesPdf);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});