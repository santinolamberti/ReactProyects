import ControlledTextInput from "./ControlledTextInput";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "./StepperNavigation";
import { useRouter } from 'next/router'
import AlertaPost from "../snack/AlertaPost";
import useOrder from "../useOrder";


export const datosPersonalesSchema = yup
  .object({
    nombreTarjeta: yup.string().required("nombre de tarjeta requerido"),
    nroTarjeta: yup.string().required("número de tarjeta requerido"),
    expTarjeta: yup.string().required("Expiración de tarjeta requerida"),
    CVV: yup.string().required("El CVV es requerido"),
  })
  .required();

export type DatosPagoData = {
  nombreTarjeta: string;
  nroTarjeta: string;
  expTarjeta: string;
  CVV: string;
};

const DatosPago: React.FC = () => {
  const { state, dispatch } = useOrder();
  const [error, setError] = React.useState({
    error: false,
    mensajeError: ""
  })
  const router = useRouter()

  const methods = useForm<DatosPagoData>({
    resolver: yupResolver(datosPersonalesSchema),
    defaultValues: {
      nombreTarjeta: "",
      nroTarjeta: "",
      expTarjeta: "",
      CVV: "",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = async(data: DatosPagoData) => {
    dispatch({
      type: "SET_CARD",
      payload: data,
    })
    const formPost = {
      ...state.order,
      tarjeta: { ...state.order.tarjeta, ...data },
    };

    const request = await fetch("api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPost),
    })
    if(request.status == 200){
    router.push("/confirmacionCompra")
    }else {
      const dataError = await request.json()
      setError({error: true, mensajeError: dataError.message})
    }
  };

  React.useEffect(() => {
    setFocus("nombreTarjeta");
  }, []);

  return (
    <Stack>
      <h3>Datos de pago</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <ControlledTextInput
            name="nombreTarjeta"
            label="Nombre como aparece en la tarjeta"
            widthText="100%"
          />
          <ControlledTextInput
            name="nroTarjeta"
            label="Numero de tarjeta"
            widthText="20%"
          />
          <ControlledTextInput
            name="expTarjeta"
            label="Exp MM/YY"
            widthText="20%"
          />
          <ControlledTextInput name="CVV" label="CVV" widthText="80%" />
        </FormProvider>
        <StepperNavigation handleSubmit={handleSubmit(onSubmit)} />
      </form>
       {error.error && <AlertaPost mensaje={error.mensajeError} />}
    </Stack>
  );
};

export default DatosPago;
