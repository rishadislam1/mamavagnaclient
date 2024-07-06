import { useEffect, useState } from "react";
import { BASE_URL } from "../../../public/config";

const LedgerReports = () => {
  const [ledgerEntries, setLedgerEntries] = useState([]);

  useEffect(() => {
    let url = BASE_URL + "get-ledger.php";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLedgerEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate totals for debit, credit, and dues
  const groupedEntries = ledgerEntries.map((person) => {
    let totalDebit = 0;
    let totalCredit = 0;
    let totalDues = 0;

    person.entries.forEach((entry) => {
      totalDebit += parseFloat(entry.debit) || 0;
      totalCredit += parseFloat(entry.credit) || 0;
    });

    totalDues = totalDebit - totalCredit;

    return {
      name: person.name,
      entries: person.entries,
      totalDebit: totalDebit.toFixed(2),
      totalCredit: totalCredit.toFixed(2),
      totalDues: totalDues.toFixed(2),
    };
  });

  return (
    <div className="mt-10">
      <div>
        {groupedEntries?.map((person, index) => (
          <div key={index} className="ledger-person mt-10 relative overflow-auto">
            <h3 className="text-center border font-bold text-2xl">
              {person.name}
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Car Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Banking Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Debit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Dues
                  </th>
                </tr>
              </thead>
              <tbody>
                {person?.entries?.map((entry, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{entry.ledgerDate}</td>
                    <td className="px-6 py-4">{entry.carDescription || ""}</td>
                    <td className="px-6 py-4">
                      {entry.bankingInformation || ""}
                    </td>
                    <td className="px-6 py-4">{entry.debit || ""}</td>
                    <td className="px-6 py-4">{entry.credit || ""}</td>
                    <td className="px-6 py-4">{entry.dues || ""}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-900">
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 font-bold">Totals:</td>
                  <td className="px-6 py-4 font-bold">{person.totalDebit}</td>
                  <td className="px-6 py-4 font-bold">{person.totalCredit}</td>
                  <td className="px-6 py-4 font-bold">{person.totalDues}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LedgerReports;
