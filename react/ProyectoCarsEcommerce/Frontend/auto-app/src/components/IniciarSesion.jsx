//@ts-nocheck
import Header from "./Header";
import "../styles/iniciarSesion.css"
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import "../styles/crearCuenta.css"
import { useMemo } from "react";
import Swal from 'sweetalert2'
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />;



export default function IniciarSesion() {
  const history = useHistory();
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
  const params = useMemo(() => new URLSearchParams(window.location.search),[]);
  const [passwordShown, setPasswordShown] = useState(false);
  const alerta = params.get("alerta") ? true: false
  const reserva = params.get("reserva")
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handlerValidate = (e) =>{
    e.preventDefault()
    let emailUsuario = document.querySelector("#correo-electronico").value
    let contraseniaUsuario = document.querySelector("#contrasenia").value
    let inputs = document.querySelectorAll(".campos-inicio")
    let boton = document.querySelector(".texto-cuenta")
    let formData = {
      email: emailUsuario,
      contrasenia: contraseniaUsuario
    }
    fetch(api + "/login", {method: 'POST', body: JSON.stringify(formData), headers: {'Content-Type' : 'application/json'}})
    .then(res => res.json())
    .then(
      (result) => {
        sessionStorage.setItem("infoUsuario", JSON.stringify(result))
        reserva != null ? history.push("/productos/" + reserva + "/reserva") :history.push("/")
      },
      (error) => {
        console.log(error);
        const credenciales = document.querySelector(".error-credenciales")
        credenciales.classList.toggle("credenciales-mostrar")
        for(inputs of inputs){
        inputs.classList.toggle("error")
        }
        boton.nextElementSibling.classList.toggle("error-mensaje")
      }
    )
  }

  useEffect(() => {if(sessionStorage.getItem('infoUsuario') !== null){history.push("/")}})

  return (
    <>
      <Header login={true}/>
      <div className="logIn">
      <div className={params.get("reserva") != null ? "mostrar-no-logueado no-logueado": "no-logueado"}>
        <p><i className="fas fa-exclamation-circle"></i> Para realizar una reserva necesitas estar logueado</p>
      </div>
      <h1 className="titulo-inicio">Iniciar sesión</h1>
      <form className="form-iniciarSesion" action="">
          <div className="inputs-inicio">
          <label className="labels-inicio" htmlFor="correo-electronico">Correo electrónico</label>
          <input className="campos-inicio" type="email" name="correo-electronico" id="correo-electronico" required />
          <label  className="labels-inicio" htmlFor="contrasenia">Contraseña</label>
          <div className="campos-inicio">
            <input className="campos-inicio" type={passwordShown ? "text" : "password"} placeholder={passwordShown ? "contraseña" : "•••••••••"} name="contrasenia" id="contrasenia" required/>
            <i onClick={togglePasswordVisiblity} className="password" id="password">{passwordShown ? visible : notVisible}</i>
          </div>
          <button onClick={handlerValidate} type="submit" className="boton-iniciarSesion" id="boton-iniciarSesion">Ingresar</button>
          <p className="texto-cuenta txt-1">¿Aún no tenes cuenta? <Link to="/crearCuenta"><span className="color-links">Registrate</span></Link></p>
          <div className="error-mensaje-escondido"><p className="error-credenciales">Por favor vuelva a intentarlo, tus credenciales son inválidas</p></div>
          </div>
      </form>
      </div>
    <Footer />
    {alerta? Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe estar logueado para poder realizar una reserva',
        showConfirmButton: false,
        footer: '<a href="iniciarSesion?reserva='+ reserva +'" >Pulse aquí para iniciar sesión</a>'
      })
      : ""}
      </>
  )
}
