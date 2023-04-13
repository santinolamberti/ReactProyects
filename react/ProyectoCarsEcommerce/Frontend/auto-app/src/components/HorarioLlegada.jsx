//@ts-nocheck
import "../styles/horarioLlegada.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function HorarioLLegada(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const checkCircle = <FontAwesomeIcon icon={faCheckCircle} />;
  const horas = [12,1,2,3,4,5,6,7,8,9,10,11]

  let horaElegida = "12:00 AM";

  const handleChange = () => {
    horaElegida = document.querySelector("option:checked").value
    setSelectedOption(document.querySelector("option:checked").value);
    props.horario(horaElegida)
  };

  return (
    <>
        <form action="" className="form-horarioLlegada">
            <p>
              <i>{checkCircle}</i>
              Tu auto va a estar listo en el siguiente horario: {selectedOption}
            </p>
            <label htmlFor="horarioElegido">
              Indica tu horario estimado de llegada
            </label>
            <select name="horario" defaultValue="Seleccionar hora" onChange={handleChange}>
              <option value="Seleccionar hora" disabled>Seleccionar hora</option>
              {horas.map((i) => <option key={i+"AM"} value={i + ":00 AM"}>{i}:00 AM</option>)}
              {horas.map((i) => <option key={i+"PM"} value={i + ":00 PM"}>{i}:00 PM</option>)}
            </select>
        </form>
    </>
  );

};
