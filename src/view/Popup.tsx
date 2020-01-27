import * as React from "react";
import { Button, SubmitButton } from "./Button";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const Popup = ({ title, onCancel, onSubmit, children }) => {
    const { t, i18n } = useTranslation();
    return (
        <StyledPopup>
            <form className="popup" onSubmit={onSubmit}>
                <header>
                    <h3>{title}</h3>
                </header>
                <section className="content">{children}</section>
                <footer>
                    <Button onClick={onCancel}>
                        {t("popupCancel", "Cancel")}
                    </Button>
                    <Button type="submit">{t("popupApply", "Apply")}</Button>
                </footer>
            </form>
        </StyledPopup>
    );
};
const StyledPopup = styled.div`
    position: fixed;
    top: 6.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    .popup {
        color: #fff;
        border-radius: 0.2rem;
        min-width: 40rem;
        background-color: ${p => p.theme.headerLightBgColor};
        margin: 0rem auto;
        max-width: 45rem;
        max-height: 100%;
        display: flex;
        flex-direction: column;
    }
    header {
        padding: 1rem;
        color: #fff;
        background-color: ${p => p.theme.headerBgColor};
        h3 {
            margin: 0;
        }
    }
    section.content {
        padding: 1rem;
        flex: 1;
        overflow: auto;
        color: #fff;
    }
    footer {
        padding: 1rem;
        background-color: ${p => p.theme.headerBgColor};
        button {
            margin-right: 0.5rem;
        }
    }
`;
