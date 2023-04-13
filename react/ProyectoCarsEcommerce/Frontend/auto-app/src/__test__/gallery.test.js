//@ts-nocheck
import React from "react";
import "@testing-library/jest-dom";
import Gallery from "../components/Gallery";
import { render, screen } from "@testing-library/react";
import Enzyme, { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Adapter from "enzyme-adapter-react-17-updated";
import FsLightbox from "fslightbox-react";

Enzyme.configure({ adapter: new Adapter() });

let findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("<Gallery/>", () => {
  test("Debe renderizar", () => {
    const wrapper = shallow(<Gallery imagenes={[]} />);
    expect(wrapper.find("div").first().hasClass("gallery-container")).toBe(
      true
    );
    expect(wrapper.find(FsLightbox)).toBeDefined();
  });
  test('Renderiza div con el texto "Ver más"', () => {
    const wrapper = shallow(<Gallery imagenes={[]} />);
    expect(wrapper.find("div").first().text()).toEqual("Ver más<l />");
  });
  test("Renderiza imagenes, comprueba su total, sus alt y src", () => {
    const wrapper = shallow(<Gallery imagenes={[
      {
        url: "https://i.pinimg.com/originals/a7/3d/b3/a73db38375a5a59fd2774f0f8ebda49f.jpg",
        titulo: "Sir Cat",
      },
      {
        url: "https://i.pinimg.com/564x/25/fd/60/25fd60383fd1c90601b8abb07aa93187.jpg",
        titulo: "Harry pawter",
      }
    ]}/>);
    
    // Renderiza las imagenes creadas y cuenta el número de imagenes
    const imagenes = wrapper.find('img');
    expect(imagenes.length).toBe(2);
    
    // Atrapa los alt de las imagenes y los compara con los indicados
    const altImagenes = imagenes.map( im => im.props().alt);
    expect(altImagenes).toEqual([
      'Sir Cat', 
      'Harry pawter'
    ]);

    // Atrapa los alt de las imagenes y los compara con los indicados
    const srcImagenes = imagenes.map( im => im.props().src);
    expect(srcImagenes).toEqual([
      "https://i.pinimg.com/originals/a7/3d/b3/a73db38375a5a59fd2774f0f8ebda49f.jpg",
      "https://i.pinimg.com/564x/25/fd/60/25fd60383fd1c90601b8abb07aa93187.jpg"
    ]);
  });
});
