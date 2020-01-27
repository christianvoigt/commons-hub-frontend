import React from "react";
import { Field, FieldProps } from "formik";
// import { FormValues } from "./app";
import styled from "styled-components";

export const LinkList = styled.ul`
    margin: 0;
    padding: 0;
    li {
        margin: 0;
        padding: 0;
        list-style: none;
        border-bottom: 1px solid lightgray;
        &:last-child {
            border-bottom: 0;
        }
    }
`;
