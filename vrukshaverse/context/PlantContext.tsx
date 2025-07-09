import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Plant } from '@/types/plant';

interface PlantContextType {
    plants: Plant[];
    setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export const PlantProvider = ({ children }: { children: ReactNode }) => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <PlantContext.Provider value={{ plants, setPlants, searchQuery, setSearchQuery }}>
            {children}
        </PlantContext.Provider>
    );
};

export function usePlant() {
    const context = useContext(PlantContext);
    if (!context) {
        throw new Error('usePlant must be used within a PlantProvider');
    }
    return context;
}
