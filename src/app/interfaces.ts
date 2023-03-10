
interface IObjectKeys {
    [key: string]: string | number | any;
  }

export interface Planet extends IObjectKeys {
    id: number;
    name: string;
    rotation_period: number,
    orbital_period: number,
    diameter: number,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: number,
    population: number,
    residents: Person[],
    films: Film[],
    url: string;
};

export interface Person extends IObjectKeys {
    id: number;
    name: string;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Film[];
    species: Species[];
    starships: Starship[];
    vehicles: Vehicle[];
    url: string;
}

export interface Film extends IObjectKeys {
    id: number;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Person[];
    planets: Planet[];
    species: Species[];
    vehicles: Vehicle[];
    starships: Starship[];
    url: string;
}

export interface Species extends IObjectKeys {
    id: number;
    name: string;
    classification: string;
    designation: string;
    average_height: number;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: number;
    homeworld: string;
    language: string;
    people: Person[];
    films: Film[];
}

export interface Vehicle extends IObjectKeys {
    id: number;
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: Film[];
    pilots: Person[];
}

export interface Starship extends IObjectKeys {
    id: number;
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: Film[];
    pilots: Person[]
}

export interface DataTablePagination {
    length: number;
    pageSize: number;
    paginatorEnabled: boolean;
}

export interface DataTableElement {
    name: string;
    field: string;
    object_key: string;
    data: any[];
    pagination: DataTablePagination;
    columns: Object;
}
  