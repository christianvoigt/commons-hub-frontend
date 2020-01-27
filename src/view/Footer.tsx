import React from "react";
import { useTranslation } from "react-i18next";
import { FooterContentEn } from "./FooterContentEn";
import { FooterContentDe } from "./FooterContentDe";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer>
      {i18n.language == "en" ? <FooterContentEn /> : <FooterContentDe />}
    </footer>
  );
};
