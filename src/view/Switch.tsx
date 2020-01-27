import React from "react";
import styled from "styled-components";

const Switch = ({ id, switchTitle, checked, onToggleChange }) => {
    return (
        <StyledSwitch>
            <input
                checked={checked}
                onChange={onToggleChange}
                className="react-switch-checkbox"
                name={id}
                id={id}
                type="checkbox"
            />
            <label className={checked ? "checked" : "unchecked"} htmlFor={id}>
                <span className="switch">
                    <span className={`react-switch-button`} />
                </span>
                <span className="title">{switchTitle}</span>
            </label>
        </StyledSwitch>
    );
};

const StyledSwitch = styled.div`
    input {
        height: 0;
        width: 0;
        visibility: hidden;
        position: absolute;
    }
    label {
        display: flex;
        width: 100%;
        margin-bottom: 0.5em;
        margin-top: 0.5em;
        align-items: center;
    }
    .switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        width: 3em;
        height: 1.5em;
        background: grey;
        border-radius: 3em;
        position: relative;
        transition: background-color 0.2s;
        margin-right: 1em;
    }

    .switch .react-switch-button {
        content: "";
        position: absolute;
        top: 0.2em;
        left: 0.2em;
        width: 1.1em;
        height: 1.1em;
        border-radius: 1.1em;
        transition: 0.2s;
        background: #fff;
        box-shadow: 0 0 0.2em 0 rgba(10, 10, 10, 0.29);
    }

    input:checked + label .react-switch-button {
        left: calc(100% - 0.2em);
        transform: translateX(-100%);
    }

    label:active .react-switch-button {
        width: 1.5em;
    }
    label.checked .switch {
        /* background-color: #06d6a0; */
        background-color: ${p => p.theme.mainColor1Light};
    }
`;

export default Switch;
