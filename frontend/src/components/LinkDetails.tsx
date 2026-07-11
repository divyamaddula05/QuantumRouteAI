import type { QuantumLink } from "../types/quantum";

interface Props{

link:QuantumLink|null;

}

function LinkDetails({link}:Props){

if(!link){

return(

<div className="bg-white rounded-lg shadow p-5">

<h2 className="text-xl font-bold">

Select a Link

</h2>

</div>

)

}

return(

<div className="bg-white rounded-lg shadow p-5">

<h2 className="text-xl font-bold">

Quantum Link

</h2>

<hr className="my-4"/>

<p>

<b>Source :</b> {link.source}

</p>

<p>

<b>Destination :</b> {link.target}

</p>

<p>

<b>Distance :</b> {link.distance} km

</p>

<p>

<b>Fidelity :</b> {link.fidelity}

</p>

<p>

<b>Success :</b> {link.successProbability}

</p>

<p>

<b>Decoherence :</b> {link.decoherence}

</p>

</div>

)

}

export default LinkDetails;