import type { QuantumLink } from "../types/quantum";

export const quantumLinks: QuantumLink[]=[

{

source:"1",

target:"2",

distance:50,

fidelity:0.95,

successProbability:0.96,

decoherence:0.02

},

{

source:"2",

target:"4",

distance:60,

fidelity:0.92,

successProbability:0.91,

decoherence:0.03

},

{

source:"1",

target:"3",

distance:75,

fidelity:0.91,

successProbability:0.89,

decoherence:0.04

},

{

source:"3",

target:"4",

distance:65,

fidelity:0.94,

successProbability:0.93,

decoherence:0.02

}

]