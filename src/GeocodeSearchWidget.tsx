import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureHeaderStore from "./configureStore";
import GeocodeSearch from "~view/GeocodeSearch";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "~theme";
import { createGlobalStyle } from "styled-components";
import "./translation/i18n";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; 
    padding: 0;
  }
`;
const store = configureHeaderStore(history);
export type CHState = ReturnType<typeof store.getState>;
const StyledApp = styled.div`
  & * {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
  h1 {
    color: ${p => p.theme.mainColor1};
    font-size: 4rem;
    text-align: center;
  }
  h2 {
    color: #272117;
  }
  h3,
  a {
    color: ${p => p.theme.mainColor1};
    text-decoration: none;
  }
  flex: 1;
  width: 100%;
  height: 100px;
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
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GeocodeSearch isStandalone={true} />
      </StyledApp>
    </ThemeProvider>
  );
};
const render = App =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("geocode-search")
  );

render(App);
