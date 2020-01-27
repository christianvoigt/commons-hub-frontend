import * as React from "react";
import siteName from "./velogistics-sitename.svg";
import styled from "styled-components";
import { Sitename } from "./Sitename";
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";
import { LandingPageEn } from "./LandingPageEn";
import { LandingPageDe } from "./LandingPageDe";

export const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <StyledHome>
      <main className="content">
        <h1>
          <Sitename className="sitename" />
        </h1>
        <h2 className="claim">
          {t("aboutClaim", "Free Cargo Bikes Worldwide")}
        </h2>
        {i18n.language == "en" ? <LandingPageEn /> : <LandingPageDe />}
      </main>
      <Footer />
    </StyledHome>
  );
};

const StyledHome = styled.div`
    background-color: #fff;
    main {
        position:relative;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid ${p => p.theme.headerBgColor};
        /* box-shadow: 0 -8px 6px 0 ${p =>
          p.theme.headerBgColor};       margin: 0 auto; */
        padding: 1em;
        &:before {
            box-shadow: -10px -14px 10px -15px inset ${p =>
              p.theme.headerBgColor};
            content: " ";
            width: 100%;
            top: -15px;
            position: absolute;
            left:0;
            height: 15px;
        }
            .sitename {
                height: 7rem;
                width: auto;
                /* display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                background-color: ${p => p.theme.mainColor1};
                fill: #fff;
                border-radius: 1rem;
                margin: 0 auto; */
            }
        h1,
        h2 {
            text-align: center;
        }
        h1 + h2.claim {
            font-size: 2rem;
            margin-top: -2rem;
        }
    }
    .row {
        display: flex;
        justify-content: center;
        section {
            flex: 1;
            max-width: 25rem;
            padding: 2rem 4rem;
        }
    }
    footer{
        background-color:  ${p => p.theme.headerLightBgColor};
        padding: 4rem;
        ul{
            padding: 0;
            margin: 0;
            list-style-type: none;
            li{
                padding: 0.5rem 0;
                font-size: 1.2rem;
            }
        }
    }
`;
