import React from "react"
import { PropTypes } from "prop-types"
import"./header.css"
import { Button } from "../Button/Button";

export const Header = ({headerStyle, ...props}) => {
    return(
        <header
        className={headerStyle}
        >
            <div className="header">
            <div className="tituloHeader">
            <p>LAMBERFLIX</p>
            </div>
            <div className="botonesHeader">
            <Button />
            <Button label={"crearCuenta"}/>
            </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    headerStyle: PropTypes.string
}

Header.defaultProps = {
    headerStyle: "headerStyle"
}