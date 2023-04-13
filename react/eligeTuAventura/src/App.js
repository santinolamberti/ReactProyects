import React from "react";
import Historia from "./components/historia";

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
  return (
    <div className="App">
      <Historia />
    </div>
  );
  }
}

export default App;
