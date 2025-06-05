import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Plus Jakarta Sans", sans-serif; /* Fonte padrão */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Inria Sans", sans-serif; /* Fonte dos títulos */
  }

  button {
    cursor: pointer;
  }

`;
