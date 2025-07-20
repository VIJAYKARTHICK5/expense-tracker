// src/components/MonthFilter.jsx

function MonthFilter({ selectedMonth, selectedYear, onChange }) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [2024, 2025, 2026];

  return (
    <div style={{ display: "flex", gap: "10px", margin: "1rem 0" }}>
      <select
        value={selectedMonth}
        onChange={(e) => onChange("month", parseInt(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => onChange("year", parseInt(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthFilter;
