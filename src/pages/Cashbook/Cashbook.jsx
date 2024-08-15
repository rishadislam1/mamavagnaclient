import { useState, useEffect } from "react";
import "./Cashbook.css";
import { BASE_URL } from "../../../public/config";
import { Link } from "react-router-dom";
import { BsXLg } from "react-icons/bs";

const Cashbook = () => {
  const [rows, setRows] = useState([]);
  const [totalamountCashIn, setTotalamountCashIn] = useState(0);
  const [totalamountCashOut, setTotalamountCashOut] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0); // New state for closing balance

  useEffect(() => {
    fetchCurrentMonthData();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [rows]);

  const fetchCurrentMonthData = async () => {
    const response = await fetch(`${BASE_URL}get_cashbook.php`);
    const data = await response.json();
   

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate the previous month and year
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const currentMonthData = data.filter((row) => {
      const rowDate = new Date(row.date);
      
      return (
        rowDate.getMonth() + 1 === currentMonth &&
        rowDate.getFullYear() === currentYear
      );
    });

    // Find the last date's closing balance for the previous month
    const lastClosingBalance = data
      .filter((row) => {
        const rowDate = new Date(row.date);
        return (
          rowDate.getMonth() + 1 === previousMonth &&
          rowDate.getFullYear() === previousYear
        );
      })
      .reduce((acc, row) => row.closingBalance, 0);

    // Set the closing balance to the last date's closing balance of the previous month
    setClosingBalance(Number(lastClosingBalance));

    const initialRows = generateInitialRows();

    // Merge backend data into initial rows
    const mergedRows = initialRows.map((initialRow) => {
      const matchedRow = currentMonthData.find(
        (row) => row.date === initialRow.date //
      );
      
      return matchedRow ? { ...matchedRow, isSaved: false } : initialRow;
    });
  
    setRows(mergedRows);
  };

  function generateInitialRows() {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const rows = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = `${currentYear}-${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

      rows.push({
        date: dayString,
        particularsCashIn: "",
        voucherCashIn: "",
        amountCashIn: "",
        // date: dayString,
        particularsCashOut: "",
        voucherCashOut: "",
        amountCashOut: "",
        isSaved: false,
      });
    }
    return rows;
  }

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
   
  };

  const calculateTotals = () => {
    const total1 = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amountCashIn) || 0),
      0
    );
    const total2 = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amountCashOut) || 0),
      0
    );
    setTotalamountCashIn(total1);
    setTotalamountCashOut(total2);
  };

  const handleSave = (index) => {
    const newRows = [...rows];
    newRows[index].isSaved = true;
    setRows(newRows);

    const grandTotal = totalamountCashOut + closingBalance; // Calculate grand total

    fetch(`${BASE_URL}cashbook.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rows: [newRows[index]],
        closingBalance: grandTotal,
      }), // Send grand total
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else if (data.error) {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const grandTotal = totalamountCashOut + closingBalance; // Calculate grand total for display

  return (
    <div>
      <div className="flex justify-between w-full mt-10 px-14 font-bold text-2xl ">
        <div className="flex justify-between gap-10">
          <p className="underline">Cash IN</p>
          <p>Opening Balance: {closingBalance} tk</p>
        </div>
        <p className="underline">Office Cash Out</p>
      </div>
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
            <th className="border p-2">Amount (Tk.)</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.particularsCashIn}
                  onChange={(e) =>
                    handleInputChange(index, "particularsCashIn", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.voucherCashIn}
                  onChange={(e) =>
                    handleInputChange(index, "voucherCashIn", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.amountCashIn}
                  onChange={(e) =>
                    handleInputChange(index, "amountCashIn", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.particularsCashOut}
                  onChange={(e) =>
                    handleInputChange(index, "particularsCashOut", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.voucherCashOut}
                  onChange={(e) =>
                    handleInputChange(index, "voucherCashOut", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.amountCashOut}
                  onChange={(e) =>
                    handleInputChange(index, "amountCashOut", e.target.value)
                  }
                  className="w-full p-1"
                  disabled={row.isSaved}
                />
              </td>
              <td></td>
              <td className="border p-2">
                <button
                  onClick={() => handleSave(index)}
                  disabled={row.isSaved}
                  className="p-2 bg-blue-500 text-white"
                >
                  {row.isSaved ? "Saved" : "Save"}
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="border p-2 text-right"></td>
            <td className="border p-2"></td>
            <td colSpan="3" className="border p-2 text-right">
              Total:
            </td>
            <td className="border p-2">{totalamountCashOut.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="border p-2 text-right"></td>
            <td className="border p-2"></td>
            <td colSpan="3" className="border p-2 text-right">
              Closing Balance:
            </td>
            <td className="border p-2">{Number(closingBalance).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="border p-2 text-right">
              Total
            </td>
            <td className="border p-2">{totalamountCashIn.toFixed(2)}</td>
            <td colSpan="3" className="border p-2 text-right">
              Grand Total:
            </td>
            <td className="border p-2">{Number(grandTotal).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        <Link
          to="/user/viewalldata"
          className="font-bold mt-10 text-3xl italic underline text-blue-500"
        >
          View All Data
        </Link>
      </div>
    </div>
  );
};

export default Cashbook;
