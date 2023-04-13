import React from "react";
import Header from "../components/Header";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
	test("debe renderizar el texto", () => {
		const texto1 = /El auto que necesitas/i;
        const texto2 = /X/i;
        const texto3 = /Menú/i;
        const texto4 = /Iniciar sesión/i;
        const texto5 = /Crear cuenta/i;

		const component = render(
			<BrowserRouter>
				<Header  />
			</BrowserRouter>
		);
        //screen.debug();
		expect(component.container).toHaveTextContent(texto1);
        expect(component.container).toHaveTextContent(texto2);
        expect(component.container).toHaveTextContent(texto3);
        expect(component.container).toHaveTextContent(texto4);
        expect(component.container).toHaveTextContent(texto5);
	});
});
