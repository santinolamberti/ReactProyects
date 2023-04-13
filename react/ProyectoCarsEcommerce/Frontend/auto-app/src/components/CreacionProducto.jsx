import "../styles/creacionProducto.css";
import Header from "./Header";
import Footer from "./Footer";
import { api } from "./Buscador";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import "../styles/producto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default function CreacionProducto() {
  const history = useHistory();
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [atributosArr, setAtributosArr] = useState([])
  const [nombreAtributo, setNombreAtributo] = useState([]) 
  const [iconoElegido, setIconoElegido] = useState([])
  const [imagenesArr, setImagenesArr] = useState([])
  const [imagen, setImagen] = useState([])
  const [ciudadId, setCiudadId] = useState(null)
  const [categoriaId, setCategoriaId] = useState(null)
  // const [nombreImagen, setNombreImagen] = useState(null)
  const [objetoAtributo, setObjetoAtributo] = useState([])
  const [objetoImagen, setObjetoImagen] = useState([])
  const backArrow = <FontAwesomeIcon icon={faChevronLeft} />;

  const traerCiudades = () => {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/JSON",
      },
    };

    fetch(api + "/ciudades/todas", config)
      .then((response) => response.json())
      .then((data) => setCiudades(data))
      .catch((error) => console.log(error));
  };

  let ciudadElegida = "buenos aires";
  const handleCangeCiudad = () => {
    ciudadElegida = document.querySelector("#ciudad").value
    setCiudadId(ciudadElegida);
    console.log(ciudadId)
  };

  let categoriaElegida = "autos";
  const handleChangeCategoria = () => {
    categoriaElegida = document.querySelector("#categoria").value
    setCategoriaId(categoriaElegida);
    console.log(categoriaId)
  };

  const handlerSubmit = (e) => {
    e.preventDefault()

    const nombreAuto = document.querySelector("#nombre-auto").value
    const ciudad = document.querySelector("#ciudad").value
    const categoria = document.querySelector("#categoria").value
    const direccion = document.querySelector("#direccion").value
    const descripcion = document.querySelector("#descripcion").value
    const politics = document.querySelector(".politics").value

    let datosDeUsuario = sessionStorage.getItem("infoUsuario");
    let datosDeUsuarioParseado = JSON.parse(datosDeUsuario);

    let valores = {
      nombre : document.querySelector("#nombre-auto").value,
      descripcion: document.querySelector("#descripcion").value,
      categoria: {id: categoriaId},
      ciudad: {id: ciudadId},
      imagenes: [...objetoImagen],
      caracteristicas: [...objetoAtributo],
    }

    let configPost = {
      method: "POST",
      body: JSON.stringify(valores),
      headers: {
        "Content-Type": "application/JSON",
        Authorization: datosDeUsuarioParseado.token,
      },
    };
    
    if(nombreAuto === null || ciudad === null || direccion === null || categoria === null || descripcion === null || objetoAtributo.length === 0 || politics === null || objetoImagen.length === 0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completar todos los datos por favor",
      })
    }else if (objetoImagen.length <5){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe agregar al menos 5 imágenes",
      })
    }
    else{
    fetch(api + "/productos", configPost)
      .then((data) => {console.log(data)
      return data.status === 200 ? history.push("/administracion/exito") : Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lamentablemente el producto no ha podido crearse. Por favor intente más tarde",
      })
      })
      .catch((error) => {console.log(error)});
  };
  }
  useEffect(() => {
    fetch(api + "/categorias/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setCategorias(result);
        },
        (error) => {
          console.log(error);
        }
      )
    traerCiudades();
  }, []);

  let infoUser = JSON.parse(sessionStorage.getItem("infoUsuario"));

  console.log(infoUser.rol);
  if (infoUser === null || infoUser.rol !==1) {
    history.push("/")
  }

  function Atributo(props) {
    return(
    <div className="esqueleto-agregar-atributo">
              <div className="agregar-icono">
                <div className="div-nombre-atributo">
                  <label htmlFor="nombre-atributo">Nombre</label>
                  <input
                    type="text"
                    name="nombre-atributo"
                    id="nombre-atributo"
                    value={props.datos.nombre}
                    disabled
                  />
                  </div>
                  <div className="div-select-icono">
                  <label htmlFor="icono" >Icono</label>
                  <input type="text" name="icono" id="icono" defaultValue="fa-Wifi" value={props.datos.icono} disabled/>
                  {/* encontrar otro icono, este es el unico gratis */}
                </div>
              </div>
              <i className="fas fa-times cruz" onClick={() => borrarAtributo(props.id)}></i>
            </div>
    )
  } 


  const handleChangeAtributo = () => {
    setNombreAtributo(document.querySelector("#nombre-atributo").value)
    setIconoElegido(document.querySelector("#icono").value);
  };

  const nuevoAtributo = () => {
    const errorIncompleto = document.querySelector(".error-atributo")
    if(iconoElegido.length === 0 || nombreAtributo.length === 0){
      errorIncompleto.classList.add("mostrar-campo-incompleto")
    }else{
      errorIncompleto.classList.remove("mostrar-campo-incompleto")
    setAtributosArr([...atributosArr, <Atributo key={[atributosArr.length]} id={atributosArr.length} />])
    setObjetoAtributo([...objetoAtributo, {
      nombre: nombreAtributo,
      icono: iconoElegido
    }])

  }
  } 

  const borrarAtributo = (id) => {
    let original = objetoAtributo
    original.splice(id,1)
    setObjetoAtributo([...original])
  }

  function Imagen(props) {
    return(
      <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" value={props.datos.url} disabled />
                  <i className="fas fa-times cruz" onClick={() => borrarImagen(props.id)}></i>
                  {/* encontrar otro icono, este es el unico gratis */}
                </div>
              </div>
            </div>
    )
  }

  const handleChangeImagen = () => {
    setImagen(document.querySelector("#cargar-imagen").value)
  };

  const nuevaImagen = () => {
    const errorIncompleto = document.querySelector(".error-imagen")
    if(imagen.length === 0){
      errorIncompleto.classList.add("mostrar-campo-incompleto")
    }else{
      errorIncompleto.classList.remove("mostrar-campo-incompleto")
    setImagen(imagen)
    setImagenesArr([...imagenesArr, <Imagen key={[imagenesArr.length]} />])
    let nombreAuto = document.querySelector("#nombre-auto").value
    // setNombreImagen(nombreAuto + " " + imagenesArr.length)
    setObjetoImagen([...objetoImagen, {
      titulo: nombreAuto + " " + objetoImagen.length,
      url: imagen,
    }])
    }
  } 

  const borrarImagen = (id) => {
    let original = objetoImagen
    original.splice(id,1)
    setObjetoImagen([...original])
  }

  return (
    <>
      <Header administracion={true}/>
      <div className="commodity-header">

          <div className="commodity-header-titles">
            <div>
              <h1>Administración de productos</h1>
            </div>
            <i className="back-arrow"><a href="/">{backArrow}</a></i>
          </div>
        </div>

      <div className="esqueleto-pagina">
        <div className="titulo">
          <h1>Crear producto</h1>
        </div>

        <form className="form-crear-auto" onSubmit={handlerSubmit}>
          <div className="inputs-crear-auto">
            <div className="inputs-pegados">
              <div>
                <label htmlFor="nombre">Nombre del vehículo</label>
                <input type="text" name="nombre" id="nombre-auto" placeholder="Audi A5" />

                <label htmlFor="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" placeholder="Aráoz 2885" />
              </div>

              <div>
                <label htmlFor="categoria">Categoría</label>
                <select defaultValue="Categoría" name="categoria" id="categoria" onChange={handleChangeCategoria}>
                  <option value="Categoria" disabled>
                    Categoría
                  </option>
                  {categorias.map((categoria) => (
                    <option value={categoria.id}>{categoria.titulo}</option>
                  ))}
                </select>

                <label htmlFor="ciudad">Ciudad</label>
                <select
                  defaultValue="Ciudad"
                  name="ciudad"
                  id="ciudad"
                  required 
                  onChange={handleCangeCiudad}
                >
                  <option value="Ciudad" disabled>
                    Ciudad
                  </option>
                  {ciudades.map((ciudad) => (
                    <option value={ciudad.id}>{ciudad.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="div-descripcion">
              <label htmlFor="descripcion">Descripcion</label>
              <textarea  name="descripcion" id="descripcion" placeholder="Escribir aquí" />
            </div>

            <h2>Agregar atributos</h2>
            <div className="esqueleto-agregar-atributo">
              <div className="agregar-icono">
                <div className="div-nombre-atributo">
                  <label htmlFor="nombre-atributo">Nombre</label>
                  <input
                    type="text"
                    name="nombre-atributo"
                    id="nombre-atributo"
                    placeholder="vehículo"
                    onChange={handleChangeAtributo}
                  />
                </div>
                <div className="div-select-icono">
                <label htmlFor="icono" >Icono</label>
                  <select name="icono" id="icono" onChange={handleChangeAtributo} defaultValue="fa-car-side">
                    <option value="fa-car-side" className="fa"> &#xf5e4; auto</option>
                    <option value="fa-truck-pickup" className="fa"> &#xf63c; camioneta</option>
                    <option value="fa-bus" className="fa"> &#xf207; bus</option>
                    <option value="fa-motorcycle" className="fa"> &#xf21c; moto</option>
                    <option value="fa-gas-pump" className="fa"> &#xf52f; combustible</option>
                    <option value="fa-users" className="fa"> &#xf0c0; capacidad</option>
                    <option value="fa-clock" className="fa"> &#xf017; año</option>
                  </select>
                  </div>
              </div>
              <div className="mas-agregar-atributo">
                  <i className="fas fa-plus-square mas" onClick={nuevoAtributo}></i>
                  </div>
            </div>
            <p className="campo-incompleto error-atributo">Por favor Complete los campos antes de agregarlos</p>

            {/* {atributosArr} */}
            {objetoAtributo.map((objeto, index) => <Atributo datos={objeto} id={index} />)}

            <h2>Políticas del producto</h2>
            <div className="esqueleto-politicas">
              <div className="politicas">
                <div>
                  <h2>Normas del producto</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-normas"
                    placeholder="Escribir aquí"
                  />
                </div>
                <div>
                  <h2>Salud y seguridad</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-seguridad"
                    placeholder="Escribir aquí"
                  />
                </div>
                <div>
                  <h2>Política de cancelación</h2>
                  <label htmlFor="descripcion-normas">Descripción</label>
                  <textarea
                    name="descripcion-normas"
                    className="politics"
                    id="descripcion-cancelacion"
                    placeholder="Escribir aquí"
                  />
                </div>
              </div>
            </div>

            <h2>Cargar imágenes</h2>
            <div className="esqueleto-cargar-imagenes">
              <div className="cargar-imagen">
                <div>
                  <input type="text" name="cargar-imagen" id="cargar-imagen" placeholder="insertar https://" onChange={handleChangeImagen} />
                  <i className="fas fa-plus-square mas" onClick={nuevaImagen}></i>
                </div>
                <p className="campo-incompleto error-imagen">Por favor complete el campo antes de agregarlo</p>
              </div>
            </div>
            {objetoImagen.map((objeto, index) => <Imagen datos={objeto} id={index} />)}

            <input type="submit" className="submit-crear" value="Crear" />
          </div>
        </form>

        <Footer />
      </div>
    </>
  );
}
