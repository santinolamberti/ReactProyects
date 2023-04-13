import React from "react";
import { MemoryRouter } from "react-router";
import Producto, { api } from "../components/Producto";
import { render, waitFor } from "@testing-library/react";

const makeRender = (newProps = {}) => {
    const defaultProps = {
      match: { params: { id: "1" } },
    };
    const props = { ...defaultProps, ...newProps };
  return render(
    <MemoryRouter>
      <Producto {...props} />
    </MemoryRouter>
  );
};

describe("Reservas", () => {
    test("Deberia renderizar", () => {
      const { container } = makeRender();
  
      expect(container).toBeDefined();
    });
    test("Deberia renderizar Loading si el componente esta cargando", () => {
      const { getByText } = makeRender();
  
      expect(getByText("Cargando")).toBeDefined();
    });
    test("Deberia mostrar un mensaje de error si falla la llamada a la api", async () => {
      const error = new Error("some error");
  
      const firstResponse = {
        json: jest.fn().mockRejectedValueOnce(error),
      };
  
      global.fetch = jest.fn().mockResolvedValue(firstResponse);
  
      const { getByText } = makeRender();
  
      await waitFor(() => {
        expect(getByText(`Error: ${error.message}`)).toBeDefined();
      });
    });
});