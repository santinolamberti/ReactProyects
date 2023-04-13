import React from "react";
import FormDatos from "../components/FormDatos";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});
describe("Form", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  test("Debe renderizar el texto", () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, "getItem");
    window.sessionStorage.setItem(
      "infoUsuario",
      JSON.stringify({
        nombre: "Jaimito",
        email: "example@gmail.com",
        apellido: "Perez",
      })
    );
    const component = render(<FormDatos />);
    //screen.debug()
    expect(component.container).toHaveTextContent(/Nombre/i);
    expect(component.container).toHaveTextContent(/Email/i);
    expect(component.container).toHaveTextContent(/Apellido/i);
    expect(component.getAllByRole("textbox")[0].value).toEqual("Jaimito");
    expect(component.getAllByRole("textbox")[1].value).toEqual("example@gmail.com");
    expect(component.getAllByRole("textbox")[2].value).toEqual("Perez");
  });
});
