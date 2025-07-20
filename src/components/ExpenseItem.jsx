// src/components/ExpenseItem.jsx

function ExpenseItem({ expense, onDelete }) {
  const formattedDate = new Date(expense.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li
      style={{
        padding: "0.5rem",
        margin: "0.5rem 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div>
        <strong>{expense.description}</strong>
        <div style={{ fontSize: "0.85rem", color: "#666" }}>{formattedDate}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontWeight: "bold" }}>${expense.amount}</span>
        <button
          onClick={() => onDelete(expense.id)}
          style={{
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
