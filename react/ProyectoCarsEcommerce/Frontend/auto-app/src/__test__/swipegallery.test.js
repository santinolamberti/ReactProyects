//@ts-nocheck
import Enzyme, { mount } from 'enzyme';
import SwipeGallery from "../components/SwipeGallery";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });

describe("Test de la galería oscura", () => {
  test("Renderiza imagenes", () => {
    const wrapper = mount(
      <SwipeGallery imagenes={[
        {
          url: "https://direccion-1.com"
        },
        {
          url: "https://direccion-2.com"
        },
        {
          url: "https://direccion-3.com"
        },
      ]}/>
    );

    // Comprobando que se renderizan 3 imagenes
    const imagenes = wrapper.find('img')
    expect( imagenes.length ).toBe( 3 );

    // Comprobando que las url de las imagenes son las mismas de las mockeadas
    const urlDeImagenes = imagenes.map( imagen => {
      return {url: imagen.props().src}
    })
    expect( urlDeImagenes ).toStrictEqual([
      {
        url: "https://direccion-1.com"
      },
      {
        url: "https://direccion-2.com"
      },
      {
        url: "https://direccion-3.com"
      },
    ]);
  });
});
