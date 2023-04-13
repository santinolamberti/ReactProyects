import useOrder from "dh-marvel/components/useOrder";
import { useRouter } from "next/router";
import useStep from "dh-marvel/components/useStep";
import { DatosPersonalesFull } from "dh-marvel/features/checkout/checkout.types";
import { IComicOrden } from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";
import { Step } from "dh-marvel/components/StepContext";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatosPago, {
  DatosPagoData,
} from "dh-marvel/components/checkout/DatosPagoForm";
import DatosPersonalesForm, {
  DatosPersonalesData,
} from "dh-marvel/components/checkout/DatosPersonalesForm";
import { DatosEntregaData } from "dh-marvel/components/checkout/DireccionEntregaForm";
import { renderMocks } from "./utils/testing.helpers";

jest.mock("dh-marvel/components/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();

jest.mock("dh-marvel/components/useStep");
const mockUseStep = useStep as jest.MockedFunction<typeof useStep>;
const mockStepDispatch = jest.fn();

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
}))


mockUseOrder.mockReturnValue({
  state: {
    order: {
      usuario: {
        nombre: "santino",
        apellido: "lamberti",
        email: "santilamberti@gmail.com",
        entrega: {
          direccion: "araoz",
          departamento: "8",
          ciudad: "ba",
          provincia: "caba",
          codPostal: "123",
        },
      } as DatosPersonalesFull,
      tarjeta: {} as DatosPagoData,
      orden: {} as IComicOrden,
    },
  },
  dispatch: mockDispatch,
});
mockUseStep.mockReturnValue({
  state: {
    step: {
      step: 2,
    } as Step,
  },
  dispatch: mockStepDispatch,
});

describe("DatosPagoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
      })
    ) as jest.Mock
  });
  describe("Al renderizar", () => {
    it("Debería renderizar título del form de datos de pago", () => {
      renderMocks(<DatosPago />);
      const titulo = screen.getByText("Datos de pago");
      expect(titulo).toBeInTheDocument;
    });
    it("Debería renderizar los inputs del formd e datos de pago", () => {
      renderMocks(<DatosPago />);

      const inputNombreTarjeta = screen.getByRole("textbox", {
        name: /nombre como aparece en la tarjeta/i,
      });
      expect(inputNombreTarjeta).toBeInTheDocument();

      const inputNroTarjeta = screen.getByRole("textbox", {
        name: /numero de tarjeta/i,
      });
      expect(inputNroTarjeta).toBeInTheDocument();

      const inputExp = screen.getByRole("textbox", { name: /exp mm\/yy/i });
      expect(inputExp).toBeInTheDocument();

      const inputCvv = screen.getByRole("textbox", { name: /cvv/i });
      expect(inputCvv).toBeInTheDocument();
    });
    it("Debería renderizar el botón de 'Finalizar' y el de 'Anterior'", () => {
      renderMocks(<DatosPago />);
      const BotonFinalizar = screen.getByRole("button", { name: /finalizar/i });
      expect(BotonFinalizar).toBeInTheDocument();

      const BotonAnterior = screen.queryByRole("button", { name: /anterior/i });
      expect(BotonAnterior).toBeInTheDocument();
    });
  });

  describe("Al Submitear", () => {
	it("debería hacer el dispatch", async () => {
	  renderMocks(<DatosPago />)
  
	  await userEvent.type(screen.getByRole('textbox', {name: /nombre como aparece en la tarjeta/i}), "santino")
  
	  await userEvent.type(screen.getByRole('textbox', {name: /numero de tarjeta/i}), "1")
  
	  await userEvent.type(screen.getByRole('textbox', {name: /exp mm\/yy/i}), "12/26")

	  await userEvent.type(screen.getByRole('textbox', {name: /cvv/i}), "123")
  
	  await userEvent.click(screen.getByRole("button", { name: /finalizar/i }))
  
	  await waitFor(() => {
		expect(mockDispatch).toBeCalled();
    expect(mockPush).toHaveBeenCalledWith("/confirmacionCompra"); 
	  });
  
	  expect(mockDispatch).toBeCalledWith({
		type: "SET_CARD",
		payload: {
			  nroTarjeta: "1",
			  CVV: "123",
			  expTarjeta: "12/26",
			  nombreTarjeta: "santino"
		}
	  })
	})
  })
});
