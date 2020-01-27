import * as React from "react";
import { locales } from "../locales";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

// import styled from "styled-components";

export const LocaleSelect = () => {
    const { t, i18n } = useTranslation();
    return (
        <StyledLocaleSelect>
            <select
                onChange={({ target }) => {
                    //i18n.changeLanguage(target.value);
                    //switch url
                }}
            >
                {Object.keys(locales).map(key => {
                    return (
                        <option value={key} key={key}>
                            {locales[key]}
                        </option>
                    );
                })}
            </select>
        </StyledLocaleSelect>
    );
};
const StyledLocaleSelect = styled.div`
    position: relative;
    display: inline-block;
    height: 2.5em;
    background: transparent;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    padding-left: 1rem;
    margin-right: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
        border-color: ${p => p.theme.mainColor1} transparent transparent
            transparent;
        pointer-events: none;
    }

    &:before {
        width: 30px;
        position: absolute;
        top: 1px;
        right: 1px;
        bottom: 1px;
        background: transparent;
        content: "";
        pointer-events: none;
    }
    select {
        &::-ms-expand {
            display: none;
        }
        &:focus::-ms-value {
            background-color: transparent;
        }
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        background-color: ${props => props.theme.headerLightBgColor};
        border-radius: 0.2rem;

        color: ${p => p.theme.mainColor1};
        border: none;
        width: 100%;
        height: 100%;
        padding: 0.4rem;
        min-width: 6rem;
        position: relative;
        cursor: pointer;
        text-transform: lowercase;
    }

    option {
        background-color: #fff;
        color: #000;
        text-transform: lowercase;
    }
`;
