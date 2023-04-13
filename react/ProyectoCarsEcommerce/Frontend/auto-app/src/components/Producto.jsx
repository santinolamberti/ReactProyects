//@ts-nocheck
// Librerías
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { Link } from "react-router-dom";
// Estilo CSS
import "../styles/producto.css";
import "../styles/CalendarProducto.css";
// Íconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMapMarkerAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// Calendario
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { subDays, getDate, format, eachDayOfInterval } from 'date-fns';
// Componentes
import Gallery from './Gallery';
import SwipeGallery from './SwipeGallery';
import Header from "./Header";
import Politicas from "./Politicas";
import Footer from './Footer';
import Loading from './Loading';

Geocode.setApiKey("AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s");

export default function Producto(props) {
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;
  const nextArrow = <FontAwesomeIcon icon={faChevronRight} />;
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  registerLocale("es", es);
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
  const [width, setwidth] = useState ({ width: window.screen.availWidth });
  const [error, setError] = useState(null);
  const [cargado, setcargado] = useState(false);
  const [arrayDeFechasReservadas, setArrayDeFechasReservadas] = useState([])
  const [center, setCenter] = useState({
    lat: -34.603722,
    lng: -58.381592
  });
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    categoria: {
      titulo: "",
    },
    ciudad: {
      nombre: "",
      pais: ""
    },
    imagenes: [],
    caracteristicas: []
  });


// Esta función se encarga de enviar al DatePicker las fechas que están inhabilitadas
const fechasSinReservar = (date) => {
  // date hace referencia al formato con el que trae normalmente el DatePicker las fechas
  // le hago format abajo para que haga match con el formato de las fechas que están en el arrayDeFechasReservadas
  return !arrayDeFechasReservadas.includes(format(date, 'dd/MM/yyyy'));
};

// Estilo de días
const buscadorDayStyle = (date) => getDate(date) ? "producto-day-style" : undefined;

  const calendarHeaderProducto = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => {
    return (
      <>
        {/* CONTENEDOR DEL HEADER */}
        <div className="header-calendar-producto">
          {/* BOTÓN PARA REGRESAR MES */}
          <button
            aria-label="Previous Month"
            className={"navigation-arrows-producto back-arrow-producto"}
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
            className={"navigation-arrows-producto next-arrow-producto"}
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            {<i>{nextArrow}</i>}
          </button>
        </div>
      </>
    );
  };

  const calendarHeaderProductoMobile = ({
    monthDate,
    customHeaderCount,
    decreaseMonth,
    increaseMonth,
  }) => (
    <div className="header-calendar-producto">
      <button
        aria-label="Previous Month"
        className={"navigation-arrows-producto back-arrow-producto"}
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
        className={"navigation-arrows-producto next-arrow-producto"}
        onClick={increaseMonth}
      >
        {<i>{nextArrow}</i>}
      </button>
    </div>
  );

  useEffect(() => {
    setwidth(window.screen.availWidth);
    function handleResize() {
        setwidth(window.screen.availWidth);
    }
    window.addEventListener('resize', handleResize)
    fetch(api + "/productos/buscar/" + props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          result == null ? setError({message : "Este producto no existe"}) : setProducto(result);
          Geocode.fromAddress(producto.ciudad.nombre + ", " + producto.ciudad.pais).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setCenter({
                lat: lat,
                lng: lng
              });
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
              },
              (error) =>{
                setError(error);
              })
            },
            
          ).catch((error) => {
            setError(error);
          })
          setcargado(true)
        },
        (error) => {
          setError(error);
          setcargado(true)
          setProducto({
            id: 0,
            nombre: "error",
            descripcion: "error",
            categoria: {
              titulo: "error",
            },
            imagenes: {
              titulo:"error",
              url: "error"
            },
            ciudad: {
              nombre: "error",
              pais: "error"
            }
          })
        })
    return _ => {
        window.removeEventListener('resize', handleResize)
    }
  }, [props.match.params.id, producto.ciudad.nombre, producto.ciudad.pais]);
  if (error) {
    return (
    <>
    <Header />
    <div>Error: {error.message}</div>
    <Footer />
    </>
    )
  } else if (!cargado) {
    return (
      <>
      <Header />
      <Loading />
      <Footer />
    </>
    )
  } else {
  return (
    <>
    <Header />
      <div className="commodity-container">

        <div className="commodity-header">

          <div className="commodity-header-titles">
            <div>
              <h4>{producto.categoria.titulo}</h4>
              <h1>{producto.nombre}</h1>
            </div>
            <i className="back-arrow"><a href="/">{backArrow}</a></i>
            
          </div>

          <div className="commodity-location-ranking">
            <div className="commodity-location-description">
              <i>{marker}</i>
              <div className="texto-locacion">
                <p> {producto.ciudad.nombre + ", " + producto.ciudad.pais}</p>
                <p> A 100mt del Barrio Los Rosales</p>
              </div>
            </div>
          </div>
        </div>

        <div className="commodity-gallery" style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
          {width < 768 ? <SwipeGallery imagenes={producto.imagenes}/> : <Gallery imagenes={producto.imagenes}/> }
        </div>

        <div className="commodity-description">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
        </div>
      </div>

      <div className="commodity-features">
        <h1>¿Qué ofrece este vehículo?</h1>
        <hr className="commodity-divisor" />
        <div className="features-box">
          {producto.caracteristicas.map(caract => {
            return <div><i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong></div>
          })}
        </div>
      </div>
      <div className="commodity-available-dates">
        <h1>Fechas disponibles</h1>
        <div className="commodity-container-calendar">
          <div className="commodity-calendar">
            <DatePicker
              disabledKeyboardNavigation
              //para estilizar el texto número de los días
              dayClassName={buscadorDayStyle}
              renderCustomHeader={width <= 480 ? calendarHeaderProductoMobile : calendarHeaderProducto}
              //para que aparezca sin necesidad del input
              inline 
              //para poder seleccionar un rango de fechas
              selected={false}
              //para que cuando sea menor a 480 se vuelva uno
              monthsShown={width <= 480 ? 1 : 2}
              //para que sea en español
              locale="es"
              //para que no se puedan escojer fechas pasadas a la actual
              minDate={subDays(new Date(), 0)}
              //para que el nombre de los meses quede con mayúscula inicial
              formatWeekDay={day => day.charAt(0).toUpperCase() + day.substring(1,2) }
              showPopperArrow={false}
              //este prop permite filtrar las fechas, recibe una función que indica las fechas a filtrar
              filterDate={fechasSinReservar}
            >
              <div className="divider-producto"></div>
            </DatePicker>
          </div>
          <div className="iniciar-reserva">
              <p className="texto-iniciar-reserva">Agregá tus fechas de viaje para obtener precios exactos</p>
              <Link to={sessionStorage.getItem("infoUsuario")!= null ? "/productos/" + props.match.params.id + "/reserva" : "/iniciarSesion?reserva=" + props.match.params.id + "&alerta=true"} className="boton-iniciar-reserva">Iniciar reserva</Link>
          </div>
        </div>
      </div>

      <div className="commodity-location">
        <h1>¿Dónde lo encontrás?</h1>
        <hr className="commodity-divisor" />
        <h4>{producto.ciudad.nombre}</h4>
        <div className="commodity-location-container">
          <div>
            <LoadScript
              googleMapsApiKey="AIzaSyAli5PVZMSWFoK9984QUolP-CMt0gxH70s"
            >
              <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={10}
              />
            </LoadScript>
          </div>
        </div>
      </div>
      <Politicas />
      <Footer />
    </>
  );
};
};
