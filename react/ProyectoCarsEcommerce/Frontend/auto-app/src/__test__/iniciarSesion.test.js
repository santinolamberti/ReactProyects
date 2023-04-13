import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../container/App";

describe("Iniciar Sesión", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });
  test("Redireccionamiento de home a iniciar sesion", () => {
    const botonIniciar = screen.getByRole("heading", {
      name: /Iniciar Sesión/i,
    });
    expect(window.location.pathname).toBe("/");
    fireEvent.click(botonIniciar);
    expect(window.location.pathname).toBe("/iniciarSesion");
    expect(screen.getByText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByText(/Contraseña/i)).toBeInTheDocument();
  });
  test("Botón Iniciar Sesión", () => {
    const botonIniciar = screen.getByRole("button", {
      name: /Ingresar/i,
    });
    fireEvent.click(botonIniciar);
    const correo = screen.getByLabelText(/Correo electrónico/i);
    const pass = screen.getByLabelText(/Contraseña/i);
    userEvent.type(correo, "jaimito@mail.com");
    userEvent.type(pass, "jaimitoelmejor");
    expect(correo.value).toBe("jaimito@mail.com");
    expect(pass.value).toBe("jaimitoelmejor");
  });
});
