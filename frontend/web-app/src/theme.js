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