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
  color: "#E4E6F0",
  lineHeight: "24px",
  WebkitFontSmoothing: "antialiased",
});

export const textOutline = 
  `-1px -1px 0 #000,
  0   -1px 0 #000,
  1px -1px 0 #000,
  1px  0   0 #000,
  1px  1px 0 #000,
  0    1px 0 #000,
  -1px  1px 0 #000,
  -1px  0   0 #000`


export const PALETTE={
  beige:{
    1:"#faf0e6",	
    2:"#fff0db",	
    3:"#eed9c4",	
    4:"#e4d5b7",	
    5:"#d9b99b",
  },
  grey:{
    1:'#282424',
    2:'#615757',
  },
  blue:{
    1:'#1D3C61',
    2:'#366eb3',
    3:'#3C7AC7',
    4:'#438AE0',
    5:'#4792ED',
  }
}

export const getColorTint = (color, index = 3) => PALETTE[color][index];

export const getBackgroundColour = (index) => getColorTint("grey", index)
export const getButtonColour = (index) => getColorTint("grey", index)
export const getBorderColour = (index) => getColorTint("blue", index)