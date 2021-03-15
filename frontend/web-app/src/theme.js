import { css } from "@emotion/react";

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
  },
  grey:{
    1:'#AAA9AD',
    2:'#848689',
    3:'#5B676D',
    4:'#2A3439',
    5:'#1F262A',
  }
}

export const getColorTint = (color, index = 3) => PALETTE[color][index];

export const getBackgroundColour = (index) => getColorTint("beige", index)
export const getButtonColour = (index) => getColorTint("grey", index)