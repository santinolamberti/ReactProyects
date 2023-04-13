import React from "react";
import Anteriores from "./anteriores";
import data from "./data.json"
import Opciones from "./opciones";
import Swal from "sweetalert2";



export default class Historia extends React.Component{
    constructor(props){
        super(props);
        this.state={
            todo: data,
            id: 1,
            actual: data[0],
            anterior: "",
            historial: []
        }
    }

    componentDidUpdate = () => {
        Swal.fire({
            icon: 'success',
            title: 'usted eligió' + " " + this.state.anterior,
            showConfirmButton: false,
            timer: 1000
          })
    }


    handleOpciones = (e) => {
        const idUpdated = this.state.id + 1;
        const concatIdLetra = idUpdated + e.target.id;
        const concatEqualsJSON = data.find(i => i.id == concatIdLetra)
        const letraMayuscula = e.target.value
        if(concatEqualsJSON != null){
        this.setState ({
            id: idUpdated,
            actual: concatEqualsJSON,
            anterior: letraMayuscula,
            historial: [...this.state.historial, letraMayuscula]
        })}else{
            Swal.fire({
                icon: 'success',
                title: 'Primer parcial finalizado',
                showConfirmButton: false,
                timer: 2000
              })
        }

    }


render(){
    return(
        <div className="layout">
              <h1 className="historia">{this.state.actual.historia}</h1>
              <Opciones handleOpciones={this.handleOpciones} op={this.state.actual.opciones}/>
              <Anteriores anterior={this.state.anterior} historial={this.state.historial.map((eleccion, i) => <li key={i}>{eleccion}</li>)}/>
              </div>
    )
}
}
