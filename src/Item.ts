export interface Item {
    _id: string;
    name: string;
    itemType: string;
    isCommercial: boolean;
    features: string[];
    loadCapacity: number;
    nrOfWheels: number;
    seatsForChildren: number;
    boxDimensions: {
        width: number;
        height: number;
        length: number;
    };
    bikeDimensions: {
        width: number;
        height: number;
        length: number;
    };
    project: {
        name: string;
        url: string;
    };
    description: string;
    url: string;
}
