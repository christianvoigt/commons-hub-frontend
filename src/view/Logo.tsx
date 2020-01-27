import * as React from "react";
import logoUrl from "./velogistics-logo.svg";
import styled from "styled-components";
export const Logo = ({ className }) => (
    <img className={className} alt="Velogistics" src={logoUrl} />
);
