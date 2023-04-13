import useOrder from "dh-marvel/components/useOrder";
import useStep from "dh-marvel/components/useStep";
import { DatosPersonalesFull } from "dh-marvel/features/checkout/checkout.types";
import { IComicOrden } from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";
import { Step } from "dh-marvel/components/StepContext";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatosPagoData } from "dh-marvel/components/checkout/DatosPagoForm";
import DireccionEntrega, { DatosEntregaData } from "dh-marvel/components/checkout/DireccionEntregaForm";
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
		usuario: {
			nombre: "santino",
			apellido: "lamberti",
			email: "santilamberti@gmail.com",
    		entrega: {
        		direccion: "",
       	 		departamento: "",
        		ciudad: "",
        		provincia: "",
        		codPostal: ""
    }
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
		step: 1,
	  } as Step,
	},
	dispatch: mockStepDispatch,
  });
  

  describe("DireccionEntregaForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
  })
  describe("Al renderizar", () => {
	it("Debería renderizar título del form de datos de entrega", () => {
		renderMocks(<DireccionEntrega />)
	const titulo = screen.getByText("Datos de entrega")
	expect(titulo).toBeInTheDocument
	})
	it("Debería renderizar los inputs del form de dirección de entrega", () => {
        renderMocks(<DireccionEntrega />)

        const inputDireccion = screen.getByRole("textbox", {name: /dirección y número/i})
        expect(inputDireccion).toBeInTheDocument();
        
        const inputDepto = screen.getByRole("textbox", {name: /departamento, piso, etc/i})
        expect(inputDepto).toBeInTheDocument();
        
        const inputCiudad = screen.getByRole("textbox", {name: /ciudad/i})
        expect(inputCiudad).toBeInTheDocument();

		const inputProvincia = screen.getByRole("textbox", {name: /provincia/i})
        expect(inputProvincia).toBeInTheDocument();
        
        const inputCodPostal = screen.getByRole("textbox", {name: /cod postal/i})
        expect(inputCodPostal).toBeInTheDocument();
    });
	it("Debería renderizar el botón de 'Siguiente' y el de 'Anterior'", () => {
        renderMocks(<DireccionEntrega />)
        const BotonSiguiente = screen.getByRole("button", { name: /siguiente/i });
        expect(BotonSiguiente).toBeInTheDocument();

        const BotonAnterior = screen.queryByRole('button', { name: /anterior/i });
        expect(BotonAnterior).toBeInTheDocument();
    });
})

describe("Al Submitear", () => {
	  it("debería hacer el dispatch", async () => {
	    renderMocks(<DireccionEntrega />)
	
	    await userEvent.type(screen.getByRole('textbox', {name: /dirección y número/i}), "araoz")
	
	    await userEvent.type(screen.getByRole('textbox', {name: /departamento, piso, etc/i}), "8")
	
	    await userEvent.type(screen.getByRole('textbox', {name: /ciudad/i}), "ba")

		await userEvent.type(screen.getByRole('textbox', {name: /provincia/i}), "caba")

		await userEvent.type(screen.getByRole('textbox', {name: /cod postal/i}), "123")
	
	    await userEvent.click(screen.getByRole("button", { name: /siguiente/i }))
	
	    await waitFor(() => {
	      expect(mockDispatch).toBeCalled();
	    });
	
	    expect(mockDispatch).toBeCalledWith({
	      type: "SET_ADDRESS",
	      payload: {
				direccion: "araoz",
				departamento: "8",
				ciudad: "ba",
				provincia: "caba",
				codPostal: "123"
	      }
	    })
	  })
	})
	})