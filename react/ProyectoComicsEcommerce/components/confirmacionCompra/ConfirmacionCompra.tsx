import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import useOrder from "../useOrder";
import { useRouter } from "next/router";



export type IComicOrden = {
    nombre: string;
    imagen: string;
    precio: number;
};

const ConfirmacionCompra: React.FC = () => {
  const { state, dispatch } = useOrder();
  const router = useRouter()

React.useEffect(() => {
  if(!state.order.orden){
    router.push("/")
  }
})

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "10px"
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "6%",
          backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: "white", fontSize: "40px" }}
        >
          Felicitaciones
        </Typography>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Image
            src={state?.order?.orden?.imagen}
            height={10}
            width={10}
            layout="responsive"
            objectFit="contain"
          />
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {state?.order?.orden?.nombre}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>${state?.order?.orden?.precio}</Typography>
        </CardContent>
      </Card>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Box sx={{ width: "80%", display: "flex", justifyContent: "space-evenly" }}>
        <Paper elevation={3} sx={{ width: "45%" }}>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        Datos personales
        </Typography>
        <Typography >
        {state?.order?.usuario?.nombre + " " + state?.order?.usuario?.apellido}
        </Typography>
        <Typography>
        {state?.order?.usuario?.email}
        </Typography>
      </CardContent>
    </Card>
    </Paper>
    <Paper elevation={3} sx={{ width: "45%" }}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        Dirección de entrega
        </Typography>
        <Typography >
        {`${state?.order?.usuario?.entrega?.direccion} ${state?.order?.usuario?.entrega?.departamento}`}
        </Typography>
        <Typography>
        {`${state?.order?.usuario?.entrega?.ciudad}, ${state?.order?.usuario?.entrega?.provincia} (${state?.order?.usuario?.entrega?.codPostal})`}
        </Typography>
      </CardContent>
    </Card>
    </Paper>
    </Box>
    </Box>
    </Box>
  );
};

export default ConfirmacionCompra;
