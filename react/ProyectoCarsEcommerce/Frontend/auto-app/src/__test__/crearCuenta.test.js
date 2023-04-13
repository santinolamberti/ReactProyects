import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow} from "enzyme";
import App from "../container/App";
import CrearCuenta from "../components/CrearCuenta";
import { MemoryRouter } from "react-router";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });


describe("Crear Cuenta", () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });
  test("Redireccionamiento de home a crear cuenta", () => {
    const botonCrear = screen.getByRole("heading", { name: /Crear Cuenta/i });
    expect(window.location.pathname).toBe("/");
    fireEvent.click(botonCrear);
    expect(window.location.pathname).toBe("/crearCuenta");
  });
  test("Boton Crear Cuenta", () => {
    const botonCrear = screen.getByRole("heading", {
      name: /Crear Cuenta/i,
    });
    fireEvent.click(botonCrear);
    //screen.debug()
    const nombre = screen.getByLabelText(/Nombre/i);
    const apellido = screen.getByLabelText(/Apellido/i);
    const correo = screen.getByLabelText(/Correo electrónico/i);
    const pass = screen.getAllByLabelText(/Contraseña/i);
    //const passConfir = screen.getAllByLabelText(/Contraseña/i);
    userEvent.type(nombre, "jaimito");
    userEvent.type(apellido, "perez");
    userEvent.type(correo, "jaimito@mail.com");
    userEvent.type(pass, "jaimitoelmejor");
    //userEvent.type(passConfir, "jaimitoelmejor");
    expect(nombre.value).toBe("jaimito");
    expect(apellido.value).toBe("perez");
    expect(correo.value).toBe("jaimito@mail.com");
    //expect(pass.value).toBe("jaimitoelmejor");
    //expect(passConfir.value).toBe("jaimitoelmejor");
  });
});

describe("Crear cuenta", () => {
  test("Debe renderizar", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CrearCuenta />
      </Router>
    );
    expect(screen.getByText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Contraseña/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/¿Ya tenes una cuenta?/i)).toBeInTheDocument();
  });
  test('Existen', () => {
    const history = createMemoryHistory();
    const component= render(
      <Router history={history}>
        <CrearCuenta />
      </Router>
    );
    //screen.debug()
    expect(component.getByRole("heading", { name: /Crear Cuenta/i })).toBeInTheDocument();
    
  })
  // test("Hay un form", () => {
  //   const wrapper = shallow(<CrearCuenta />);
  //   screen.debug()
  //   //expect(wrapper.find("form").first().hasClass("form-crearCuenta")).toBe(
  //     //true);
  //   expect(wrapper.find("input").first().hasClass("campos-crear")).toBe(true);
  //   expect(wrapper.find("p").first().hasClass("texto-inicio txt-1")).toBe(true);
    
  // });
  test('Dentro de form existe', ()=>{
    const view = render(<MemoryRouter> <CrearCuenta  /> </MemoryRouter>);
    expect(screen.getByRole('textbox', {name: /Nombre/i})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Apellido/i})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Correo electrónico/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Crear cuenta/i})).toBeInTheDocument();
  });
  test('Boton habilitado', () =>{
    const view = render(<MemoryRouter> <CrearCuenta  /> </MemoryRouter>);
    expect(screen.getByRole('button', {name: /Crear cuenta/i})).toBeEnabled();
  });
  test('El form renderiza los datos del usuario', () => {
    const view = render(<MemoryRouter> <CrearCuenta /> </MemoryRouter>);

    userEvent.type(view.getByLabelText("Nombre"), 'nombreUsuario');
    userEvent.type(view.getByLabelText("Apellido"), 'apellidoUsuario');
    userEvent.type(view.getByLabelText("Correo electrónico"), 'emailUsuario');
    userEvent.type(view.getByLabelText("Contraseña"), 'passwordUsuario');
    userEvent.type(view.getByLabelText("Confirmar contraseña"), 'passwordUsuarioConfir');
  });
  
});
