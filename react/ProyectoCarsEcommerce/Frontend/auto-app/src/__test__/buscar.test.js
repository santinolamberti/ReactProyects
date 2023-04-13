// @ts-nocheck
import React from "react";
import Buscar from '../components/Buscar';
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });

// jest.mock("../components/Buscar");

describe("Categorias", () => {
  test("Renderizado", () => {

    jest.spyOn(React,"useEffect");
    
    const wrapper = shallow(<Buscar />);
    console.log(wrapper.debug());
  });
});