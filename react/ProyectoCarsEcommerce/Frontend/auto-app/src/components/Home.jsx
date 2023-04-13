import Buscador from "./Buscador";
import Footer from "./Footer";
import Header from "./Header";
import Categories from './Categories';
import Listado from './Listado';

export default function Home() {
  return (
    <>
      <Header /> 
      <Buscador />
      <Categories />
      <Listado /> 
      <Footer /> 
    </>
  );
};
