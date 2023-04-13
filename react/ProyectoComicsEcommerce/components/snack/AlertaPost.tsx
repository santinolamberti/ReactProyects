import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface IAlertPostProps {
  mensaje: string;
}

const AlertaPost: React.FC<IAlertPostProps> = ({ mensaje }) => {
  const [mostrar, setMostrar] = React.useState(true);

  const handleClose = () => {
    setMostrar(false);
  };

  return (
    <>
      <Snackbar open={mostrar} onClose={handleClose} key={mensaje}>
        <MuiAlert onClose={handleClose} severity="error">
          {mensaje}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AlertaPost;