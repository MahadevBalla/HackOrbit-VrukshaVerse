export interface Plant {
    id: number;
    name: string;
    scientific_name?: string;
    region?: string;
    description?: string;
    image_url?: string;
    audio_url?: string;
    model_3d_url?: string;
}

export interface PlantSearchResult {
    plants: Plant[];
    total: number;
    page: number;
}