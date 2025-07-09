export interface Plant {
    id: number;
    name: string;
    scientificName?: string;
    region?: string;
    description?: string;
    image?: string;
    audioUrl?: string;
    model_3d_url?: string;
}

export interface PlantSearchResult {
    plants: Plant[];
    total: number;
    page: number;
}