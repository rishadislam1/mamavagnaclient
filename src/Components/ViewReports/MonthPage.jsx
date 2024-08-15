import { useState } from "react";
import { Link } from "react-router-dom";

const MonthPage = () => {
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
          <Link key={month} to={`/user/month/${month}/${year}`}>
            <li className="months-cell border py-2 shadow-lg rounded-xl text-center">
              {month}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MonthPage;
