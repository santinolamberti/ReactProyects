import React from "react";
import { PropTypes } from "prop-types";
import "./footer.css";
import { Icon } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = ({ footerStyle, ...props }) => {
  return (
    <footer className={footerStyle}>
      <div className="footer">
        <hr className="hr1" />
        <Icon sx={{ color: "white" }}>
          <InstagramIcon />
        </Icon>
        <Icon sx={{ color: "white" }}>
          <YouTubeIcon />
        </Icon>
        <Icon sx={{ color: "white" }}>
          <TwitterIcon />
        </Icon>
        <hr className="hr2" />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerStyle: PropTypes.string,
};

Footer.defaultProps = {
  footerStyle: "footerStyle",
};
