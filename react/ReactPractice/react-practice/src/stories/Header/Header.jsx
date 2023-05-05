import React from "react";
import { PropTypes } from "prop-types";
import "./header.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

export const Header = ({ headerStyle, ...props }) => {
  return (
    <header className={headerStyle}>
      <div className="header">
        <div className="tituloHeader">
          <Link to="/" color="white" underline="none">
            <p style={{ color: "white" }}>LAMBERFLIX</p>
          </Link>
        </div>
        <div className="botonesHeader">
          <Link to="/SignIn">
          <Button />
          </Link>
          <Link to="/LogIn">
            <Button label={"Registrarse"} />
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  headerStyle: PropTypes.string,
};

Header.defaultProps = {
  headerStyle: "headerStyle",
};
