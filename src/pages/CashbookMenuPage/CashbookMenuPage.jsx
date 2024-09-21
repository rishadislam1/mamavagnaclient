import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";

const CashbookMenuPage = () => {
  const userName = JSON.parse(sessionStorage.getItem("user"));
  const entryBy = userName?.data?.name;
 
  const [rows, setRows] = useState([
    {
      particularsCashIn: "",
      voucherCashIn: "",
      amountCashIn: "",
      particularsCashOut: "",
      voucherCashOut: "",
      amountCashOut: "",
    },
  ]);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState(formatDate(Date.now()))

  // Function to handle adding a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        particularsCashIn: "",
        voucherCashIn: "",
        amountCashIn: "",
        particularsCashOut: "",
        voucherCashOut: "",
        amountCashOut: "",
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
    // Create a single object with all the data
    const formData = {
      rows,
      date,
      entryBy,
    };

    e.target.reset();
    try {
      let url = BASE_URL + "cashbookentry.php";
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
        text: "Cash Added Successfully!",
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
        Add Daily Cash
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="date"
            id="floating_carDescription"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={date}
            onChange={(e)=>setDate(e.target.value)}
            required
          />
          <label
            htmlFor="floating_carDescription"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date*
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
            <div key={index}>
              {/* Cash In */}
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* particularsCashIn */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="particularsCashIn"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.particularsCashIn}
                    onChange={(e) =>
                      handleChange(index, "particularsCashIn", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Particulars CashIn
                  </label>
                </div>

                {/* Voucher Cash IN */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="voucherCashIn"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.voucherCashIn}
                    onChange={(e) =>
                      handleChange(index, "voucherCashIn", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Voucher CashIn
                  </label>
                </div>

                {/* Amount Cash IN */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="amountCashIn"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.amountCashIn}
                    onChange={(e) =>
                      handleChange(index, "amountCashIn", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Amount CashIn
                  </label>
                </div>
              </div>

              {/* Cash Out */}

              <div className="flex flex-col md:flex-row md:items-center gap-5">
                {/* particularsCashOut */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="particularsCashOut"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.particularsCashOut}
                    onChange={(e) =>
                      handleChange(index, "particularsCashOut", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Particulars CashOut
                  </label>
                </div>

                {/* Voucher Cash IN */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="voucherCashOut"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.voucherCashOut}
                    onChange={(e) =>
                      handleChange(index, "voucherCashOut", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Voucher CashOut
                  </label>
                </div>

                {/* Amount Cash IN */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="amountCashOut"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.amountCashOut}
                    onChange={(e) =>
                      handleChange(index, "amountCashOut", e.target.value)
                    }
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Amount CashOut
                  </label>
                </div>
              </div>
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

export default CashbookMenuPage;
