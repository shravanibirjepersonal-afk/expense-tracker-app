export default function Dashboard({ income, expense }) {

const balance = income - expense;

return (

<div className="grid grid-cols-3 gap-3 p-4">

<div className="bg-green-500 text-white rounded-xl p-3 shadow">
<p className="text-sm">Income</p>
<h2 className="text-lg font-bold">₹{income}</h2>
</div>

<div className="bg-red-500 text-white rounded-xl p-3 shadow">
<p className="text-sm">Expense</p>
<h2 className="text-lg font-bold">₹{expense}</h2>
</div>

<div className="bg-blue-500 text-white rounded-xl p-3 shadow">
<p className="text-sm">Balance</p>
<h2 className="text-lg font-bold">₹{balance}</h2>
</div>

</div>

);
}