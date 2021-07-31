import React from "react";

import styled from "@emotion/styled";

import CircularProgress from "@material-ui/core/CircularProgress";
import {modernEraFamily, getButtonColour} from '@dnd/theme'

const getPrimaryColours = {
  color: "#fff",
  borderColor: getButtonColour(2),
  backgroundColor: getButtonColour(1),
  ":hover": {
    backgroundColor: getButtonColour(2),
    borderColor: getButtonColour(2),
  },
  ":active": {
    backgroundColor: getButtonColour(1),
    borderColor: getButtonColour(2),
  },
};


const Container = styled("button")(
  {
    display: "inline-flex",
    flexDirection: "row",
    borderStyle: "solid",
    textDecoration: "none",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 500,
    borderRadius: 4,
    fontFamily: modernEraFamily,
    color: "#fff",
    ":focus": {
      outline: "none",
    },
    ":active": {
      transform: "scale(0.95)",
    },
  },
  (props) => {
    return {
      padding: props.padding || "5px 16px 5px 16px",
      fontSize: props.fontSize || 18,
    };
  },
  ({ disabled, stretch, secondary }) => {
    const baseRules = {
      cursor: disabled ? "auto" : "pointer",
      width: stretch ? "100%" : "auto",
      transition: "all .2s ease-in-out",
      color: '#ff0000',
      backgroundColor: '#00ff00',
      borderColor: '#0000ff',
      ":hover": {
        transition: "all .1s ease-in-out",
      },
      ":active": {
        transform: "none",
      },
    };

    //if (disabled) {
      //return { ...baseRules };
   //} else if (secondary) {
     // return { ...baseRules, ...getSecondaryColours };
    //} else {
      return { ...baseRules, ...getPrimaryColours };
    //}
  }
);

class Button extends React.PureComponent {
  static defaultProps = {
    submitting: false,
    disabled: false,
    outline: false,
  };

  render() {
    const {
      children,
      onClick,
      submitting,
      success,
      disabled,
      outline,
      icon,
      padding,
      fontSize,
      spinnerColor,
      ...other
    } = this.props;
    return (
      <Container
        onClick={!disabled && !success ? onClick : () => null}
      disabled={disabled || submitting}
        submitting={submitting}
        outline={outline}
        padding={padding}
        fontSize={fontSize}
        {...other}
      >
        {/* {submitting ? (
          <div style={{ marginRight: unit(1) }}>
            <CircularProgress
              color={disabledColor(10)}
              size={16}
              thickness={8}
            />
          </div>
        ) : icon ? (
          typeof icon === "string" ? (
            <img
              alt=""
              aria-hidden={true}
              src={icon}
              css={{ marginRight: unit(1) }}
            />
          ) : (
            <div
              css={{
                marginRight: unit(1),
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon}
            </div>
          )
        ) : null} */}
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </Container>
    );
  }
}

Button.defaultProps = {
  isLoading: false,
};

export default Button;