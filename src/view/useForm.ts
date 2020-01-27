import * as React from "react";
export const useForm = ({ initialValues, onSubmit, validate }) => {
    const [values, setValues] = React.useState(initialValues || {});
    const [touchedValues, setTouchedValues] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const handleChange = event => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({
            ...values,
            [name]: value
        });
    };
    const reset = newValues => {
        setValues(newValues);
    };

    const handleBlur = event => {
        const target = event.target;
        const name = target.name;
        setTouchedValues({
            ...touchedValues,
            [name]: true
        });
        const e = validate(values);
        setErrors({
            ...errors,
            ...e
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const e = validate(values);
        setErrors({
            ...errors,
            ...e
        });
        onSubmit({ values, errors });
    };

    return {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        reset
    };
};
