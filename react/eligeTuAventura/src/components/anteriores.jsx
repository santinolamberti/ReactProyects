import React from "react"

export default class Anteriores extends React.Component{

    render(){
        return(
            <div className="anteriores">
            <h3>Seleccion anterior: {this.props.anterior}</h3>
            <h3>Historial de opciones elegidas:</h3>
            <ul>
                {this.props.historial}
            </ul>
            </div>
        )
    }
}