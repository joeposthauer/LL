import React, { useState } from "react";
import Submit from "./Submit.jsx";
import CytoNode from "./CytoNode.jsx";
import Header from "./Header.jsx";

function App() {
  const [cyto, setCyto] = useState([]);

  function addCyto(newCyto) {
    setCyto(prevCyto => {
      return [newCyto];
    });
  }


  return (
    <div>
      <Header />
      <Submit
        onAdd={addCyto}
      />
      {cyto.map((cytoItem, index) => {
        return (
          <CytoNode
            key={index}
            nodes={cytoItem.nodes}
            edges={cytoItem.edges}
          />
        )
      })}
    </div>

  );
}

export default App;
