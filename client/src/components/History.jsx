import React from "react";

export default function History({transactions}){

return(

<div className="p-4">

<h1 className="text-xl font-bold mb-3">
History
</h1>

{transactions.map((t,i)=>(

<div key={i}
className="border p-3 rounded mb-2">

<p>{t.item}</p>
<p>₹{t.amount}</p>
<p>{t.category}</p>

</div>

))}

</div>

)

}