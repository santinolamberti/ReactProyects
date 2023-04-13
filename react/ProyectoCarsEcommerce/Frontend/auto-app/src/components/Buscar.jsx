import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";
import Header from "./Header";
import Buscador from "./Buscador";
import Footer from "./Footer";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"
const url = window.location.href

export default function Buscar(props) {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});
  const [error, setError] = useState(null);
  const [cargado, setcargado] = useState(false);
  const [productos, setProductos] = useState([]);
  const params = useMemo(() => new URLSearchParams(window.location.search),[]);

  const handlerShowText = (title) => {
    setShowText({
      show: !showText.show,
      idText: title
    });
  };

  const apiFetch = (url) => {
    fetch(api + url)
      .then(res => res.json())
      .then(
        (result) => {
          setProductos(result);
          setcargado(true);
        },
        (error) => {
          setcargado(true);
          setError(error);
        }
      )
  }

  //useEffect que funciona como componentDidMount
  useEffect(() => {
    if (params.get("categoria") != null){  apiFetch("/productos/categoria?titulo=" + params.get("categoria"))  }

    else if (params.get("locacion") != null && params.get("fecha") == null) {  apiFetch("/productos/ciudad?nombre=" + params.get("locacion"))  }
    
    else if (params.get("locacion") == null && params.get("fecha") != null) {  apiFetch("/reservas/fechas?fechaInicial=" + params.get("fecha").split("#")[0] +  "&fechaFinal=" + params.get("fecha").split("#")[1])  }
    
    else if (params.get("locacion") != null && params.get("fecha") != null) {  apiFetch("/reservas/ciudadYFechas?ciudad=" +  params.get("locacion") + "&fechaInicial=" + params.get("fecha").split("#")[0] + "&fechaFinal=" + params.get("fecha").split("#")[1])  }
    
    else {  apiFetch("/productos/todos")  }
  }, [params])

  //useEffect que funciona como componentDidUpdate
  useEffect(() => {
    if(window.location.href !== url){
      window.location.reload()
      console.log("reload");
    }
  })


  if (error) {
    return (
    <>
      <Header/>
      <Buscador/>
      <div>Error: {error.message}</div>
      <Footer/>
    </>)
  } else if (!cargado) {
    return (
    <>
      <Header/>
      <Buscador/>
      <Loading />
      <Footer/>
    </>)
  } else {
  return (
    <>
    <Header/>
    <Buscador/>
      <div className="buscar"  key={params.get("locacion")}>
        <div className="product-container">

          {productos.map( (item, i) => {
            return (
                <div className="product-card" key={i}>
                  <div className="product-image">
                  <img className="product" src={item.imagenes[0].url} alt={item.imagenes[0].titulo} />
                  </div>
                  <div className="product-data">
                    <div className="product-star-rating">
                      <h4>{item.categoria.titulo}</h4>
                    </div>
                    <h1>{item.nombre}</h1>
                    <p className="txt-1 product-location">
                      <i>{marker}</i> {item.ciudad.nombre + ", " + item.ciudad.pais}
                    </p>
                    <div className="product-features">
                      {item.caracteristicas.map(caract => {
                        return (
                          <div className="product-feature">
                            <i className={"fas " + caract.icono} /><strong>{caract.nombre}</strong>
                          </div>
                        )
                      })}
                    </div>
                    <div className="txt-1 product-description">
                      <p key={`p-${i}`}>
                        {showText.show && showText.idText === item.nombre ? item.descripcion : item.descripcion.substring(0, 20)+"..."}
                        <span key={`s-${i}`} className="show-text" onClick={() => handlerShowText(item.nombre)}> 
                          {showText.show && showText.idText === item.nombre ? " menos" : " más"}
                        </span>
                      </p>
                    </div>
                    <Link to={"/productos/" + item.id}><button className="product-show-more btn-1">Ver Detalle</button></Link>
                  </div>
                </div>
            );
          })}

        </div>
      </div>
      <Footer/>
    </>
  );}
}