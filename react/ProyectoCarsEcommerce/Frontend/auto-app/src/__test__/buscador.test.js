import React from "react";
import Buscador, { api } from "../components/Buscador";
import "@testing-library/jest-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import renderer, { act } from "react-test-renderer";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });
// global.fetch = require("jest-fetch-mock");


describe("Buscador", () => {

  test("Fetch a Api Ciudades", async () => {
    jest.spyOn(window, "addEventListener");
    const firstResponse = {
      json: jest.fn(() => []),
    };
    global.fetch = jest.fn().mockResolvedValue(firstResponse);

    render(
      <MemoryRouter>
        <Buscador />
      </MemoryRouter>
    );

    expect(window.addEventListener).toBeCalledWith(
      "resize",
      expect.any(Function)
    );
    expect(global.fetch).toBeCalledWith(api + "/ciudades/todas");
    await waitFor(() => {
      expect(firstResponse.json).toBeCalledWith();
    });
  });

  test("Debe contener el texto", async() => {
      jest.spyOn(window, "addEventListener");
      const firstResponse = {
        json: jest.fn(() => []),
      };
      global.fetch = jest.fn().mockResolvedValue(firstResponse);


        render(
          <MemoryRouter>
          <Buscador />
        </MemoryRouter>
      );

    await waitFor(() => {  
      expect(
        screen.getByText(/Busca el auto que necesitas/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Elige donde quieres retirar el auto/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Check in - Check out/i)).toBeInTheDocument();
      expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
    });
    })

  test("Botón de búsqueda", () => {
    const wrapper = shallow(
        <Buscador />
    );
    const boton = wrapper.find("Link.boton-buscar");
    expect(boton.exists()).toBe(true);
    //console.log("boton", boton.debug());
  });
  });