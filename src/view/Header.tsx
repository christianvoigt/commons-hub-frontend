import * as React from "react";
import Loading from "./Loading";
import { NavLink } from "redux-first-router-link";
import { RouteActions, ROUTE_HOME } from "~state/RouteActions";
import GeocodeSearch from "./GeocodeSearch";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import bgImg from "./velogistics-cover.jpg";
import { Logo } from "./Logo";
import { LocaleSelect } from "./LocaleSelect";
import { UIActions } from "~state/UIActions";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";

const Header = ({
    route,
    isStandalone
}: {
    route: any;
    isStandalone?: boolean;
}) => {
    const isLoading = false;
    const isHome = !isStandalone && (!route || route === ROUTE_HOME);
    const isHomeClass = isHome ? "home" : "";
    const { t, i18n } = useTranslation();
    return (
        <StyledHeader className={isHomeClass}>
            <NavLink
                exact
                to={RouteActions.home()}
                className="logo-link home-link"
            >
                <Logo className={isHomeClass} />
            </NavLink>
            {isHome ? (
                <div>
                    <Claim>
                        {t(
                            "searchFind",
                            "Find an available cargobike in your area:"
                        )}
                    </Claim>
                </div>
            ) : null}
            <ItemQuery className={isHomeClass}>
                <div className="row">
                    <GeocodeSearch />
                </div>
            </ItemQuery>
            {!isHome ? <Loading isLoading={isLoading} /> : null}
            <MainMenu className={isHomeClass}>
                <ul>
                    <li>
                        <a href="">{t("menuShare", "Share your bike")}</a>
                    </li>
                    <li>
                        <a href="">{t("menuAbout", "About")}</a>
                    </li>
                    <li>
                        <LocaleSelect />
                    </li>
                </ul>
            </MainMenu>
            {/* <h1 className="App-title">Velogistics</h1> */}
        </StyledHeader>
    );
};
const mapStateToProps = state => ({
    route: state.location.type
});
export default connect(mapStateToProps)(Header);

// const StyledSiteName = styled(SiteName)`
//     max-height: 4rem;
//     font-size: 4rem;
//     color: ${p => p.theme.mainColor1};
//     font-weight: bold;
//     margin: 0 auto;
//     text-align: center;
//     margin-top: 0.5rem;
//     margin-bottom: 2rem;
//     font-family: Rubik;
// `;
const Claim = styled.div`
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
    font-size: 1.75rem;
    font-weight: normal;
    text-transform: lowercase;
    color: ${p => p.theme.mainColor2};
    background-color: ${p => p.theme.headerBgColor};
    padding: 1rem 0;
`;
const MainMenu = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    ul,
    li {
        margin: 0;
        padding: 0;
        text-indent: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        a {
            display: flex;
            padding: 0.5rem 1rem;
            text-decoration: none;
            text-transform: lowercase;
            font-weight: 300;
            font-size: 1.4rem;
            color: $main-color-2;
            &:hover,
            &:active {
                color: ${props => props.theme.mainColor2Hover};
            }
        }
    }
    &.home {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
        background-color: ${p => p.theme.headerBgColor};
    }
`;
const ItemQuery = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.headerLightBgColor};
    max-width: 600px;
    display: flex;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
    padding: 0 1.5rem;
    .row {
        width: 100%;
        display: flex;
    }
    &.home {
        margin: 0 auto;
        height: 100px;
    }
`;
const StyledHeader = styled.header`
    background-color: ${props => props.theme.headerBgColor};
    border-color: ${props => props.theme.headerBgColor};
    color: #fff;
    height: 100px;
    color: white;
    padding-left: 160px;
    padding-right: 1rem;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    .logo-link {
        height: 90px;
        display: block;
        position: absolute;
        left: 10px;
        top: 8px;
        img {
            height: 100%;
            width: auto;
        }
    }
    &.home {
        width: 100%;
        height: 100vh;
        max-height: 800px;
        padding: 0;
        display: block;
        background-color: transparent;
        background: url(${bgImg}) no-repeat center center;
        background-size: cover;
        margin-top: 3rem;
        padding-top: 2rem;
        .logo-link {
            display: block;
            height: 250px;
            width: 250px;
            border-radius: 50%;
            /* border: 1px solid #efefef; */
            background-color: ${p => p.theme.headerLightBgColor};
            /* background-color: rgba(255, 255, 255, 1); */
            padding: 40px;
            position: inherit;
            display: block;
            margin: 0 auto;
            margin-bottom: 3rem;
        }
    }
`;
