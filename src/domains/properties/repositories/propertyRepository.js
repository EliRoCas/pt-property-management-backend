import e from "express";
import supabase from "../../../config/supabaseClient.js";
import { PropertyDto } from "../dtos/property.js";

export class PropertyRepository {
  constructor() {
    this.tableName = "properties";
  }

  async getAll() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error fetching properties: ${error.message}`);
    }

    return data.map((property) => new PropertyDto(property));
  }

  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching property with ID ${id}: ${error.message}`);
    }

    return data ? new PropertyDto(data) : null;
  }

  async create(propertyData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([propertyData])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating property: ${error.message}`);
    }

    return new PropertyDto(data);
  }

  async update(id, propertyData) {
    const { data: updatedProperty, error } = await supabase
      .from(this.tableName)
      .update(propertyData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating property: ${error.message}`);
    }

    if (!updatedProperty) {
      return null;
    }

    return new PropertyDto(updatedProperty);
  }

 
  async delete(id) {
    const { data: existingProperty, error } = await supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error finding property with ID ${id}`);
    }

    if (!existingProperty) {
      return null;
    }

    const { error: deleteError } = await supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw new Error(`Error deleting property with ID ${id}: ${deleteError.message}`);
    }

    return new PropertyDto(existingProperty);

    // return data ? new PropertyDto(data) : null;
  }
}
