import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #fff;
    color: #000;
    -webkit-font-smoothing: antialiased; /* Safari */
    -moz-osx-font-smoothing: grayscale; /* Firefox */
    text-rendering: optimizeLegibility; /* Chrome, Opera */
  }

  html, body, #root {
    height: 100%;
  }

  /* Outros estilos globais */
`;

export default GlobalStyles;
