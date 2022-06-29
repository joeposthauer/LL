import React from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'react-cytoscapejs'; 
import edgehandles from "cytoscape-edgehandles";
import cytoscape from 'cytoscape';

function CytoNode(props) {

    

    //assembling arrays of nodes/edges from json file
    //to be properly added to cyto graph

    const nodeData = [];
    const edgeData = [];
    props.nodes.forEach(function (n) {
        nodeData.push({
          "name": n[0],
          "xpos": n[1].layout.pos[0],
          "ypos": n[1].layout.pos[0],
          "text": n[1].layout.text
        })
    })
    props.edges.forEach(function(source) {
        source[1].forEach(function(dest) {
            edgeData.push({
                "source": source[0],
                "destination": dest
            })
        })
    })


    
    //add components to graph
    const elems = [];
    nodeData.forEach(function(node) {
        elems.push({
            group: 'nodes',
            data: {
                id: node.name,
                name: node.text
            },
            position: {
                x: node.xpos,
                y: node.ypos
            }
        });
    })

    

    
    //declare cytoscape, start empty, add nodes once data is received
    let cy = new Cytoscape({
        container: document.getElementById('cy'),
        elements: elems,
        style: [ 
            {
              selector: 'node',
              style: {
                'background-color': '#69e',
                'label': 'data(id)',
              }
            },
        
            {
              selector: 'edge',
              style: {
                'width': 1,
                'line-color': '#369',
                'target-arrow-color': '#369',
                'target-arrow-shape': 'triangle',
                'label': 'data(label)',
                'font-size': '14px',
                'color': '#777'
              }
            }
          ],
    });

    



    return(
        <div id="cy"></div>
    )
}

export default CytoNode;