import { useGraph } from "../context/GraphContext";
interface Props {
   

  source:string;

  destination:string;

  algorithm:string;

  setSource:any;

  setDestination:any;

  setAlgorithm:any;

  findRoute:any;

}

function RoutingPanel({

source,

destination,

algorithm,

setSource,

setDestination,

setAlgorithm,

findRoute

}:Props){
    const { nodes } = useGraph();

return(

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold mb-5">

Routing Configuration

</h2>

<label className="font-medium">

Source

</label>

<select
  className="border rounded p-2 w-full mb-4"
  value={source}
  onChange={(e) => setSource(e.target.value)}
>
  {nodes.map((node: any) => {
    const label = node.data.label
      .replace("👤 ", "")
      .replace("🔁 ", "");

    return (
      <option key={node.id} value={label}>
        {label}
      </option>
    );
  })}
</select>

<label className="font-medium">

Destination

</label>

<select
  className="border rounded p-2 w-full mb-4"
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
>
  {nodes.map((node: any) => {
    const label = node.data.label
      .replace("👤 ", "")
      .replace("🔁 ", "");

    return (
      <option key={node.id} value={label}>
        {label}
      </option>
    );
  })}
</select>

<label className="font-medium">

Algorithm

</label>

<select
className="border rounded p-2 w-full mb-5"
value={algorithm}
onChange={(e)=>setAlgorithm(e.target.value)}
>

<option>Shortest Path</option>

<option>Highest Fidelity</option>

<option>Highest Probability</option>

</select>

<button
onClick={findRoute}
className="bg-blue-600 text-white py-3 w-full rounded-lg"
>

Find Best Route

</button>

</div>

);

}

export default RoutingPanel;