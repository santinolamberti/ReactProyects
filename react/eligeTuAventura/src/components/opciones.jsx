import React from "react";

export default class Opciones extends React.Component{
    constructor(props){
        super(props)
    }


      render(){
          return (
              
              <div className="opciones">
              <div className="opcion" >
              <button className="botones" value="A" onClick={this.props.handleOpciones} id="a">A</button>
              <h2>{this.props.op.a}</h2>
              </div>
              <div className="opcion" >
              <button className="botones" value="B" onClick={this.props.handleOpciones} id="b">B</button>
              <h2>{this.props.op.b}</h2>
              </div>
              </div>
          )
      }
}