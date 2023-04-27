import React from "react"
import { PropTypes } from "prop-types"
import"./footer.css"
import { Box, Icon } from "@material-ui/core";
import { Instagram, Twitter, YouTube } from "@material-ui/icons";

export const Footer = ({footerStyle, ...props}) => {
    return(
        <footer
        className={footerStyle}
        >
            <div className="footer">
           <hr className="hr1"/>
           <p>icono</p>
           <p>icono</p>
           <p>icono</p>
           <hr className="hr2"/>
           </div>
        </footer>
    )
}

Footer.propTypes = {
    footerStyle: PropTypes.string
}

Footer.defaultProps = {
    footerStyle: "footerStyle"
}