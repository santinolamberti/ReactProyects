import { useHistory } from "react-router";
import "../styles/PantallaExito.css";

export default function PantallaExitoReserva() {
  
  const history = useHistory();

  const cerrarVentana = () => {
    history.push("/")
  }

  return (
    <>
      <div className="success-container">
        <div className="success-card">
          <svg
            width="78"
            height="74"
            viewBox="0 0 78 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M78 36.9823L69.3491 27.1534L70.5545 14.1424L57.7555 11.2432L51.0545 0L39 5.16197L26.9455 0L20.2445 11.2432L7.44545 14.107L8.65091 27.118L0 36.9823L8.65091 46.8113L7.44545 59.8576L20.2445 62.7568L26.9455 74L39 68.8027L51.0545 73.9646L57.7555 62.7215L70.5545 59.8223L69.3491 46.8113L78 36.9823ZM31.9091 54.6603L17.7273 40.5179L22.7264 35.5327L31.9091 44.6546L55.2736 21.355L60.2727 26.3755L31.9091 54.6603Z"
              fill="#f0572d"
            />
          </svg>
          <h1>¡Muchas Gracias!</h1>
          <h2>Su reserva se ha realizado con éxito</h2>
          <button onClick={cerrarVentana} className="btn-2">OK</button>
        </div>
      </div>
    </>
  );
}
