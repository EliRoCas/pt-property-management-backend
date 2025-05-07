import { PropertyRepository } from "../repositories/propertyRepository.js";
import { PropertyCreateDto, PropertyUpdateDto } from "../dtos/property.js";

export class PropertyService {
  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async getAllProperties() {
    return await this.propertyRepository.getAll();
  }

  async getPropertyById(id) {
    return await this.propertyRepository.getById(id);
  }

  async createProperty(propertyData) {
    const propertyDto = new PropertyCreateDto(propertyData);
    return await this.propertyRepository.create(propertyDto);
  }

  async updateProperty(id, propertyData) {
    const propertyDto = new PropertyUpdateDto(propertyData);
    return await this.propertyRepository.update(id, propertyDto);
  }

  async deleteProperty(id) {
    return await this.propertyRepository.delete(id);
  }
}
