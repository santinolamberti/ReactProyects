import useOrder from "dh-marvel/components/useOrder";
import useStep from "dh-marvel/components/useStep";
import { DatosPersonalesFull } from "dh-marvel/features/checkout/checkout.types";
import { IComicOrden } from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";
import { Step } from "dh-marvel/components/StepContext";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatosPagoData } from "dh-marvel/components/checkout/DatosPagoForm";
import DatosPersonalesForm, { DatosPersonalesData } from "dh-marvel/components/checkout/DatosPersonalesForm";
import { renderMocks } from "./utils/testing.helpers";

jest.mock("dh-marvel/components/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();

jest.mock("dh-marvel/components/useStep");
const mockUseStep = useStep as jest.MockedFunction<typeof useStep>;
const mockStepDispatch = jest.fn();

mockUseOrder.mockReturnValue({
	state: {
	  order: {
		usuario: {} as DatosPersonalesFull,
		tarjeta: {} as DatosPagoData,
		orden: {} as IComicOrden,
	  },
	},
	dispatch: mockDispatch,
  });
  mockUseStep.mockReturnValue({
	state: {
	  step: {
		step: 0,
	  } as Step,
	},
	dispatch: mockStepDispatch,
  });
  

  describe("DatosPersonalesForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
  })
  describe("Al renderizar", () => {
	it("Debería renderizar título del form de datos personales", () => {
		renderMocks(<DatosPersonalesForm />)
	const titulo = screen.getByText("Datos personales")
	expect(titulo).toBeInTheDocument
	})
	it("Debería renderizar los inputs de nombre, apellido y email", () => {
        renderMocks(<DatosPersonalesForm />)

        const inputNombre = screen.getByRole("textbox", {name: /nombre/i})
        expect(inputNombre).toBeInTheDocument();
        
        const inputApelido = screen.getByRole("textbox", {name: /apellido/i})
        expect(inputApelido).toBeInTheDocument();
        
        const inputEmail = screen.getByRole("textbox", {name: /email/i})
        expect(inputEmail).toBeInTheDocument();
    });
    it("Debería renderizar el botón de 'Siguiente' y no el de 'Anterior'", () => {
        renderMocks(<DatosPersonalesForm />)
        const BotonSiguiente = screen.getByRole("button", { name: /siguiente/i });
        expect(BotonSiguiente).toBeInTheDocument();

        const BotonAnterior = screen.queryByRole('button', { name: /anterior/i });
        expect(BotonAnterior).not.toBeInTheDocument();
    });
})

describe("Al Submitear", () => {
  it("debería hacer el dispatch", async () => {
    renderMocks(<DatosPersonalesForm />)

    await userEvent.type(screen.getByRole('textbox', {name: /nombre/i}), "santino")

    await userEvent.type(screen.getByRole('textbox', {name: /apellido/i}), "lamberti")

    await userEvent.type(screen.getByRole('textbox', {name: /email/i}), "santilamberti@gmail.com")

    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }))

    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });

    expect(mockDispatch).toBeCalledWith({
      type: "SET_CUSTOMER",
      payload: {
        nombre: "santino",
        apellido: "lamberti",
        email: "santilamberti@gmail.com"
      }
    })
  })
})
})