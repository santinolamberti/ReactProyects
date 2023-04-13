//@ts-nocheck
import Header from "./Header";
import "../styles/Global.css"
import "../styles/crearCuenta.css"
import Footer from "./Footer";
import { Link, useHistory } from "react-router-dom"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  correoElectronico: yup.string().email().required(),
  contrasenia: yup.string().min(7).required(),
  confirmarContrasenia: yup.string().oneOf([yup.ref("contrasenia"), null])
})

export default function CrearCuenta() {
  const history = useHistory()
  const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    let infoUsuario = {
          nombre: document.querySelector("#nombre").value,
          apellido: document.querySelector("#apellido").value,
          email: document.querySelector("#correo-electronico").value,
          contrasenia: document.querySelector("#contrasenia").value,
          rol: {
            id:2
          }
        }
        fetch(api + "/registro",{method: 'POST', body: JSON.stringify(infoUsuario), headers: {'Content-Type' : 'application/json'}})
        .then(
          (result) => {
            history.push("/iniciarSesion")
          },
          (error) => {
            console.log(error);
            alert(error)
          }
        )
  }

  useEffect(() => {if(sessionStorage.getItem('infoUsuario') !== null){history.push("/")}})

  
  

  return (
    <>
      <Header crearCuenta={true}/>
      <div className="signUp">
      <h1 className="titulo-crear">Crear cuenta</h1>
      <form className="form-crearCuenta" onSubmit={handleSubmit(submitForm)}>
          <div className="inputs">
              <div className="campos-pegados">
          <span className="span-1"><label className="labels-crear" htmlFor="nombre">Nombre</label>
          <input className={errors.nombre ? "error campos-crear" : "campos-crear"} type="text" name="nombre" id="nombre" {...register('nombre', {required: true})}  /> <p> {errors.nombre && "Este campo es obligatorio"} </p> </span>
          <span className="span-2"><label className="labels-crear" htmlFor="apellido">Apellido</label>
          <input className={errors.apellido ? "error campos-crear" : "campos-crear"} type="text" name="apellido" id="apellido" {...register('apellido', {required: true})} /> <p> {errors.apellido && "Este campo es obligatorio"} </p> </span>
          </div>
          <label className="labels-crear" htmlFor="correo-electronico">Correo electrónico</label>
          <input className={errors.correoElectronico ? "error campos-crear" : "campos-crear"} type="email" name="correo electronico" id="correo-electronico" {...register('correoElectronico', {required: true})} /> <p> {errors.correoElectronico && "Debe introducir un mail válido"} </p> 
          <label className="labels-crear" htmlFor="contrasenia">Contraseña</label>
          <input className={errors.contrasenia ? "error campos-crear" : "campos-crear"} type="password" name="contrasenia" id="contrasenia" {...register('contrasenia', {required: true})} /> <p> {errors.contrasenia && "La contraseña debe tener más de 6 caracteres"} </p> 
          <label className="labels-crear" htmlFor="confirmarContrasenia" >Confirmar contraseña</label>
          <input className={errors.confirmarContrasenia ? "error campos-crear" : "campos-crear"} type="password" name="confirmarContrasenia" id="confirmarContrasenia" {...register('confirmarContrasenia', {required: true})} /> <p> {errors.confirmarContrasenia && "Las contraseñas no coinciden" } </p> 
          <button type="submit" className="boton-crearCuenta" id="boton-crearCuenta">Crear cuenta</button>
          <p className="texto-inicio txt-1">¿Ya tenes una cuenta? <Link to="iniciarSesion"><span className="color-links">Iniciar sesión</span></Link></p>
          </div>
      </form>
      </div>
    <Footer />
    </>
  );
}
