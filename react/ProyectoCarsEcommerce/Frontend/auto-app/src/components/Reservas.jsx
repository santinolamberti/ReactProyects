//@ts-nocheck
//Estilos
import "../styles/Reservas.css";
import "../styles/CalendarReservas.css";
//Librerías
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faMapMarkerAlt,
  faStar,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { subDays, getDate, format, eachDayOfInterval } from "date-fns";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
//Componentes
import Header from "./Header";
import Politicas from "./Politicas";
import Footer from "./Footer";
import Loading from "./Loading";
import FormDatos from "./FormDatos";
import HorarioLLegada from "./HorarioLlegada";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";
export default function Reservas(props) {
  // HOOKS
  const [width, setwidth] = useState({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [cargado, setcargado] = useState(false);
  const [horario, setHorario] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [arrayDeFechasReservadas, setArrayDeFechasReservadas] = useState([]);
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: {
      titulo: "",
    },
    ciudad: {
      nombre: "",
      pais: "",
    },
    imagenes: [
      {
        titulo: "",
        url: "",
      },
    ],
  });
  const [dateRange, setDateRange] = useState([null, null]); //Aquí se ubican los valores por defecto del rango del calendario.
  const [startDate, endDate] = dateRange;
 
  const history = useHistory();
  registerLocale("es", es);

  // ÍCONOS
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const star = <FontAwesomeIcon icon={faStar} />;

  let datosDeUsuario = sessionStorage.getItem("infoUsuario");
  let datosDeUsuarioParseado = JSON.parse(datosDeUsuario);

  // Esta función se encarga de enviar al DatePicker las fechas que están inhabilitadas
  const fechasSinReservar = (date) => {
  // date hace referencia al formato con el que trae normalmente el DatePicker las fechas
  // le hago format abajo para que haga match con el formato de las fechas que están en el arrayDeFechasReservadas
    return !arrayDeFechasReservadas.includes(format(date, 'dd/MM/yyyy'));
  };

  const handlerReserva = (e) => {
    e.preventDefault();   
    
    if(endDate === null || startDate === null || horario === null || ciudad === null){
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        text: "Debe llenar todos los campos",
      });
    }else{
    //obtenemos el id del usuario logueado a partir del token de seguridad
    let token = JSON.parse(sessionStorage.getItem("infoUsuario")).token;
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    let idUsuario = JSON.parse(jsonPayload).sub.split("'")[1];

    let valores = {
      fechaInicial: startDate.getFullYear() + "-" + ("0" + (startDate.getMonth() + 1)).slice(-2) + "-" + ("0" + (startDate.getDate())).slice(-2),
      fechaFinal: endDate.getFullYear() + "-" + ("0" + (endDate.getMonth() + 1)).slice(-2) + "-" + ("0" + (endDate.getDate())).slice(-2),
      hora: horario,
      producto: { id: producto.id },
      usuario: { id: idUsuario },
    };

    let config = {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/JSON",
        Authorization: datosDeUsuarioParseado.token,
      },
    };

    fetch(api + "/reservas", config)
      .then((res) => res.json())
      .then((result) =>
          history.push("/exito")
      )
      .catch((error) => {console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lamentablemente la reserva no ha podido realizarse. Por favor, intente más tarde",
      })});
  }
};

  // Estilo de días
  const buscadorDayStyle = (date) =>
    getDate(date) ? "reservas-day-style" : undefined;

  const calendarHeaderReservas = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-reservas">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"navigation-arrows-reservas back-arrow-reservas"}
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            {<i>{backArrow}</i>}
          </button>

          {/* LOS MESES MOSTRADOS EN EL HEADER */}
          <span className="react-datepicker__current-month">
            {monthDate
              .toLocaleString("es-CO", {
                month: "long",
              })
              .charAt(0)
              .toUpperCase() +
              monthDate
                .toLocaleString("es-CO", {
                  month: "long",
                })
                .slice(1)}
          </span>

          {/* BOTÓN PARA AUMENTAR MES */}
          <button
            aria-label="Next Month"
            className={"navigation-arrows-reservas next-arrow-reservas"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
  };

  const calendarHeaderReservasMobile = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => (
    <div className="header-calendar-reservas">
      <button
        aria-label="Previous Month"
        className={"navigation-arrows-reservas back-arrow-reservas"}
        style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
        onClick={decreaseMonth}
      >
        {<i>{backArrow}</i>}
      </button>
      <span className="react-datepicker__current-month">
        {monthDate
          .toLocaleString("es-CO", {
            month: "long",
          })
          .charAt(0)
          .toUpperCase() +
          monthDate
            .toLocaleString("es-CO", {
              month: "long",
            })
            .slice(1)}
      </span>
      <button
        aria-label="Next Month"
        className={"navigation-arrows-reservas next-arrow-reservas"}
        onClick={increaseMonth}
      >
        {<i>{nextArrow}</i>}
      </button>
    </div>
  );

  // AQUÍ SE TRAE LOS DATOS DEL PRODUCTO - API
  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
      setwidth(window.screen.availWidth);
    }
    window.addEventListener("resize", handleResize);
    // Dirección de la API
    const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080";
    fetch(api + "/productos/buscar/" + props.match.params.id)
      .then((res) => res.json())
      .then(
        (result) => {
          result == null ? console.log(result) : setProducto(result);
          fetch(api + "/reservas/producto/" + props.match.params.id)
              .then(res => res.json())
              .then((result) => {
                let fechasReservadas = [];
                result.forEach(reserva => {
                  let fechaInicial = reserva.fechaInicial.split("-");
                  let fechaFinal = reserva.fechaFinal.split("-")
                  fechasReservadas.push(
                    {
                      start:new Date(fechaInicial[0], fechaInicial[1]-1, fechaInicial[2]),
                      end:new Date(fechaFinal[0], fechaFinal[1]-1, fechaFinal[2])
                    }
                  )
                });
                let fechas = [];
                for (let i = 0; i < fechasReservadas.length; i++) {
                // el array creado tendrá las fechas en formato dd/MM/yyyy pero puede variar según sea necesario
                  fechas.push(...eachDayOfInterval(fechasReservadas[i]).map( fecha => format(fecha, 'dd/MM/yyyy') ));
                };
                setArrayDeFechasReservadas(fechas);
                let temp = fechas[fechas.length-1].split("/")
                let ultimaFechaReservada = new Date(+temp[2], temp[1] -1, +temp[0])
                setDateRange([ultimaFechaReservada.setDate(ultimaFechaReservada.getDate() + 1), ultimaFechaReservada.setDate(ultimaFechaReservada.getDate() + 2)])
              },
              (error) =>{
                setError(error);
              })
          setcargado(true);
        },
        (error) => {
          setError(error);
          setcargado(true);
          setProducto({
            id: 0,
            nombre: "error",
            descripcion: "error",
            categoria: {
              titulo: "error",
            },
            imagenes: {
              titulo: "error",
              url: "error",
            },
            ciudad: {
              nombre: "error",
              pais: "error",
            },
          });
        }
      );
  }, [props.match.params.id]);
  // ESTA CONDICIÓN PERMITE MOSTRAR ERROR O PANTALLA DE CARGA
  if (error) {
    return (
      <>
        <Header />
        <div>Error: {error.message}</div>
        <Footer />
      </>
    );
  } else if (!cargado) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  } else {

    return (
      <>
        <Header />
        {/* TODO: ESTE HEADER SE USO EN LA ANTERIOR SECCIÓN, PODRÍA CREARSE UN COMPONENTE PARA REUTILIZARLO */}
        <header className="booking-header">
          <div className="booking-header-titles">
            <div>
              <h4>{producto.categoria.titulo}</h4>
              <h1>{producto.nombre}</h1>
            </div>
            <i className="back-arrow">
              <a href="/">{backArrow}</a>
            </i>
          </div>
        </header>

        {/* SECCIÓN DE DETALLES DEL PRODUCTO */}
        <main className="booking-main">
          <h1>Completá tus datos</h1>
          <div className="booking-sections">
            {/* DATOS PARA LA RESERVA - LADO IZQUIERDO */}
            <div className="booking-data">
              {/* FORMULARIO */}
              <div className="booking-data-form">
                <FormDatos ciudad={setCiudad}/>
              </div>

              {/* CALENDARIO */}
              <h1 style={{ marginBottom: "13px" }}>
                Seleccioná tu fecha de reserva
              </h1>
              <div className="booking-calendar">
                <DatePicker
                  disabledKeyboardNavigation
                  inline
                  dayClassName={buscadorDayStyle}
                  renderCustomHeader={
                    width <= 480
                      ? calendarHeaderReservasMobile
                      : calendarHeaderReservas
                  }
                  //para poder seleccionar un rango de fechas
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  filterDate={fechasSinReservar}
                  onChange={(update) => {
                    setDateRange(update);
                    if(update[1] != null){
                      let fechas = [];
                      fechas.push(...eachDayOfInterval({start: update[0], end: update[1]}));
                      fechas.forEach((fecha) => {
                        let temp = ("0" + (fecha.getDate())).slice(-2) + "/" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "/" + fecha.getFullYear()
                        console.log(temp);
                        if(arrayDeFechasReservadas.includes(temp)){
                          setDateRange([null, null])
                          Swal.fire({
                            icon: "error",
                            title: "Rango de fecha invalido",
                            text: "Una o mas de las fechas que trato de seleccionar ya tienen una reserva activa",
                          });
                        }
                      })
                    }
                  }}
                  //para que cuando sea menor a 480 se vuelva uno
                  monthsShown={width <= 480 ? 1 : 2}
                  //para que sea en español
                  locale="es"
                  //para que no se puedan escojer fechas pasadas a la actual
                  minDate={subDays(new Date(), 0)}
                  //para que el nombre de los meses quede con mayúscula inicial
                  formatWeekDay={(day) =>
                    day.charAt(0).toUpperCase() + day.substring(1, 2)
                  }
                  showPopperArrow={false}
                >
                  <div className="divider-reserva"></div>
                </DatePicker>
              </div>

              {/* HORARIO */}
              <h1 style={{ marginBottom: "16px" }}>Tu horario de llegada</h1>
              <div className="booking-data-horario">
                <HorarioLLegada horario={setHorario} />
              </div>
            </div>

            {/* DETALLES DE RESERVA - LADO DERECHO */}
            <div className="booking-details">
              <h1>Detalles de la reserva</h1>

              <div className="booking-image-info">
                {/* IMAGEN RESERVA */}
                <div className="booking-details-image">
                  <img
                    src={producto.imagenes[0].url}
                    alt={producto.imagenes[0].titulo}
                  />
                </div>

                {/* INFORMACIÓN DEL PRODUCTO */}
                <div className="booking-info-container">
                  <div className="booking-details-info">
                    <h4>{producto.categoria.titulo}</h4>
                    <h1>{producto.nombre}</h1>
                    <div className="details-stars">
                      <i>{star}</i>
                      <i>{star}</i>
                      <i>{star}</i>
                      <i>{star}</i>
                      <i>{star}</i>
                    </div>

                    {/* INFORMACIÓN DE LOCACIÓN DEL PRODUCTO */}
                    <div className="booking-details-location">
                      <i>{marker}</i>
                      <div>
                        <p> A 100mt del Barrio Los Rosales</p>
                        <p>
                          {" "}
                          {producto.ciudad.nombre + ", " + producto.ciudad.pais}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CHECK IN - CHECK OUT */}
                  <div className="booking-details-check">
                    <div className="booking-details-divisor"></div>
                    <div className="txt-2 checks check-in">
                      <p>Check in</p>
                      <span className="hora-check-in">
                        {startDate ? format(startDate, 'yyyy/MM/dd') : "_/_/_"}
                      </span>
                    </div>
                    <div className="booking-details-divisor"></div>
                    <div className="txt-2 checks check-out">
                      <p>Check out</p>
                      <span className="hora-check-out">
                        {endDate ? format(endDate, 'yyyy/MM/dd') : "_/_/_"}
                      </span>
                    </div>
                    <div className="booking-details-divisor"></div>
                  </div>

                  {/* BOTÓN DE RESERVA */}
                  <button
                    className="btn-2 btn-details"
                    onClick={handlerReserva}
                  >
                    Confirmar reserva
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* REGLAS */}
        <Politicas />

        <Footer />
      </>
    );
  }
}
