import React from "react";
import Politicas from "../components/Politicas";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

describe('Politicas', () => {
    test("Debe renderizar el texto", () => {
		const component = render(
			<Politicas />	
		);
        expect(component.container).toHaveTextContent(/Qué tenés que saber/i);
        expect(component.container).toHaveTextContent(/Normas del vehículo/i);
        expect(component.container).toHaveTextContent(/No Fumar./i);
        expect(component.container).toHaveTextContent(/Licencia de conducir./i);
        expect(component.container).toHaveTextContent(/Renta mínima de un día./i);
        expect(component.container).toHaveTextContent(/Salud y seguridad./i);
        expect(component.container).toHaveTextContent(/Depósito de seguridad./i);
        expect(component.container).toHaveTextContent(/Uso obligatorio de cinturón de seguridad en autos y buses./i);
        expect(component.container).toHaveTextContent(/Uso obligatorio de casco en motos./i);
        expect(component.container).toHaveTextContent(/Política de cancelación/i);
        expect(component.container).toHaveTextContent(/Se puede cancelar hasta 48 hs antes./i);
        
	});
})