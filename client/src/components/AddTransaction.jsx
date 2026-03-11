import { useState } from "react";

export default function AddTransaction({ addTransaction }) {

const [form,setForm] = useState({
type:"expense",
category:"home",
item:"",
amount:""
});

function handleChange(e){
setForm({...form,[e.target.name]:e.target.value});
}

function handleSubmit(e){
e.preventDefault();
addTransaction(form);
setForm({type:"expense",category:"home",item:"",amount:""});
}

return (

<div className="bg-white p-4 rounded-xl shadow m-4">

<h2 className="font-semibold mb-3">Add Transaction</h2>

<form onSubmit={handleSubmit} className="space-y-3">

<select name="type" onChange={handleChange}
className="w-full border p-2 rounded">

<option value="expense">Expense</option>
<option value="income">Income</option>

</select>

<select name="category" onChange={handleChange}
className="w-full border p-2 rounded">

<option value="home">Home</option>
<option value="vehicle">Vehicle</option>
<option value="other">Other</option>

</select>

<input
name="item"
placeholder="Item name"
onChange={handleChange}
value={form.item}
className="w-full border p-2 rounded"
/>

<input
type="number"
name="amount"
placeholder="Amount"
onChange={handleChange}
value={form.amount}
className="w-full border p-2 rounded"
/>

<button
className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
>
Add Transaction
</button>

</form>

</div>

);

}