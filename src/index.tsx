import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { Routes } from "~view/Routes";
import Header from "~view/Header";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "~theme";
import { createGlobalStyle } from "styled-components";
import i18n from "./translation/i18n";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; 
    padding: 0;
  }
`;
const language = i18n.language;
const store = configureStore(history, language);
export type CHState = ReturnType<typeof store.getState>;
const StyledApp = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap");

  background-color: ${p => p.theme.headerBgColor};
  min-height: 100%;
  text-align: left;
  position: absolute;
  width: 100%;
  text-align: left;
  font-family: sans-serif;
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
    &:visited,
    &:active {
      color: ${p => p.theme.mainColor1};
    }
  }
`;
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Header />
        <Routes />
        <GlobalStyle />
      </StyledApp>
    </ThemeProvider>
  );
};
const render = App => {
  const rootElement = document.getElementById("root");
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement
    );
  }
};
render(App);
