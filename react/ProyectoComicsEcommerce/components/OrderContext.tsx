import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import {
    createContext,
    FC,
    useReducer,
    useMemo,
    Dispatch,
  } from "react";
  import { PropsWithChildren } from "react";
import { DatosPagoData } from "./checkout/DatosPagoForm";
import { DatosPersonalesData } from "./checkout/DatosPersonalesForm";
import { DatosEntregaData } from "./checkout/DireccionEntregaForm";
import { IComicOrden } from "./confirmacionCompra/ConfirmacionCompra";
  
  export interface OrderState {
    order: CheckoutInput;
  }
  
  export interface OrderContextState {
    state: { order: CheckoutInput };
    dispatch: Dispatch<OrderActionType>;
  }
  
  export const OrderContext =
    createContext<OrderContextState | undefined>(undefined);
  
  type OrderSetCustomerType = {
    type: "SET_CUSTOMER";
    payload: DatosPersonalesData;
  };
  
  type OrderSetCustomerAddressType = {
    type: "SET_ADDRESS";
    payload: DatosEntregaData;
  };
  
  type OrderSetCardType = {
    type: "SET_CARD";
    payload: DatosPagoData;
  };
  
  type OrderSetOrderType = {
    type: "SET_ORDER";
    payload: IComicOrden;
  };
  
  type OrderActionType =
    | OrderSetCustomerType
    | OrderSetCardType
    | OrderSetCustomerAddressType
    | OrderSetOrderType;
  
  const reducer = (state: OrderState, action: OrderActionType): OrderState => {
    switch (action.type) {
      case "SET_CUSTOMER":
        return {
          ...state,
          order: {
            ...state.order,
            usuario: { ...state.order.usuario, ...action.payload },
          },
        };
      case "SET_ADDRESS":
        return {
          ...state,
          order: {
            ...state.order,
            usuario: { ...state.order.usuario, entrega: { ...action.payload } },
          },
        };
      case "SET_CARD":
        return {
          ...state,
          order: {
            ...state.order,
            tarjeta: { ...state.order.tarjeta, ...action.payload },
          },
        };
      case "SET_ORDER":
        return {
          ...state,
          order: {
            ...state.order,
            orden: { ...state.order.orden, ...action.payload },
          },
        };
    }
  };
  
  const initialState: OrderState = {
    order: {} as CheckoutInput,
  };
  
  export const OrdenProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(
      () => ({
        state,
        dispatch,
      }),
      [state, dispatch]
    );
  
    return (
      <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    );
  };