export default function TransactionList({ transactions }) {

return (

<div className="p-4">

<h2 className="font-semibold mb-2">Recent Transactions</h2>

<div className="space-y-2">

{transactions.map((t,i)=>(

<div key={i}
className="flex justify-between bg-white p-3 rounded shadow">

<div>
<p className="font-medium">{t.item}</p>
<p className="text-xs text-gray-500">{t.category}</p>
</div>

<p className={
t.type === "income"
? "text-green-600 font-bold"
: "text-red-600 font-bold"
}>
₹{t.amount}
</p>

</div>

))}

</div>

</div>

);
}