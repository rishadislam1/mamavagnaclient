import { useState, useEffect } from 'react';
import './Cashbook.css'; // Ensure this file has appropriate styles
import { BASE_URL } from '../../../public/config';

const ViewAllData = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    const response = await fetch(`${BASE_URL}get_cashbook.php`);
    const data = await response.json();

    // Group data by month and year
    const groupedData = {};
    data.forEach((row) => {
      const rowDate = new Date(row.date1);
      const month = rowDate.getMonth();
      const year = rowDate.getFullYear();
      const monthYearKey = `${year}-${month}`;

      if (!groupedData[monthYearKey]) {
        groupedData[monthYearKey] = { rows: [], closingBalance: 0 };
      }

      groupedData[monthYearKey].rows.push(row);
      groupedData[monthYearKey].closingBalance = row.closingBalance; // Last closing balance for the month
    });

    setMonthlyData(groupedData);
  };

  return (
    <div className="cashbook-container">
      {Object.keys(monthlyData).map((monthYearKey) => {
        const { rows, closingBalance } = monthlyData[monthYearKey];
        const month = new Date(monthYearKey.split('-')[0], monthYearKey.split('-')[1]).toLocaleString('default', { month: 'long' });
        const year = monthYearKey.split('-')[0];

        return (
          <div key={monthYearKey} className="monthly-table">
            <h2 className="month-title">{`${month} ${year}`}</h2>
            <table className="min-w-full border-collapse border table-container">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Particulars</th>
                  <th className="border p-2">Voucher#</th>
                  <th className="border p-2">Amount (Tk.)</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Particulars</th>
                  <th className="border p-2">Voucher#</th>
                  <th className="border p-2">Amount (Tk.)</th>
                  <th className="border p-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">{row.date1}</td>
                    <td className="border p-2">{row.particulars1}</td>
                    <td className="border p-2">{row.voucher1}</td>
                    <td className="border p-2">{row.amount1}</td>
                    <td className="border p-2">{row.date2}</td>
                    <td className="border p-2">{row.particulars2}</td>
                    <td className="border p-2">{row.voucher2}</td>
                    <td className="border p-2">{row.amount2}</td>
                  </tr>
                ))}
                {/* Add a new row for the closing balance */}
                <tr>
                  <td colSpan="8" className="border p-2 font-bold text-right">Closing Balance:</td>
                  <td className="border p-2 font-bold">{Number(closingBalance).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAllData;
