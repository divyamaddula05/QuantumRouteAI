interface Props{

route:any;

}

function RouteResult({route}:Props){

if(!route){

return(

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold">

Best Route

</h2>

<hr className="my-4"/>

<p>No route calculated.</p>

</div>

);

}

return(

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold">

Best Route

</h2>

<hr className="my-4"/>

<p>

<b>Path</b>

</p>

<p>{route.path.join(" → ")}</p>

<br/>

<p>

<b>Distance</b>

</p>

<p>{route.distance} km</p>

<br/>

<p>

<b>Fidelity</b>

</p>

<p>{route.fidelity}</p>

<br/>

<p>

<b>Success Probability</b>

</p>

<p>{(route.probability*100).toFixed(2)}%</p>

</div>

);

}

export default RouteResult;