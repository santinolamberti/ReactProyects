//@ts-nocheck
import React from "react";
import PantallaExitoProducto from "../components/PantallaExitoProducto";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


describe("Pantalla de Éxito", () => {
	test("Títulos y botón", () => {
		render(
			<BrowserRouter>
				<PantallaExitoProducto />
			</BrowserRouter>
		);
        
        const tituloGracias = screen.getByRole('heading', {level: 1});
        const tituloReservaExito = screen.getByRole('heading', {level: 2});
        const btnOk = screen.getByRole('button');
        
		// Comprueba existencia de elementos
		expect(tituloGracias).toBeTruthy();
		expect(tituloReservaExito).toBeTruthy();
		expect(btnOk).toBeTruthy();

		// Comprueba que el texto contenido coincida con el indicado
        expect(tituloGracias.textContent).toBe("¡Muchas Gracias!");
        expect(tituloReservaExito.textContent).toBe("El registro del producto se ha realizado con éxito");
        expect(btnOk.textContent).toBe("OK");
	});
    
});