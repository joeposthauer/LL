import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import { nodeModuleNameResolver } from "typescript";


function Submit(props) {
    const { register, handleSubmit } = useForm()
    const [data, setData] = useState({
        nodes: [],
        edges: []
    })


    const onSubmit = (d) => {

        //Receive user file, then make into JSON string
        const file = d.userFile[0]
        const reader = new FileReader();
        reader.onload = function () {

            const readFile = reader.result;
            const parsedFile = JSON.parse(readFile);


            //Create nodes and edge arrays for node creation with cyto

            const nodesJson = parsedFile.display.nodes;
            const edgesJson = parsedFile.display.edges[0].connect;
            Object.entries(nodesJson).forEach((entry) => {
                data.nodes.push(entry);
            })
            Object.entries(edgesJson).forEach((entry) => {
                data.edges.push(entry);
            })

            props.onAdd(data);

        }
        reader.readAsText(file);

    }

    return (
        //form for inputting JSON file
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="file-btn" {...register("userFile")} type="file" />
                <button className="submit-btn">Submit</button>
            </form>
            <hr></hr>
        </div>

    )

}

export default Submit;