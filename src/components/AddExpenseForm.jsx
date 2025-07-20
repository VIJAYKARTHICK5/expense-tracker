import { useState } from "react";

function AddExpenseForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      description,
      amount: parseFloat(amount),
      date: new Date(date), // ✅ real date
    };

    onAdd(newExpense);
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        required
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        required
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
