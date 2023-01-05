export interface Planet {
    id: number;
    name: string;
    rotationPeriod?: number,
    orbitalPeriod?: number,
    diameter?: number,
    climate?: string,
    gravity?: string,
    terrain?: string,
    surface_water?: number,
    population?: number,
}