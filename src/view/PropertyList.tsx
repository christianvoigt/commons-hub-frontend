import * as React from "react";
import styled from "styled-components";

export const PropertyList = styled.dl`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 0;
    dt,
    dd {
        margin: 0;
        padding: 0.75em 0;
    }
    dt {
        font-weight: bold;
    }
`;
