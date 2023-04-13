import React from "react";
//import { render } from "react-dom";
import "@testing-library/jest-dom";
import HorarioLlegada from "../components/HorarioLlegada";
import { render, screen, waitFor } from "@testing-library/react";

describe('Horario Llegada', () =>{
    test('Debe renderizar el texto', () =>{
        render(< HorarioLlegada />)
        expect(
            screen.getByText(/Tu auto va a estar listo en el siguiente horario:/i)
          ).toBeInTheDocument();
          expect(
            screen.getByText(/Indica tu horario estimado de llegada/i)
          ).toBeInTheDocument();
          expect(
            screen.getByText(/Seleccionar hora/i)
          ).toBeInTheDocument();
          expect(
            screen.getByText('12:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('1:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('2:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('3:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('4:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('5:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('6:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('7:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('8:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('9:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('10:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('11:00 AM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('12:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('1:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('2:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('3:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('4:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('5:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('6:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('7:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('8:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('9:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('10:00 PM')
          ).toBeInTheDocument();
          expect(
            screen.getByText('11:00 PM')
          ).toBeInTheDocument();
        

          
    })
})