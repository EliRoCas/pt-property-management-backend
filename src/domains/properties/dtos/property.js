export class PropertyDto {
    constructor({id, title, description, created_at}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_a = created_at;
    }
};

export class PropertyCreateDto {
    constructor({title, description}) {
        this.title = title;
        this.description = description;
    }
}

export class PropertyUpdateDto {
    constructor({id, title, description}) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

