import express from "express";
import cors from "cors";
import propertyRoutes from "./src/routes/propertyRoutes.js";
import dotevnv from "dotenv";

dotevnv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
