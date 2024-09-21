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
     

      // Ensure that 'date' is parsed correctly
      const rowDate = new Date(row.date); // Adjust the field to 'date' since that's the correct field name
      if (isNaN(rowDate.getTime())) {
        console.error(`Invalid date: ${row.date}`);
        return;
      }

      const month = rowDate.getMonth();
      const year = rowDate.getFullYear();
      const monthYearKey = `${year}-${month + 1}`; // Correctly format month (month+1 for human readable)

      if (!groupedData[monthYearKey]) {
        groupedData[monthYearKey] = { rows: [], closingBalance: 0 };
      }


      groupedData[monthYearKey].rows.push(row);
      console.log(row)
      groupedData[monthYearKey].closingBalance = row.closingBalance; // Last closing balance for the month
    });

    setMonthlyData(groupedData);
  };

  return (
    <div className="cashbook-container">
      {Object.keys(monthlyData).map((monthYearKey) => {
        const { rows, closingBalance } = monthlyData[monthYearKey];
        const [year, month] = monthYearKey.split('-').map(Number); // Correctly parse the year and month
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

        return (
          <div key={monthYearKey} className="monthly-table">
            <h2 className="month-title">{`${monthName} ${year}`}</h2>
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
                    <td className="border p-2">{new Date(row.date).toLocaleDateString()}</td> {/* Ensure the date is formatted correctly */}
                    <td className="border p-2">{row.particularsCashIn}</td>
                    <td className="border p-2">{row.voucherCashIn}</td>
                    <td className="border p-2">{row.amountCashIn}</td>
                    <td></td>
                    <td className="border p-2">{row.particularsCashOut}</td>
                    <td className="border p-2">{row.voucherCashOut}</td>
                    <td className="border p-2">{row.amountCashOut}</td>
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
