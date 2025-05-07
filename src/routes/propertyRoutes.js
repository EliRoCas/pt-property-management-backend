import express from "express";
import { PropertyController } from "../domains/properties/controllers/propertyController.js";

const router = express.Router();
const propertyController = new PropertyController();

router.get("/", propertyController.getProperties.bind(propertyController));
router.get("/:id", propertyController.getProperty.bind(propertyController));
router.post("/", propertyController.createProperty.bind(propertyController));
router.delete("/:id", propertyController.deleteProperty.bind(propertyController));

export default router;
