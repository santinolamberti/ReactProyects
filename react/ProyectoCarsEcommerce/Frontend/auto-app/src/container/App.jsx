//@ts-nocheck
import '../styles/Global.css';
import "../styles/App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import CrearCuenta from "../components/CrearCuenta";
import iniciarSesion from "../components/IniciarSesion";
import Producto from '../components/Producto';
import Buscar from '../components/Buscar';
import Reservas from '../components/Reservas';
import PantallaExitoReserva from '../components/PantallaExitoReserva';
import PantallaExitoProducto from '../components/PantallaExitoProducto';
import CreacionProducto from '../components/CreacionProducto';
import ReservasUsuario from '../components/ReservasUsuario';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
            <Route path="/crearCuenta" component={CrearCuenta} />
            <Route path="/iniciarSesion" component={iniciarSesion} />
            <Route path="/buscar" component={Buscar} />
            <Route exact path="/productos/:id" component={Producto} />
              <Route path="/productos/:id/reserva" component={Reservas} />
            <Route path="/exito" component={PantallaExitoReserva} />
            <Route exact path="/administracion" component={CreacionProducto} />
              <Route path="/administracion/exito" component={PantallaExitoProducto} />
            <Route path="/usuario/reservas" component={ReservasUsuario} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
  
export default App;
