//@ts-nocheck
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Listado.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"

export default function Listado() {
  const marker = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const [ showText, setShowText ] = useState({show: false, idText: null});
  const [error, setError] = useState(null);
  const [cargado, setcargado] = useState(false);
  const [productos, setProductos] = useState([]);

  const handlerShowText = (title) => {
    setShowText({
      show: !showText.show,
      idText: title
    });
  };

  useEffect(() => {
    fetch(api + "/productos/cantidad")
      .then(res => res.json())
      .then(
        (result) => {
          let array = [];
          while(array.length < 8 && array.length < result.length){
            var r = Math.floor(Math.random() * result.length) + 1;
            if(array.indexOf(r) === -1) array.push(r);
          }
          console.log(array);
          array.forEach((i) => {
            fetch(api + "/productos/buscar/" + result[i-1])
            .then(res => res.json())
            .then(
              (result) => {
                if(result!==null)setProductos(productos => [...productos, result])
              },
              (error) => {
                console.log(error);
              }
            )
          })
          setcargado(true);
        },
        (error) => {
          setcargado(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!cargado) {
    return (
      <Loading />
    );
  } else {
    return (
    <>
      <div className="listado">
        <h2>Recomendaciones</h2>
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
                    <Link  to={"/productos/" + item.id}><button className="product-show-more btn-1">Ver Detalle</button></Link>
                  </div>
                </div>
            );
          })}

        </div>
      </div>
    </>
  );}
}
