import { useState } from "react";
import { Link } from "react-router-dom";

const ViewAllData = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const startYear = 2015;
const endYear = 2100;
const currentYear = new Date().getFullYear();

const years = [
  ...Array.from(new Array(endYear - startYear + 1), (val, index) => startYear + index), // 2015 to 2100
];

  const [year, setYear] = useState(currentYear);
  return (
    <div>
        <div className="months-container">
      <h1 className="font-bold underline text-2xl mb-5 text-center">
        Select Month for show monthly view report
      </h1>
      <div className="flex justify-center items-center gap-3">
      <label>Select Year:</label>
    <select
      className="rounded-xl"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      {years.map((yr) => (
        <option key={yr} value={yr}>
          {yr}
        </option>
      ))}
    </select>
      </div>
      <ul className="months-table grid grid-cols-3 my-10 gap-5">
        {months.map((month) => (
          <Link key={month} to={`/user/cashdata/${month}/${year}`}>
            <li className="months-cell border py-2 shadow-lg rounded-xl text-center">
              {month}
            </li>
          </Link>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ViewAllData;

// import { useState, useEffect } from 'react';
// import './Cashbook.css'; // Ensure this file has appropriate styles
// import { BASE_URL } from '../../../public/config';

// const ViewAllData = () => {
//   const [monthlyData, setMonthlyData] = useState([]);

//   useEffect(() => {
//     fetchMonthlyData();
//   }, []);

//   const fetchMonthlyData = async () => {
//     const response = await fetch(`${BASE_URL}get_cashbook.php`);
//     const data = await response.json();

//     // Group data by month and year
//     const groupedData = {};
//     data.forEach((row) => {
     
//       // Ensure that 'date' is parsed correctly
//       const rowDate = new Date(row.date); // Adjust the field to 'date' since that's the correct field name
//       if (isNaN(rowDate.getTime())) {
//         console.error(`Invalid date: ${row.date}`);
//         return;
//       }

//       const month = rowDate.getMonth();
//       const year = rowDate.getFullYear();
//       const monthYearKey = `${year}-${month + 1}`; // Correctly format month (month+1 for human readable)

//       if (!groupedData[monthYearKey]) {
//         groupedData[monthYearKey] = { rows: [], closingBalance: 0 };
//       }


//       groupedData[monthYearKey].rows.push(row);
//       console.log(row)
//       groupedData[monthYearKey].closingBalance = row.closingBalance; // Last closing balance for the month
//     });

//     setMonthlyData(groupedData);
//   };

//   return (
//     <div className="cashbook-container">
//       {Object.keys(monthlyData).map((monthYearKey) => {
//         const { rows, closingBalance } = monthlyData[monthYearKey];
//         const [year, month] = monthYearKey.split('-').map(Number); // Correctly parse the year and month
//         const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

//         return (
//           <div key={monthYearKey} className="monthly-table">
//             <h2 className="month-title font-bold text-2xl">{`${monthName} ${year}`}</h2>
//             <table className="min-w-full border-collapse border table-container">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Date</th>
//                   <th className="border p-2">Particulars</th>
//                   <th className="border p-2">Voucher#</th>
//                   <th className="border p-2">Amount (Tk.)</th>
//                   <th className="border p-2">Date</th>
//                   <th className="border p-2">Particulars</th>
//                   <th className="border p-2">Voucher#</th>
//                   <th className="border p-2">Amount (Tk.)</th>
//                   <th className="border p-2">Closing Balance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, index) => (
//                   <tr key={index}>
//                     <td className="border p-2">{new Date(row.date).toLocaleDateString()}</td> {/* Ensure the date is formatted correctly */}
//                     <td className="border p-2">{row.particularsCashIn}</td>
//                     <td className="border p-2">{row.voucherCashIn}</td>
//                     <td className="border p-2">{row.amountCashIn}</td>
//                     <td></td>
//                     <td className="border p-2">{row.particularsCashOut}</td>
//                     <td className="border p-2">{row.voucherCashOut}</td>
//                     <td className="border p-2">{row.amountCashOut}</td>
//                   </tr>
//                 ))}
//                 {/* Add a new row for the closing balance */}
//                 <tr>
//                   <td colSpan="8" className="border p-2 font-bold text-right">Closing Balance:</td>
//                   <td className="border p-2 font-bold">{Number(closingBalance).toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ViewAllData;
