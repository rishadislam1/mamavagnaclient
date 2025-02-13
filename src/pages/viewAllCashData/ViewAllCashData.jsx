import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../public/config";

const ViewAllCashData = () => {
  const { month, year } = useParams(); // Get month and year from URL
  const [rows, setRows] = useState([]);
  const [totalamountCashIn, setTotalamountCashIn] = useState(0);
  const [totalamountCashOut, setTotalamountCashOut] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);

  const monthNames = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  const convertToDate = (dateStr) => {
    const monthNameFormat = /^\d{4}-[a-zA-Z]+-\d{2}$/;
    if (monthNameFormat.test(dateStr)) {
      const [year, monthName, day] = dateStr.split("-");
      const monthNames = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12"
      };
      const month = monthNames[monthName];
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  };

  useEffect(() => {
    fetchCurrentMonthData();
  }, [month, year]);

  useEffect(() => {
    calculateTotals();
  }, [rows]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}getAllCashbook.php`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        let previousMonth = new Date(`${year}-${month}-01`).getMonth();
        if (previousMonth === 0) {
          previousMonth = 12; // December of the previous year
        } else {
          previousMonth--;
        }


        const pathSegments = window.location.pathname.split('/');
        const currentMonthName = pathSegments[pathSegments.length - 2]; // 'December'
        const currentYear = parseInt(pathSegments[pathSegments.length - 1]); // 2024

// Convert month name to month index (0-based)
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const currentMonthIndex = monthNames.indexOf(currentMonthName);

// Calculate previous month and year
        const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
        const previousMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;

// Filter data for the previous month
        const previousMonthData = data.filter(item => {
          const itemDate = new Date(item.date1);
          return itemDate.getMonth() === previousMonthIndex && itemDate.getFullYear() === previousMonthYear;
        });
        // const previousMonthData = data.filter(item => {
        //   const itemDate = new Date(item.date1);
        //   return itemDate.getMonth() === previousMonth && itemDate.getFullYear() === parseInt(year);
        // });

        if (previousMonthData.length > 0) {
          previousMonthData.sort((a, b) => new Date(b.date1) - new Date(a.date1));
          const lastClosingBalance = previousMonthData[0].closingBalance;
          setClosingBalance(Number(lastClosingBalance));
        } else {
          console.log("No data found for the previous month.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [month, year]);

  const fetchCurrentMonthData = async () => {
    const response = await fetch(`${BASE_URL}get_cashbook.php`);
    const data = await response.json();
    const currentMonthData = data.filter((row) => {
      const rowDate = new Date(row.date);
      return rowDate.getMonth() + 1 === monthNames[month] && rowDate.getFullYear() === parseInt(year);
    });

    const initialRows = generateInitialRows();

    const groupedData = currentMonthData.reduce((acc, row) => {
      const rowDate = row.date;
      if (!acc[rowDate]) {
        acc[rowDate] = { ...row, amountCashIn: 0, amountCashOut: 0 };
      }
      acc[rowDate].amountCashIn += Number(row.amountCashIn);
      acc[rowDate].amountCashOut += Number(row.amountCashOut);
      return acc;
    }, {});

    const groupedDataArray = Object.values(groupedData);

    const mergedRows = initialRows.map((initialRow) => {
      const matchedRow = groupedDataArray.find(
          (row) => convertToDate(row.date) === convertToDate(initialRow.date)
      );
      return matchedRow ? { ...matchedRow, isSaved: false } : initialRow;
    });

    setRows(mergedRows);
  };

  function generateInitialRows() {
    const daysInMonth = new Date(parseInt(year), monthNames[month], 0).getDate();

    const rows = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = `${year}-${month.padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      rows.push({
        date: dayString,
        particularsCashIn: "",
        voucherCashIn: "",
        amountCashIn: "",
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
  const grandTotal = (Number(totalamountCashIn.toFixed(2)) + Number(closingBalance)) - Number(totalamountCashOut);


  const saveDataToServer = () => {
    const filteredRows = rows.filter(row => row.date === new Date().toISOString().slice(0, 10));

    if (filteredRows.length === 0) {
      // Find the last date with data (where amountCashIn and amountCashOut are not empty)
      const lastDateWithData = rows
          .filter(row => row.amountCashIn !== "" && row.amountCashOut !== "")
          .reduce((latestDate, row) => {
            return new Date(row.date) > new Date(latestDate) ? row.date : latestDate;
          }, rows[0].date); // Initial date in case there's no matching data

      fetch(`${BASE_URL}cashbook.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rows: [],
          closingBalance: grandTotal,
          lastDateOfMonth: lastDateWithData,  // Use the last date with data
        }),
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
              });
            } else {
              console.error(data.error);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    } else {
      // Send normal data to server
      fetch(`${BASE_URL}cashbook.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rows: rows.filter(row => row.date === new Date().toISOString().slice(0, 10)),
          closingBalance: grandTotal,
        }),
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.message) {
              Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
              });
            } else {
              console.error(data.error);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }
  };




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
                  handleInputChange(
                    index,
                    "particularsCashIn",
                    e.target.value
                  )
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
                  handleInputChange(
                    index,
                    "particularsCashOut",
                    e.target.value
                  )
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
            <td className="border p-2">
              <Link to={`/user/viewCash/${row.date}`} className="bg-blue-600 px-5 py-2 rounded-xl text-white">Edit</Link>
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
          <td colSpan="3" className="border p-2 text-right">
            Total
          </td>
          <td className="border p-2">{(Number(totalamountCashIn)+closingBalance).toFixed(2)}</td>
          <td colSpan="3" className="border p-2 text-right">
            Closing Balance:
          </td>
          <td className="border p-2">{grandTotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
      <div className="w-full flex justify-center items-center mt-4">
        <Link to="/user/viewalldata" className="rounded-lg text-white bg-blue-500 px-4 py-2 mx-2">
          view All Data
        </Link>
        <button
            className="rounded-lg text-white bg-blue-500 px-4 py-2 mx-2"
            onClick={saveDataToServer}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewAllCashData;
