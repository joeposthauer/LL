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


  //function receives nodes+edges from Submit.jsx
  function createNodes(nodes, edges) {
    const allNodes = [];
    const allEdges = [];

    const nodeData = nodes;
    const edgeData = edges;

    nodeData.forEach(function (n) {
      allNodes.push({
        "name": n[0],
        "xpos": n[1].layout.pos[0],
        "ypos": n[1].layout.pos[0],
        "text": n[1].layout.text
      })
    })

    
  }

  return (
    <div>
      <Header />
      <Submit
        onSubm={createNodes}
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
