import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { api } from "./Buscador";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt, faClock, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/ReservasUsuario.css";
import Swal from "sweetalert2";


export default function ReservaUsuario(){
    
    const [error, setError] = useState(null);
    const [cargado, setcargado] = useState(false);
    const [sinReservas, setSinReservas] = useState(false);
    const [reservas, setReservas] =useState([])

    const history = useHistory();
    const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
    const clock = <FontAwesomeIcon icon={faClock} />;
    const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;

    if(sessionStorage.getItem("infoUsuario")== null){
        history.push("/")
    }

    useEffect(()=>{
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

        let configPost = {
            method: "GET",
            headers: {
              "Content-Type": "application/JSON",
              Authorization: JSON.parse(sessionStorage.getItem("infoUsuario")).token,
            },
          };
        
        fetch(api + "/reservas/usuario/" + idUsuario, configPost)
        .then(res =>res.json())
        .then((result) =>{
                setReservas(result);
            },
            (error)=>{
                setError(error);
            }
        ).then(reservas.length !== 0 || setSinReservas(true))
        .then(setcargado(true))
    },[reservas.length])
    
    if (error) {
        return (
          <>
            <Header reservas={true}/>
            <div className="commodity-container">
                <div className="commodity-header">
                    <div className="commodity-header-titles">
                        <div>
                            <h1>Mis Reservas</h1>
                        </div>
                        <i className="back-arrow"><a href="/">{backArrow}</a></i>
                    </div>
                </div>
            </div>
            <div>Error: {error.message}</div>
            <Footer />
          </>
        );
    } else if (!cargado) {
        return (
          <>
            <Header reservas={true}/>
            <div className="commodity-container">
                <div className="commodity-header">
                    <div className="commodity-header-titles">
                        <div>
                            <h1>Mis Reservas</h1>
                        </div>
                        <i className="back-arrow"><a href="/">{backArrow}</a></i>
                    </div>
                </div>
            </div>
            <Loading />
            <Footer />
          </>
        );
    } else {
        return(
            <>
            <Header reservas={true}/>
            <div className="commodity-container">

                <div className="commodity-header">

                    <div className="commodity-header-titles">
                        <div>
                            <h1>Mis Reservas</h1>
                        </div>
                        <i className="back-arrow"><a href="/">{backArrow}</a></i>
            
                    </div>
                </div>
            </div>

            
            <div className="reserva">
                <br />
            <div className="reserva-container">
            {sinReservas ?
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todavia no realizaste ninguna reserva...',
                showConfirmButton: false,
                footer: '<a href="/" >Volve cuando hayas realizado una reserva</a>'
              })
            : (reservas.map((item, i) => {
                return(
                <div className="product-card" key={i}>
                    <div className="product-image">
                        <img className="product" src={item.producto.imagenes[0].url} alt={item.producto.imagenes[0].titulo} />
                    </div>
                    <div className="product-data">
                        <div className="product-star-rating">
                            <h4>{item.producto.categoria.titulo}</h4>
                        </div>
                        <h1>{item.producto.nombre}</h1>
                        <p className="txt-1"> 
                        <i>{clock}</i> {item.hora}
                        </p>
                        <p className="txt-1">
                            <i>{calendar}</i> {item.fechaInicial.split("-")[2] + "/" + item.fechaInicial.split("-")[1] + "/" + item.fechaInicial.split("-")[0] + " - " + item.fechaFinal.split("-")[2] + "/" + item.fechaFinal.split("-")[1] + "/" + item.fechaFinal.split("-")[0]}
                        </p>
                        <p className="txt-1 product-location">
                            <i>{marker}</i> {item.producto.ciudad.nombre + ", " + item.producto.ciudad.pais}
                        </p>
                        <div className="product-features">
                        {item.producto.caracteristicas.map(caract => {
                                return (
                                <div className="product-feature">
                                    <i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong>
                                </div>
                                )
                        })}
                        </div>
                        <br />
                        <Link to={"/productos/" + item.producto.id}><button className="product-show-more btn-1">Ver Producto</button></Link>
                    </div>
                </div>
                )
            }))}
            </div>
            </div>

            <Footer />
            </>
        )
    }
}