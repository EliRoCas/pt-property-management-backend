import { PropertyService } from "../services/propertyService.js";

export class PropertyController {
  constructor() {
    this.propertyService = new PropertyService();
  }

  async getProperties(req, res) {
    try {
      const properties = await this.propertyService.getAllProperties();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProperty(req, res) {
    const { id } = req.params;
    try {
      const property = await this.propertyService.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProperty(req, res) {
    try {
      if (!req.body.title || !req.body.description) {
        return res.status(400).json({ error: "Title and description are required" });
      }
      const newProperty = await this.propertyService.createProperty(req.body);
      res.status(201).json({
        message: "Property created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProperty(req, res) {
    const { id } = req.params;
    try {
      if (!req.body.title && !req.body.description) {
        return res.status(400).json({ error: "Title or description is required" });
      }
      const updatedProperty = await this.propertyService.updateProperty(id, req.body);
      if (!updatedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.status(200).json({
        data: updatedProperty, 
        message: "Property updated successfully",});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProperty(req, res) {
    const { id } = req.params;
    try {
      const deletedProperty = await this.propertyService.deleteProperty(id);
      if (!deletedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.status(204).send("Property deleted successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
