import React from "react";
import { MemoryRouter } from "react-router";
import Reservas, { api } from "../components/Reservas";
import { render, waitFor } from "@testing-library/react";

const makeRender = (newProps = {}) => {
  const defaultProps = {
    match: { params: { id: "1" } },
  };

  const props = { ...defaultProps, ...newProps };
  return render(
    <MemoryRouter>
      <Reservas {...props} />
    </MemoryRouter>
  );
};

describe("Reservas", () => {
  test("Deberia renderizar", () => {
    const { container } = makeRender();

    expect(container).toBeDefined();
  });

  test("Deberia renderizar Cargando si el componente esta cargando", () => {
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

  // fit("Deberia renderizar correctamente si la llamada no falla", async () => {
  //   const match = { params: { id: "1" } };

  //   const producto = {
  //     nombre: "productoNombre",
  //     categoria: {
  //       titulo: "tituloCategoria",
  //     },
  //     imagenes: [
  //       {
  //         url: "",
  //         titulo: "",
  //       },
  //     ],
  //     ciudad: {
  //       nombre: 'ciudadNombre',
  //       pais: 'colombia'
  //     },
  //   };
  //   const firstResponse = {
  //     json: jest.fn().mockResolvedValue(producto),
  //   };

  //   const getItemSpy = jest.spyOn(window.sessionStorage, "getItem").mockReturnValue(
  //       '{"token":"123","nombre":"nombre","email":"email.@email.com"}'
  //     );

  //     console.log(getItemSpy);

  //   global.fetch = jest.fn().mockResolvedValue(firstResponse);

  //   const { queryAllByText } = makeRender({ match });

  //   await waitFor(() => {
  //     expect(global.fetch).toBeCalledWith(
  //       api + "/productos/buscar/" + match.params.id
  //     );
  //     expect(queryAllByText(producto.nombre)).toEqual(2);
  //   });
  // });
});
