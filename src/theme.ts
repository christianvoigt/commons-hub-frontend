import "styled-components";
export const theme = {
    headerBgColor: "#24292e",
    headerLightBgColor: "#404448",
    headerLoadingBg: "#75644e",
    mainColor1: "#57AA63",
    mainColor1Dark: "#386F40",
    mainColor1Hover: "#5DB36A",
    mainColor1Light: "#5DB36A",
    mainColor1Lighter: "#AED6B4",
    mainColor2: "#dec732",
    mainColor2Hover: "#d1b91d",
    mainColor2Light: "#ddd6a6",
    mainColor2Lighter: "#e9e7d3"
};
type Theme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}

// light blue: #4b6177
// dark blue: #24292e

// dark brown: #272117
// light brown: #4a3e2f
