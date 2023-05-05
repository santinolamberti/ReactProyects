import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "./button.css";

export const Button = ({ buttonType, label, onClick, ...props }) => {
  return (
    <button className={buttonType} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttonType: "account",
  label: "Iniciar sesión",
  onClick: undefined,
};
