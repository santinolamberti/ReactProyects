import useOrder from "dh-marvel/components/useOrder";
import useStep from "dh-marvel/components/useStep";
import { DatosPersonalesFull } from "dh-marvel/features/checkout/checkout.types";
import { IComicOrden } from "dh-marvel/components/confirmacionCompra/ConfirmacionCompra";
import { Step } from "dh-marvel/components/StepContext";
import { screen } from "@testing-library/react";
import CheckOut from "dh-marvel/components/checkout/Checkout";
import { DatosPagoData } from "dh-marvel/components/checkout/DatosPagoForm";
import { renderMocks } from "./utils/testing.helpers";

jest.mock("dh-marvel/components/checkout/DatosPersonalesForm", () =>
  jest.fn(() => {
    return <h3>Form de datos personales</h3>;
  })
);

jest.mock("dh-marvel/components/checkout/DireccionEntregaForm", () =>
  jest.fn(() => {
    return <h3>Form de dirección de entrega</h3>;
  })
);

jest.mock("dh-marvel/components/checkout/DatosPagoForm", () =>
  jest.fn(() => {
    return <h3>Form de datos de pago</h3>;
  })
);

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
		orden: { nombre: "Marvel Previews (2017)", precio: 72, imagen: "https://m.media-amazon.com/images/I/61KFLylOgPL.jpg" } as IComicOrden,
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
  

  describe("Checkout", () => {
	beforeEach(() => {
		jest.clearAllMocks();
  })
  describe("Al renderizar", () => {
	it("Debería renderizar título de comic", () => {
		renderMocks(<CheckOut />)
	const titulo = screen.getByText("Checkout: Marvel Previews (2017)")
	expect(titulo).toBeInTheDocument
	})
	it("Debería renderizar el precio de comic", () => {
		renderMocks(<CheckOut />)
	const precio = screen.getByText("$72")
	expect(precio).toBeInTheDocument
	})
	it("Debería renderizar la imagen del comic", () => {
		renderMocks(<CheckOut />)
	const imagen = screen.queryByText("https://m.media-amazon.com/images/I/61KFLylOgPL.jpg")
	expect(imagen).toBeInTheDocument
	})
	it("Debería renderizar los 3 pasos del stepper", () => {
		renderMocks(<CheckOut />);
		const stepDatosPersonales = screen.getByText("Datos Personales");
		const stepEntrega = screen.getByText("Dirección de entrega");
		const stepPago = screen.getByText("Datos del pago");
		expect(stepDatosPersonales).toBeInTheDocument();
		expect(stepEntrega).toBeInTheDocument();
		expect(stepPago).toBeInTheDocument();
	});
	it("Si el step esta en cero debería renderizar el form de datos personales", async () => {
		renderMocks(<CheckOut />);
		const form = screen.findByText("Form de datos personales");
		expect(await form).toBeInTheDocument();
	});
	it("Si el step esta en cero debería no tendría que renderizar el form de datos de entrega", async () => {
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de dirección de entrega");
		expect(form).not.toBeInTheDocument();
	});
	it("Si el step esta en cero debería no tendría que renderizar el form de datos de pago", async () => {
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de datos de pago");
		expect(form).not.toBeInTheDocument();
	});
	it("Si el step esta en uno debería tendría que renderizar el form de dirección de entrega", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 1,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de dirección de entrega");
		expect(form).toBeInTheDocument();
	});
	it("Si el step esta en uno debería no tendría que renderizar el form de datos personales", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 1,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de datos personales");
		expect(form).not.toBeInTheDocument();
	});
	it("Si el step esta en uno debería no tendría que renderizar el form de datos de pago", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 1,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de datos de pago");
		expect(form).not.toBeInTheDocument();
	});
	it("Si el step esta en dos debería tendría que renderizar el form de datos de pago", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 2,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de datos de pago");
		expect(form).toBeInTheDocument();
	});
	it("Si el step esta en dos debería no tendría que renderizar el form de datos personales", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 2,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de datos personales");
		expect(form).not.toBeInTheDocument();
	});
	it("Si el step esta en dos debería no tendría que renderizar el form de dirección de entrega", async () => {
		mockUseStep.mockReturnValue({
			state: {
			  step: {
				step: 2,
			  } as Step,
			},
			dispatch: mockStepDispatch,
		  });
		renderMocks(<CheckOut />);
		const form = screen.queryByText("Form de direcicón de entrega");
		expect(form).not.toBeInTheDocument();
	});
  })
})