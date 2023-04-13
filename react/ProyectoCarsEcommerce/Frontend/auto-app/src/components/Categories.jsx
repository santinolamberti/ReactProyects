//@ts-nocheck
//Estilos
import '../styles/Categories.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const api = "http://ec2-3-135-186-132.us-east-2.compute.amazonaws.com:8080"


export default function BloqueCategoria() {
  const [error, setError] = useState(null);
  const [cargado, setcargado] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(api + "/categorias/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setcargado(true);
          setCategorias(result);
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
      null
    );
  } else {
    return(
        <div className="category">
            <h2>Buscar por tipo de transporte</h2>
            <div className="type-container">
                {categorias.map( (item, i) => 
                    <div className="type-card" key={i}>
                        <div className="type-card-header">
                          <Link to={"/buscar?categoria=" + item.titulo}>
                              <img src={item.url} alt={item.titulo} />
                          </Link>
                        </div>
                        <div className="type-card-footer">
                          <h3>{item.titulo}</h3>
                          <p>{item.descripcion}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}};
