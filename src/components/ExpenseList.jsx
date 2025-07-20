function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      {expenses.map((expense) => (
        <div className="expense-item" key={expense.id}>
          <p>
            {expense.description} - ${expense.amount} -{" "}
            {new Date(expense.date).toLocaleDateString()}
          </p>
          <button onClick={() => onDelete(expense.id)}>
            <span className="material-icons">delete</span>
          </button>
        </div>
      ))}
    </div>
  );
}
export default ExpenseList;
