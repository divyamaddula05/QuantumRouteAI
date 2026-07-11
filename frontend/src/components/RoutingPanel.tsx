interface Props{

source:string;
destination:string;

setSource:any;
setDestination:any;

findRoute:any;

}

function RoutingPanel({

source,
destination,

setSource,
setDestination,

findRoute

}:Props){

return(

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold mb-5">

Routing Configuration

</h2>

<label>Source</label>

<select
className="border p-2 w-full mb-4"
value={source}
onChange={(e)=>setSource(e.target.value)}
>

<option>Alice</option>
<option>R1</option>
<option>R2</option>
<option>Bob</option>

</select>

<label>Destination</label>

<select
className="border p-2 w-full mb-5"
value={destination}
onChange={(e)=>setDestination(e.target.value)}
>

<option>Bob</option>
<option>R1</option>
<option>R2</option>
<option>Alice</option>

</select>

<button
onClick={findRoute}
className="bg-blue-600 text-white w-full py-3 rounded"
>

Find Best Route

</button>

</div>

);

}

export default RoutingPanel;