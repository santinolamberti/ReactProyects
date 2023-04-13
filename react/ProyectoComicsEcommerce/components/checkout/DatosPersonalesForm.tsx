import ControlledTextInput from "./ControlledTextInput";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "./StepperNavigation";
import useOrder from "../useOrder";
import useStep from "../useStep";

export const datosPersonalesSchema = yup
  .object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup
      .string()
      .required("El mail es requerido")
      .email("Email no valido"),
  })
  .required();

export type DatosPersonalesData = {
  nombre: string;
  apellido: string;
  email: string;
};

const DatosPersonalesForm: React.FC = () => {
  const { state, dispatch } = useOrder();
  const { state: stepState, dispatch: stepperDispatch } = useStep();

  const methods = useForm<DatosPersonalesData>({
    resolver: yupResolver(datosPersonalesSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: DatosPersonalesData) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: data,
    });
    stepperDispatch({
      type: "SET_STEP",
      payload: ++stepState.step.step
    });
  };

  React.useEffect(() => {
    setFocus("nombre");
  }, []);

  return (
    <Stack>
      <h3>Datos personales</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput name="nombre" label="nombre" widthText="100%" />
          <ControlledTextInput
            name="apellido"
            label="apellido"
            widthText="100%"
          />
          <ControlledTextInput name="email" label="email" widthText="100%" />
        </FormProvider>
        <StepperNavigation handleSubmit={handleSubmit(onSubmit)} />
      </form>
    </Stack>
  );
};
export default DatosPersonalesForm;
