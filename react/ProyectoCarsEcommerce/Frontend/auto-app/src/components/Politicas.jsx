import "../styles/Politicas.css";

export default function Politicas() {
  return (
    <>
      <div className="commodity-rules">
        <h1>Qué tenés que saber</h1>
        <hr className="commodity-divisor" />
        <div className="commodity-rule-container">
          <div className="normas">
            <h3>Normas del vehículo</h3>
            <p>No Fumar.</p>
            <p>Licencia de conducir.</p>
            <p>Renta mínima de un día.</p>
          </div>
          <div className="salud">
            <h3>Salud y seguridad</h3>
            <p>Depósito de seguridad.</p>
            <p>Uso obligatorio de cinturón de seguridad. <br/> en autos y buses.</p>
            <p>Uso obligatorio de casco en motos.</p>
          </div>
          <div className="cancelacion">
            <h3>Política de cancelación</h3>
            <p className="texto-cancelacion">
              Se puede cancelar hasta 48 hs antes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
