import { useEffect, useState } from "react";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";

const LedgerReports = () => {
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    let url = BASE_URL + "get-ledger.php";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLedgerEntries(data);
        setFilteredEntries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate totals for debit, credit, and dues
  const groupedEntries = filteredEntries.map((person) => {
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

  const handleDelete = (name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = BASE_URL + "delete_ledger.php";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.text())
          .then(() => {
            const updatedBuyers = groupedEntries.filter(
              (buyer) => buyer.name !== name
            );
            setLedgerEntries(updatedBuyers);
            setFilteredEntries(updatedBuyers);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors
          });
      }
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = ledgerEntries.filter((person) => {
      const combinedFields = [
        person.name,
        ...person.entries.map((entry) =>
          
          [entry.ledgerDate, entry.carDescription, entry.bankingInformation, entry.chassisNumber]
            .filter(Boolean)
            .join(" ")
        ),
      ].join(" ");
      return combinedFields.toLowerCase().includes(query);
    });

    setFilteredEntries(filtered);
  };

  return (
    <div className="mt-10">
      <div className="mb-5">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="Search Here..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div>
        {groupedEntries?.map((person, index) => (
          <div
            key={index}
            className="ledger-person mt-10 relative overflow-auto"
          >
            <button
              className="bg-red-600 px-5 py-2 rounded-xl text-white mb-5"
              onClick={() => handleDelete(person.name)}
            >
              Delete
            </button>
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
                    ChassisNumber
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
                    <td className="px-6 py-4">{entry.chassisNumber || ""}</td>
                    <td className="px-6 py-4">{entry.debit || ""}</td>
                    <td className="px-6 py-4">{entry.credit || ""}</td>
                    <td className="px-6 py-4">{entry.dues || ""}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 dark:bg-gray-900">
                  <td className="px-6 py-4"></td>
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
