// src/components/ExportButtons.jsx
import { jsPDF } from "jspdf";

function ExportButtons({ expenses }) {
  const handleExportCSV = () => {
    const headers = "Description,Amount,Date\n";
    const rows = expenses
      .map((exp) => `${exp.description},${exp.amount},${new Date(exp.date).toLocaleDateString()}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Expense Report", 20, 20);

    let y = 30;
    expenses.forEach((exp, i) => {
      const text = `${i + 1}. ${exp.description} - $${exp.amount} - ${new Date(exp.date).toLocaleDateString()}`;
      doc.text(text, 20, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("expenses.pdf");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleExportCSV}>Export CSV <span className="material-icons">download</span></button>{" "}
      <button onClick={handleExportPDF}>Export PDF <span className="material-icons">picture_as_pdf</span></button>
    </div>
  );
}

export default ExportButtons;
