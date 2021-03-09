import { css } from "@emotion/core";

export const modernEraFamily =
  '"Modern Era", "Helvetica Neue", "Helvetica", "Arial", sans-serif;';

export const baseType = css({
  fontFamily: modernEraFamily,
  WebkitFontSmoothing: "antialiased",
});
export const baseText = css({
  fontFamily: modernEraFamily,
  fontWeight: 500,
  fontSize: "16px",
  color: "#555555",
  lineHeight: "24px",
  WebkitFontSmoothing: "antialiased",
});


export const PALETTE={
  beige:{
    1:"#faf0e6",	
    2:"#fff0db",	
    3:"#eed9c4",	
    4:"#e4d5b7",	
    5:"#d9b99b",
  }
}

export const getColorTint = (color, index = 3) => PALETTE[color][index];

export const getBackgroundColour = (index) => getColorTint("beige", index)