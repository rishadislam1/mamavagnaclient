import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";

const LedgerPage = () => {
  const userName = JSON.parse(sessionStorage.getItem("user"));
  const entryBy = userName?.data?.name;
  const [rows, setRows] = useState([
    {
      date: "",
      bankingInformation: "",
      debit: "",
      credit: "",
      debitOrCredit: "debit",
    },
  ]);
  const [name, setName] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");

  // Function to handle adding a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        date: "",
        bankingInformation: "",
        debit: "",
        credit: "",
        debitOrCredit: "debit",
      },
    ]);
  };

  // Function to handle input changes
  const handleChange = (index, field, value) => {
    const newRows = rows.map((row, rowIndex) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter rows with non-empty date and debit/credit values
    const validRows = rows.filter(
      (row) => row.date && (row.debit || row.credit)
    );

    // Create a single object with all the data
    const formData = {
      name,
      rows: validRows,
      carDescription,
      chassisNumber,
      entryBy,
    };
    e.target.reset();

    try {
      let url = BASE_URL + "ledger-input.php";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful submission
      Swal.fire({
        title: "Success!",
        text: "Ledger Added Successfully!",
        icon: "success",
      });
      // Optionally reset form fields or handle other UI changes
    } catch (error) {
      Swal.fire({
        title: "Fail!",
        text: "Something Wrong. Try again!",
        icon: "error",
      });
      // Handle error, show user an error message, etc.
    }
  };

  return (
    <div>
      <h1 className="text-center underline my-10 font-bold text-3xl">
        Add Ledger
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name*
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="carDescription"
            id="floating_carDescription"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setCarDescription(e.target.value)}
            required
          />
          <label
            htmlFor="floating_carDescription"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Car Description*
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="chassisNumber"
            id="floating_carDescription"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setChassisNumber(e.target.value)}
            required
          />
          <label
            htmlFor="floating_carDescription"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Chassis Number*
          </label>
        </div>
      </div>
      <button
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center gap-3"
        onClick={addRow}
      >
        <FaCirclePlus />
        Add Calculation
      </button>
      <div className="mt-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {rows.map((row, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-5"
            >
              {/* Date */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="date"
                  id={`floating_date_${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={row.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                />
                <label
                  htmlFor={`floating_date_${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date
                </label>
              </div>

              {/* Banking Information */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="bankingInformation"
                  id={`floating_bankingInformation_${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={row.bankingInformation}
                  onChange={(e) =>
                    handleChange(index, "bankingInformation", e.target.value)
                  }
                />
                <label
                  htmlFor={`floating_bankingInformation_${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Banking Information
                </label>
              </div>

              <div className="flex gap-3 mb-5 md:mb-0">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`debitorcredit${index}`}
                    id={`debit${index}`}
                    onClick={() =>
                      handleChange(index, "debitOrCredit", "debit")
                    }
                    checked={row.debitOrCredit === "debit"}
                    className="focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={`debit${index}`}>Debit</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`debitorcredit${index}`}
                    id={`credit${index}`}
                    onClick={() =>
                      handleChange(index, "debitOrCredit", "credit")
                    }
                    checked={row.debitOrCredit === "credit"}
                    className="focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={`credit${index}`}>Credit</label>
                </div>
              </div>

              {row.debitOrCredit === "debit" ? (
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="debit"
                    id={`floating_debit_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.debit}
                    onChange={(e) =>
                      handleChange(index, "debit", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_debit_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Debit
                  </label>
                </div>
              ) : row.debitOrCredit === "credit" ? (
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="credit"
                    id={`floating_credit_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.credit}
                    onChange={(e) =>
                      handleChange(index, "credit", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_credit_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Credit
                  </label>
                </div>
              ) : null}
            </div>
          ))}
          <button
            type="submit"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LedgerPage;
