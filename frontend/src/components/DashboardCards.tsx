interface Props {

  nodes:number;

  links:number;

  fidelity:number;

  success:number;

}

function DashboardCards({

  nodes,

  links,

  fidelity,

  success,

}:Props){

  const cards=[

    {
      title:"Nodes",
      value:nodes,
    },

    {
      title:"Links",
      value:links,
    },

    {
      title:"Avg Fidelity",
      value:fidelity.toFixed(2),
    },

    {
      title:"Success %",
      value:success.toFixed(1)+"%",
    },

  ];

  return(

    <div className="grid grid-cols-4 gap-5">

      {cards.map((card)=>(

        <div
        key={card.title}
        className="bg-white rounded-xl shadow p-5">

          <p className="text-gray-500">

            {card.title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {card.value}

          </h2>

        </div>

      ))}

    </div>

  );

}

export default DashboardCards;