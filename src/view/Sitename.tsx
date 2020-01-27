import * as React from "react";
import sitenameUrl from "./velogistics-sitename-white.svg";
import styled from "styled-components";
export const Sitename = ({ className }) => (
    <img className={className} alt="Velogistics" src={sitenameUrl} />
);
