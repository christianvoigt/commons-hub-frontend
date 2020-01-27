import * as React from "react";
import styled from "styled-components";

export const SelectOptions = ({ id, value, onChange, children }) => {
    return (
        <StyledSelect>
            <select name={id} id={id} onChange={onChange} value={value}>
                {children}
            </select>
        </StyledSelect>
    );
};

const StyledSelect = styled.div`
    position: relative;
    height: 47.5px;
    background: white;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 1em;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #000 transparent transparent transparent;
        pointer-events: none;
    }

    &:before {
        width: 30px;
        position: absolute;
        top: 1px;
        right: 1px;
        bottom: 1px;
        background: whitesmoke;
        content: "";
        pointer-events: none;
    }

    &:hover {
        &:before {
            background: ${p => p.theme.mainColor2Lighter};
        }
        &:after {
            border-color: ${p => p.theme.mainColor2} transparent transparent;
        }
    }

    select {
        font-size: 14px;
        border: none;
        box-shadow: none;
        border-radius: 0;
        background: transparent;
        height: 100%;
        width: 100%;
        cursor: pointer;
        outline: none;
        padding-right: 35px;
        padding-left: 15px;
        border: 1px solid #111;

        // Disable default styling on ff
        -moz-appearance: none;

        // Disable ugly ass outline on firefox
        &:-moz-focusring {
            color: transparent;
            text-shadow: 0 0 0 #000;
        }

        // Disable default styling on webkit browsers
        -webkit-appearance: none;

        // Disable default arrow on IE 11+
        &::-ms-expand {
            display: none;
        }

        &:focus {
            border-color: ${p => p.theme.mainColor2Hover};
        }
    }
    /* @media all and (min-width: 0\0) and (min-resolution: 0.001dpcm) {
        select {
            padding-right: 0;
        }

        &:after,
        &:before {
            display: none;
        }
    } */
`;
