import React from "react";
import { Global, css } from "@emotion/react";
import { getBackgroundColour, modernEraFamily } from "@dnd/theme";

const GlobalStyles = () => (
  <Global
    styles={css`
      html {
        box-sizing: border-box;
        background: linear-gradient(183deg, white 0%, ${getBackgroundColour(3)} 65%,  ${getBackgroundColour(5)} 100%);
        min-height:100%;
        height: auto;
      }
      *,
      *:before,
      *:after {
        -webkit-overflow-scrolling: touch;
        box-sizing: inherit;
      }
      body,
      body {
        font-size: 16px;
        line-height: 1.4;
        overflow: auto;
      }
      ul,
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      input,
      textarea,
      select {
        outline: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 400;
        margin: 0;
      }
      /* Make clicks pass-through */
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: #fcd535;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
      }
      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 12px #fcd535, 0 0 6px #fcd535;
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}
  />
);
export default GlobalStyles;