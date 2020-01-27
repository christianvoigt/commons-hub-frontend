import React, { FunctionComponent } from "react";
import styled from "styled-components";

const StyledLink = styled.a`
    display: block;
    padding: 0.2em 0em;
    &.row {
        display: block;
        padding: 0.75em 1em;
        background-color: #fff;
    }
    &:hover {
        background-color: #eee;
    }
`;
const Link: FunctionComponent<{
    active: boolean;
    onClick: () => void;
    className?: string;
}> = ({ active, children, onClick, className = "" }) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <StyledLink
            className={className}
            href=""
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </StyledLink>
    );
};
export default Link;
