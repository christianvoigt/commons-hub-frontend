import React from "react";
import { Field, FieldProps } from "formik";
// import { FormValues } from "./app";
import styled from "styled-components";
import CurrentLocationIcon from "./baseline-gps_fixed-24px.svg";
import SearchIcon from "./baseline-search-24px.svg";

export const Button = styled.button`
    background-color: ${props => props.theme.mainColor2};
    color: #183308;
    border-radius: 0.2rem;
    display: inline-block;
    border: 0;
    padding: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.mainColor2Hover};
    }
    &:active,
    &:focus {
        border: 0;
    }
`;
export const StyledSubmitButton = styled(Button)`
    cursor: pointer;
    border-radius: 0.2rem;
    background-color: ${props => props.theme.mainColor1};
    color: ${props => props.theme.mainColor1Lighter};
    border: 0;
    text-transform: lowercase;
    margin-right: 0.5rem;
    padding: 0.5rem;
    &:hover {
        background-color: ${props => props.theme.mainColor1Hover};
    }
    &:active,
    &:focus {
        border: 0;
    }
`;
export const SubmitButton: React.SFC<{ text: string }> = ({ text }) => (
    <StyledSubmitButton type="submit">{text}</StyledSubmitButton>
);

const StyledCurrentLocationButton = styled(Button)`
    width: auto;
    display: flex;
    color: #000;
    background-color: ${props => props.theme.mainColor2};
    margin-right: 0;
    border-radius: 0;
    border-right: 1px solid ${p => p.theme.headerLightBgColor};
    border-left: 1px solid ${p => p.theme.headerLightBgColor};
    margin-bottom: 0.5rem;
    &:hover {
        background-color: ${props => props.theme.mainColor2Hover};
    }
`;
export const CurrentLocationButton: React.SFC<{ onClick: () => void }> = ({
    onClick
}) => (
    <StyledCurrentLocationButton
        title="Use current location"
        type="button"
        onClick={onClick}
    >
        <img src={CurrentLocationIcon} />
    </StyledCurrentLocationButton>
);
export const SearchSubmitButton: React.SFC = () => {
    return (
        <StyledSubmitButton title="Search" type="submit">
            <img src={SearchIcon} />
        </StyledSubmitButton>
    );
};

export const BookButton: React.SFC<{ text: string; href: string }> = ({
    text,
    href
}) => {
    return <StyledBookButton href={href}>{text}</StyledBookButton>;
};
const StyledBookButton = styled.a`
    display: inline-block;
    background-color: ${p => p.theme.mainColor2};
    color: #000 !important;
    border-radius: 0.2rem;
    border: 0;
    padding: 0.5rem;
    &:hover {
        background-color: ${props => props.theme.mainColor2Hover};
    }
    &:active,
    &:focus {
        border: 0;
    }
`;
