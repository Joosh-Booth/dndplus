import React from "react";

import styled from "@emotion/styled";

import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled("button")(
  {
    display: "inline-flex",
    flexDirection: "row",
    borderWidth: 1,
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
      padding: props.padding || "14px 20px 14px 20px",
      fontSize: props.fontSize || 18,
    };
  },
  ({ disabled, stretch, secondary }) => {
    const baseRules = {
      cursor: disabled ? "auto" : "pointer",
      width: stretch ? "100%" : "auto",
      transition: "all .2s ease-in-out",
      color: disabledColor(6),
      backgroundColor: disabledColor(3),
      borderColor: disabledColor(3),
      ":hover": {
        transition: "all .1s ease-in-out",
      },
      ":active": {
        transform: "none",
      },
    };

    if (disabled) {
      return { ...baseRules };
    } else if (secondary) {
      return { ...baseRules, ...getSecondaryColours };
    } else {
      return { ...baseRules, ...getPrimaryColours };
    }
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
        {submitting ? (
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
        ) : null}
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