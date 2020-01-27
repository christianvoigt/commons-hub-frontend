export const getQueryString = (queryParams: {
    [key: string]: number | string;
}): string => {
    const esc = encodeURIComponent;
    return Object.keys(queryParams)
        .map(k => `${esc(k)}=${esc(queryParams[k].toString())}`)
        .join("&");
};
