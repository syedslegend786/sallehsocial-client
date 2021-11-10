import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root{
    --font-color-primary: black;
    --font-color-secondary: #D5D5D5;
    --background-color: white;
    --border-light-color: #D5D5D5;
    --border-dark-color: #BFBFBF;
    --button-color: #00FFF5;
}
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

body{
    background-color: var(--background-color);
    h1{
        font-size: 4rem;
    }
    a{
        color: black;
        font-size: 1rem;
        font-family: inherit;
        text-decoration: none;
    }
}
`

export default GlobalStyles