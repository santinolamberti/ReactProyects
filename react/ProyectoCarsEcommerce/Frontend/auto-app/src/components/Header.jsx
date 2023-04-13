//@ts-nocheck
import "../styles/header.css";
import "../styles/Opciones.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";

const facebook = <FontAwesomeIcon icon={faFacebook} />;
const linkedin = <FontAwesomeIcon icon={faLinkedinIn} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;
const menu = <FontAwesomeIcon icon={faBars} />;


export default function Header(props) {
    const history = useHistory()

    const [width, setwidth] = useState ({ width: window.screen.availWidth });
    const [show, setShow] = useState("sidenav");
    const [usuarioActivo, setUsuarioActivo] = useState(false)

    let toggleNav = () => {
        setShow(show === "sidenav"? "sidenav-show" : "sidenav");
      }

    //se encarga de limitar la interaccion con los elementos de los div mientras el menu burger este activo
      useEffect(()=> {
        if (show === "sidenav") {
            document.body.style.pointerEvents = "all"
            document.body.style.overflow = "visible"
        } else {
            document.body.style.pointerEvents = "none"
            document.body.style.overflow = "hidden"
        }
    },[show])

    useEffect(() => {
        if(sessionStorage.length >0){
            setUsuarioActivo(true)
        }
        setwidth(window.screen.availWidth);
        function handleResize() {
            setwidth(window.screen.availWidth);
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
      }, [])

      const handlerClose = useCallback(() => {
        sessionStorage.removeItem('infoUsuario')
        setUsuarioActivo(false)
        if(window.location.href.includes("reserva")){history.push("/")}
      }, [history])
  
      let nombreCompleto = JSON.parse(sessionStorage.getItem('infoUsuario'))

      const usuario = () => {
        return nombreCompleto == null ? "" : nombreCompleto.nombre + " " + nombreCompleto.apellido;
      }
    
      const iniciales = () => {
        let inicial1 = "";
        let inicial2 = "";
        if (!(nombreCompleto == null)) {
          
        inicial1 = nombreCompleto.nombre[0]
        inicial2 = nombreCompleto.apellido[0]
        }
        return inicial1.toUpperCase() + inicial2.toUpperCase()
      }

      if(usuarioActivo){
          return(
        <header>
        <div id="header" className="header">
        <div className="logo">
        <Link to="/"><img src="https://buimagenes.s3.us-east-2.amazonaws.com/Logo/logo1DB.png" alt="logo" className="logo-img" /></Link>
        <Link to="/"><span className="slogan">El auto que necesitas</span></Link>
        </div> 
        {width > 480? 
        <>
        <div className="inputs-header-logged">
            {(nombreCompleto.rol !== 2 || props.reservas) || <Link to="/usuario/reservas"><input className="reservas" name="reservas" id="reservas" value="Mis Reservas" type="button"/></Link>}
            {(nombreCompleto.rol !== 1 || props.administracion) || <Link to="/administracion"><input className="administracion" name="administracion" id="administracion" value="Administración" type="button"/></Link>}
        </div>
        <div className="user-info">
        <div className="avatar">
        <span className="iniciales-avatar"> {iniciales()} </span>
       </div>
       <div className="user">
       <i className="fas fa-times" onClick={handlerClose}></i>
        <p className="saludo"> <span className="hola">Hola,</span>
        <span className="colorUser"> {usuario()} </span></p>
       </div>
       </div>
       </>
        :
        <>
        <div className="inputs-header"><i className="opciones" id="opciones"onClick={toggleNav}>{menu}</i></div>
        <div id='mySidenav ' className={show}>
            <div className="opciones" id="opciones">
                <p onClick={toggleNav}>X</p>
                <div className="opciones-header-burger" id="opciones-header">
                <div className="avatar-burger">
                    <span className="iniciales-avatar-burger"> {iniciales()} </span>
                </div>
                <div className="user">
                    <p className="saludo"> <span className="hola-burger">Hola,</span>
                    <span className="colorUser-burger"> {usuario()} </span></p>
                </div>
                <div className="opciones-links">
                {(nombreCompleto.rol !== 2 || props.reservas) || <Link to="/usuario/reservas"><h3>Mis Reservas</h3></Link>}
                {(nombreCompleto.rol !== 1 || props.administracion) || <Link to="/administracion"><h3>Administración</h3></Link>}
                </div>
            </div>
            </div>
            <div className="opciones-links-burger" id="opciones-links">
                <p>¿Deseas <span onClick={handlerClose} className="color-links">cerrar sesión</span>?</p>
            </div>
            <div className="linea-horizontal"></div>
            <i>{facebook}  {linkedin}  {twitter}  {instagram}</i>
        </div>
        </>
        
    }</div></header>
          )
      }else{
        return (
            <header>
                <div id="header" className="header">
                <div className="logo">
                <Link to="/"><img src="https://buimagenes.s3.us-east-2.amazonaws.com/Logo/logo1DB.png" alt="logo" className="logo-img" /></Link>
                <Link to="/"><span className="slogan">El auto que necesitas</span></Link>
                </div> 
                {width > 480? 
                <div className="inputs-header">
                    {props.crearCuenta || <Link to="/crearCuenta"><input className="crearCuenta" name="Crear cuenta" id="Crear cuenta" value="Crear cuenta" type="button"/></Link>} 
                    {props.login || <Link to="/iniciarSesion"><input className="iniciarSesion" name="Iniciar sesión" id="Iniciar sesión" value="Iniciar sesión" type="button"/></Link>}
                </div> 
                :
                <div className="inputs-header"><i className="opciones" id="opciones" onClick={toggleNav}>{menu}</i></div>
                }
                </div>
    
                <div id='mySidenav ' className={show}>
                    <div className="opciones" id="opciones">
                        <p onClick={toggleNav}>X</p>
                        <div className="opciones-header" id="opciones-header">
                            <h2>MENÚ</h2>
                        </div>
                        <div className="opciones-links" id="opciones-links">
                            {props.login ? "" : <Link to="/iniciarSesion"><h3>Iniciar sesión</h3></Link>}
                            {props.crearCuenta ? "" : <Link to="/crearCuenta"><h3>Crear cuenta</h3></Link>}
                        </div>
                        <i>{facebook}  {linkedin}  {twitter}  {instagram}</i>
                    </div>
                </div>
            </header>
        )
      }
    
}
