import React, {useState} from "react";
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'react-cytoscapejs';
import edgehandles from "cytoscape-edgehandles";
import cytoscape from 'cytoscape';


function CytoNode(props) {

    //assembling arrays of nodes/edges from json file
    //to be properly added to cyto graph

    const nodeData = [];
    const edgeData = [];
    const nodeYpos = [];
    props.nodes.forEach(function (n) {
        nodeData.push({
            "name": n[0],
            "xpos": n[1].layout.pos[0],
            "ypos": n[1].layout.pos[1],
            "text": n[1].layout.text,
            "width": n[1].layout.size[0],
            "height": n[1].layout.size[1],
            "r": n[1].layout.color[0],
            "g": n[1].layout.color[1],
            "b": n[1].layout.color[2],
            "a": n[1].layout.color[3],
            "border_width": n[1].layout.border_width
        })
        nodeYpos.push(n[1].layout.pos[1])
    })
    props.edges.forEach(function (source) {
        source[1].forEach(function (dest) {
            edgeData.push({
                "source": source[0],
                "destination": dest
            })
        })
    })


    //function inverts y positions of nodes so that graph is facing
    //the right way up
    function invertYPos(positions) {
        const max = positions.reduce(function(a, b) {
            return Math.max(a, b);
        }, -Infinity);
        const min = positions.reduce(function(a, b) {
            return Math.min(a, b);
        }, Infinity);
        const mid = (max+min)/2;

        const temp = positions.map((pos) => {
            return (pos - (2*(pos-mid)));
        })
        return temp;
    }
    
    //set each y pos to new inverted y pos
    const invertedYPos = invertYPos(nodeYpos);
    nodeData.forEach((node, index) => {
        node.ypos = invertedYPos[index];
    })

    //function that turns JSON rgba values to CSS string colors
    function rgb(r, g, b) {
        const red = r * 255;
        const green = g * 255;
        const blue = b * 255;
        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    //add components to graph
    const elems = [];
    nodeData.forEach(function (node) {
        elems.push({
            group: 'nodes',
            data: {
                id: node.name,
                label: node.text,

            },
            position: {
                x: node.xpos,
                y: node.ypos
            },
            style: {
                'width': node.width,
                'height': node.height,
                'background-color': rgb(node.r, node.g, node.b),
                'border-color': 'black',
                'border-style': 'solid',
                'border-width': node.border_width,
                "text-valign": "center",
                "text-halign": "center",
                "font-size": "10px"

            }
        });
    })

    edgeData.forEach(function (edge, index) {
        elems.push({
            group: 'edges',
            data: {
                id: index,
                source: edge.source,
                target: edge.destination
            }
        })
    })




    //CytoScape settings
    const layout = { name: "preset" };
    const minZoom = 0.5;
    const maxZoom = 8;
    const zoomInitial = 2;
    return (
        // <div id='cy'></div>
        <div>
            <CytoscapeComponent
                elements={elems}
                style={{ 
                        width: '100%', 
                        height: '100%',
                        position: "absolute",
                        right: '0',
                        left: '0'
                }}
                stylesheet={[
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#69e',
                            'label': 'data(label)',
                            'shape': 'rectangle'
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
                ]}
                layout={layout}
                //zoom settings
                minZoom = {minZoom}
                maxZoom = {maxZoom}
                zoom = {zoomInitial}
                zoomingEnabled = {true}
                userZoomingEnabled= {true}
                panningEnabled= {true}
                userPanningEnabled= {true}

            />
        </div>

    )
}

export default CytoNode;