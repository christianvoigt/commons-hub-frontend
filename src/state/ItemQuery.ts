import { DateStr } from "../DateString";

export interface ItemQuery {
    lat: number;
    long: number;
    address?: string;
    from?: DateStr;
    to?: DateStr;
    itemType?: string;
    features?: string[];
    onlyNonCommercial?: boolean;
    minBoxDimensions?: {
        width: number;
        height: number;
        length: number;
    };
    maxBikeDimensions?: {
        width: number;
        height: number;
        length: number;
    };
    minLoadCapacity?: number;
    nrOfWheels?: number;
    minSeatsForChildren?: number;
}
