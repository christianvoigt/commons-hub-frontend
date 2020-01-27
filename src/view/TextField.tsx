import React from "react";
import { Field, FieldProps } from "formik";
// import { FormValues } from "./app";
import styled from "styled-components";

const Title = styled.h2`
    font-family: Arial, Helvetica, sans-serif;
    color: cornflowerblue;
    margin-bottom: 5px;
`;

export const FormInput = styled.input`
    border-radius: 0.2rem 0 0 0.2rem;
    background-color: #ddd6a6;
    border: 0;
    color: #183308;
    padding: 0.5em 0.75em;
`;

const InputError = styled.div`
    color: red;
    font-family: Arial, Helvetica, sans-serif;
    margin: 15px 0;
`;

interface Props {
    title: string;
    name: string;
}

type TextFieldProps = FieldProps<Props> & Props;
const TextField: React.SFC<TextFieldProps> = ({ name, title, field, form }) => (
    <label htmlFor={field.name}>
        <div>{title}</div>
        <FormInput type="text" {...field} />
        {form.touched[field.name] && form.errors[field.name] ? (
            <InputError>{form.errors[field.name]}</InputError>
        ) : null}
    </label>
);
export const SimpleTextField: React.SFC<TextFieldProps> = ({
    name,
    title,
    field,
    form
}) => <FormInput type="text" {...field} />;

export default TextField;
