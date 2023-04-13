 import React from "react";
 import Categories, { api } from "../components/Categories";
 import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });


 describe("Categorias", () => {
  test("Fetch a Api Categorias", async () => {
    jest.spyOn(React,"useEffect");
    const firstResponse = {
      json: jest.fn(() => []),
    };
    global.fetch = jest.fn().mockResolvedValue(firstResponse);

    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );
    
    expect(global.fetch).toBeCalledWith(api + "/categorias/todos");
    await waitFor(() => {
    expect(firstResponse.json).toBeCalledWith(); 
    
  });
});
  
  // test("Debe renderizar el texto", async () => {
  //   jest.spyOn(React,"useEffect");
  //   const firstResponse = {
  //     json: jest.fn(() => []),
  //   };
  //   global.fetch = jest.fn().mockResolvedValue(firstResponse);

  //   render(
  //     <MemoryRouter>
  //       <Categories />
  //     </MemoryRouter>
  //   );
  //   await waitFor(() => {
  //   expect(global.fetch).toBeCalledWith(api + "/categorias/todos");
  //   expect(firstResponse.json).toBeCalledWith();
  //   screen.debug();
    
    // expect(
    //     screen.getByText(/Buscar por tipo de transporte/i)
    //    ).toBeInTheDocument();
    
});
// });
// });