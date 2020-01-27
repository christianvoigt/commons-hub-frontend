export interface Location {
    _id: string;
    name: string;
    description: string;
    address: string;
    url: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    availableItems: string[];
    filteredItems: string[];
}
