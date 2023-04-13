import ControlledTextInput from "./ControlledTextInput";
import * as React from "react";

import Stack from "@mui/material/Stack";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "./StepperNavigation";
import useOrder from "../useOrder";
import useStep from "../useStep";

export const datosEntregaSchema = yup
  .object({
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codPostal: yup.string().required("El codigo postal es requerido"),
  })
  .required();

export type DatosEntregaData = {
  direccion: string;
  departamento: string;
  ciudad: string;
  provincia: string;
  codPostal: string;
};

const DireccionEntrega: React.FC = () => {
  const { state, dispatch } = useOrder();
  const { state: stepState, dispatch: stepperDispatch } = useStep();

  const methods = useForm<DatosEntregaData>({
    resolver: yupResolver(datosEntregaSchema),
    defaultValues: {
      direccion: "",
      departamento: "",
      ciudad: "",
      provincia: "",
      codPostal: "",
    },
  });
  const { setFocus, handleSubmit } = methods;
  const onSubmit = (data: DatosEntregaData) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data,
    });
    stepperDispatch({
      type: "SET_STEP",
      payload: ++stepState.step.step,
    });
  };

  React.useEffect(() => {
    setFocus("direccion");
  }, []);

  return (
    <Stack>
      <h3>Datos de entrega</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput
            name="direccion"
            label="Dirección y número"
            widthText="100%"
          />
          <ControlledTextInput
            name="departamento"
            label="Departamento, piso, etc"
            widthText="100%"
          />
          <ControlledTextInput name="ciudad" label="Ciudad" widthText="100%" />
          <ControlledTextInput
            name="provincia"
            label="Provincia"
            widthText="80%"
          />
          <ControlledTextInput
            name="codPostal"
            label="Cod Postal"
            widthText="19%"
          />
        </FormProvider>
        <StepperNavigation handleSubmit={handleSubmit(onSubmit)} />
      </form>
    </Stack>
  );
};

export default DireccionEntrega;
