import { useEffect, useState } from "react";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { CiLock, CiUnlock } from "react-icons/ci";
import axios from "axios";

const CashbookEdit = () => {
  const userName = JSON.parse(sessionStorage.getItem("user"));
  const entryBy = userName?.data?.name;
  const {date} = useParams();

  const [lock, setLock] = useState(true);

  const [rows, setRows] = useState([]);

//   get the data
useEffect(()=>{
    const fetchCashbookEntries = async (date) => {
        try {
          const response = await axios.get(`${BASE_URL}fetch_cashbook_entries.php`, {
            params: { date }
          });
          setRows(response.data)  // Process the fetched data
        } catch (error) {
          console.error('Error fetching cashbook entries:', error);
        }
      };
      
      // Example usage
      fetchCashbookEntries(date);
},[date])


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
  

   try {
    let url = `${BASE_URL}cashbookUpdate.php`;
    const response = await fetch(url, {
      method: "PUT", // Use PUT method for updating data
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
      text: "Cash Updated Successfully!",
      icon: "success",
    });
    // Optionally reset form fields or handle other UI changes
  } catch (error) {
    Swal.fire({
      title: "Fail!",
      text: "Something went wrong. Try again!",
      icon: "error",
    });
    // Handle error, show user an error message, etc.
  }
  };
  

  return (
    <div>
      <h1 className="text-center underline my-10 font-bold text-3xl">
        Edit Daily Cash
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="dateInput"
            name="date"
            id="floating_carDescription"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={date}
            required
            disabled
          />
          <label
            htmlFor="floating_carDescription"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Date*
          </label>
        </div>
        <div>
            {
                lock?<CiLock className="text-4xl text-red-600 font-bolder  cursor-pointer" title="please click for unlock edit" onClick={()=>setLock(!lock)} />:<CiUnlock className="text-4xl text-red-600 font-bolder  cursor-pointer" title="please click for lock edit" onClick={()=>setLock(!lock)}/>
            }
        </div>
      </div>
    
      <div className="mt-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {rows.map((row, index) => (
            <div key={index}>
              {/* ID In */}
              <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="particularsCashIn"
                    id={`floating_bankingInformation_${index}`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={row.id}
                    onChange={(e) =>
                      handleChange(index, "id", e.target.value)
                    }
                    disabled
                  />
                  <label
                    htmlFor={`floating_bankingInformation_${index}`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    ID
                  </label>
                </div>
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
                    disabled={lock}
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
                    disabled={lock}
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
                    disabled={lock}
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
                    disabled={lock}
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
                    disabled={lock}
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
                    disabled={lock}
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
            className={`focus:outline-none text-white  ${lock?"bg-slate-500":"bg-blue-700"} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 `}
          disabled={lock}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashbookEdit;
