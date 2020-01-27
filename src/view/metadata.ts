import metadataFromJson from "commons-api/velogistics-metadata.json";
export const metadata = metadataFromJson;
export const featureLabels = metadata.features.reduce(
    (acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    },
    {} as { [key: string]: string }
);
export const itemTypeLabels = metadata.itemType.reduce(
    (acc, curr) => {
        acc[curr.id] = curr.name;
        return acc;
    },
    {} as { [key: string]: string }
);
