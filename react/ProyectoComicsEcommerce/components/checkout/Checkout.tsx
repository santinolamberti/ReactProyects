import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import DatosPersonalesForm from "./DatosPersonalesForm";
import Container from "@mui/material/Container";
import DireccionEntrega from "./DireccionEntregaForm";
import DatosPago from "./DatosPagoForm";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useOrder from "../useOrder";
import useStep from "../useStep";

export type StepActions = {
  activeStep: number;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export type CheckOutInfo = {
  formInfo: CheckoutInput;
  setFormInfo: (arg: CheckoutInput) => void;
};


const CheckOut: React.FC = () => {
  const { state, dispatch } = useOrder();
  const { state: stepState, dispatch: stepperDispatch } = useStep();

  React.useEffect(() => {
    stepperDispatch({
      type: "SET_STEP",
      payload: 0
    });
  }, [])
  return (
    <>
      <Container>
        <Box sx={{ width: "100%" }}>
        <h1>Checkout: {state.order.orden.nombre}</h1>
          <Stepper sx={{ width: "100%" }} activeStep={stepState.step.step} >
            <Step>
              <StepLabel>Datos Personales</StepLabel>
            </Step>
            <Step>
              <StepLabel>Dirección de entrega</StepLabel>
            </Step>
            <Step>
              <StepLabel>Datos del pago</StepLabel>
            </Step>
          </Stepper>
              {stepState.step.step === 0 && <DatosPersonalesForm />}
              {stepState.step.step === 1 && <DireccionEntrega />}
              {stepState.step.step === 2 && <DatosPago />}
        <Card sx={{ maxWidth: 275 }}>
        <CardContent>
        <Image
        src={state.order.orden.imagen}
        height={10}
        width={10}
        layout="responsive"
        objectFit="contain"
      />
          <Typography sx={{ fontSize: 20 }}  gutterBottom>
            {state.order.orden.nombre}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            ${state.order.orden.precio}
          </Typography>
        </CardContent>
      </Card>
      </Box>
      </Container>
    </>
  );
};

export default CheckOut;
