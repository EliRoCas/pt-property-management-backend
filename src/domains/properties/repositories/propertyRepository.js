import supabase from '../../../config/supabaseClient.js';
import { PropertyDto } from '../dtos/property.js';

export class PropertyRepository {
    constructor() {
        this.tableName = 'properties';
    }

    async getAll() {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Error fetching properties: ${error.message}`);
        }

        return data.map(property => new PropertyDto(property));
    }

    async getById(id) {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('id', id)
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
            .single();

        if (error) {
            throw new Error(`Error creating property: ${error.message}`);
        }

        return new PropertyDto(data[0]);
    }

    async update(id, propertyData) {
        const { data, error } = await supabase
            .from(this.tableName)
            .update(propertyData)
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(`Error updating property with ID ${id}: ${error.message}`);
        }

        return new PropertyDto(data[0]);
    }

    async delete(id) {
        const { data, error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(`Error deleting property with ID ${id}: ${error.message}`);
        }

        return data ? new PropertyDto(data) : null;
    }
}