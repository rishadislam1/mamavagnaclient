import { useEffect, useState } from "react";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const BuyerReports = () => {
  const [buyers, setBuyers] = useState([]);
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    let url = BASE_URL + "get-buyer-data.php";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      // You can pass any data if required
      // body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setBuyers(data);
        setFilteredBuyers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter buyers based on searchQuery
    const filteredData =
      buyers.length > 0 &&
      buyers?.filter((buyer) => {
        // Convert searchQuery to lowercase for case-insensitive search
        const query = searchQuery.toLowerCase();

        // Check if any field in the buyer object contains the query
        return (
          buyer?.monthName?.toLowerCase().includes(query) ||
          buyer?.buyerName?.toLowerCase().includes(query) ||
          buyer?.address?.toLowerCase().includes(query) ||
          buyer?.phoneNumber?.toLowerCase().includes(query) ||
          buyer?.pdf?.toLowerCase().includes(query) ||
          buyer?.carName?.toLowerCase().includes(query) ||
          buyer?.showRoom?.toLowerCase().includes(query) ||
          buyer?.carCondition?.toLowerCase().includes(query) ||
          buyer?.bySale?.toLowerCase().includes(query) ||
          buyer?.model?.toLowerCase().includes(query) ||
          buyer?.registration?.toLowerCase().includes(query) ||
          buyer?.color?.toLowerCase().includes(query) ||
          buyer?.buyPrice?.toLowerCase().includes(query) ||
          buyer?.salePrice?.toLowerCase().includes(query) ||
          buyer?.cost?.toLowerCase().includes(query) ||
          buyer?.profit?.toLowerCase().includes(query) ||
          buyer?.investor?.toLowerCase().includes(query) ||
          buyer?.buyDate?.toLowerCase().includes(query) ||
          buyer?.bookingDate?.toLowerCase().includes(query) ||
          buyer?.deliveryDate?.toLowerCase().includes(query) ||
          buyer?.registrationNumber?.toLowerCase().includes(query) ||
          buyer?.loanOrCash?.toLowerCase().includes(query) ||
          buyer?.bankName?.toLowerCase().includes(query) ||
          buyer?.importer?.toLowerCase().includes(query) ||
          buyer?.profitShare?.toLowerCase().includes(query) ||
          buyer?.officeIncome?.toLowerCase().includes(query) ||
          buyer?.remarks?.toLowerCase().includes(query) ||
          buyer?.entryBy?.toLowerCase().includes(query) ||
          buyer?.chasingNumber?.toLowerCase().includes(query)
        );
      });
    setFilteredBuyers(filteredData);
  }, [searchQuery, buyers]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
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
        let url = BASE_URL + "delete-buyer.php";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((response) => response.text())
          .then(() => {
            // Assuming the deletion is successful, update state
            // Filter out the deleted buyer from the current state
            const updatedBuyers = buyers.filter((buyer) => buyer.id !== id);
            setBuyers(updatedBuyers);
            setFilteredBuyers(updatedBuyers); // Optionally update filteredBuyers too

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

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-lg w-full"
          placeholder="Search Here"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SL
              </th>
              <th scope="col" className="px-6 py-3">
                Month
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                PDF
              </th>
              <th scope="col" className="px-6 py-3">
                Car Name
              </th>
              <th scope="col" className="px-6 py-3">
                New / Old ShowRoom
              </th>

              <th scope="col" className="px-6 py-3">
                Recondition / Used
              </th>
              <th scope="col" className="px-6 py-3">
                By Sale
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Registration
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Buy Price
              </th>
              <th scope="col" className="px-6 py-3">
                Sale Price
              </th>
              <th scope="col" className="px-6 py-3">
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                Profit
              </th>
              <th scope="col" className="px-6 py-3">
                Investor %
              </th>
              <th scope="col" className="px-6 py-3">
                Buy Date
              </th>
              <th scope="col" className="px-6 py-3">
                Selling Date
              </th>
              <th scope="col" className="px-6 py-3">
                Deliv. Date
              </th>
              <th scope="col" className="px-6 py-3">
                Reg. Number
              </th>
              <th scope="col" className="px-6 py-3">
                Loan / Cash
              </th>
              <th scope="col" className="px-6 py-3">
                Bank Name, Branch & PH N0
              </th>
              <th scope="col" className="px-6 py-3">
                From Importer / Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Profit Share
              </th>
              <th scope="col" className="px-6 py-3">
                Office Income
              </th>
              <th scope="col" className="px-6 py-3">
                Remarks
              </th>
              <th scope="col" className="px-6 py-3">
                Entry By
              </th>
              <th scope="col" className="px-6 py-3">
                Commission
              </th>
              <th scope="col" className="px-6 py-3">
                Commission Name
              </th>
              <th scope="col" className="px-6 py-3">
                Net Office Income
              </th>
              <th scope="col" className="px-6 py-3">
                Chassis Number
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.length > 0 &&
              filteredBuyers?.map((buyer, index) => (
                <tr
                  key={buyer.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{buyer.monthName}</td>
                  <td className="px-6 py-4">{buyer.buyerName}</td>
                  <td className="px-6 py-4">{buyer.address}</td>
                  <td className="px-6 py-4">{buyer.phoneNumber}</td>
                  {/* <td className="px-6 py-4">
                  <object
                    className="pdf"
                    data={`${BASE_URL}/uploaded_files/${buyer.pdf}`}
                    width="100"
                    height="80"
                  ></object>
                  
                </td> */}
                  <td className="px-6 py-4"><Link to={`/user/pdf/${buyer.pdf}`} className="underline text-blue-600 font-bold">{buyer.pdf}</Link></td>
                  <td className="px-6 py-4">{buyer.carName}</td>
                  <td className="px-6 py-4">{buyer.showRoom}</td>
                  <td className="px-6 py-4">{buyer.carCondition}</td>
                  <td className="px-6 py-4">{buyer.bySale}</td>
                  <td className="px-6 py-4">{buyer.model}</td>
                  <td className="px-6 py-4">{buyer.registration}</td>
                  <td className="px-6 py-4">{buyer.color}</td>
                  <td className="px-6 py-4">{buyer.buyPrice}</td>
                  <td className="px-6 py-4">{buyer.salePrice}</td>
                  <td className="px-6 py-4">{buyer.cost}</td>
                  <td className="px-6 py-4">{buyer.profit}</td>
                  <td className="px-6 py-4">{buyer.investor}</td>
                  <td className="px-6 py-4">{buyer.buyDate}</td>
                  <td className="px-6 py-4">{buyer.bookingDate}</td>
                  <td className="px-6 py-4">{buyer.deliveryDate}</td>
                  <td className="px-6 py-4">{buyer.registrationNumber}</td>
                  <td className="px-6 py-4">{buyer.loanOrCash}</td>
                  <td className="px-6 py-4">{buyer.bankName}</td>
                  <td className="px-6 py-4">{buyer.importer}</td>
                  <td className="px-6 py-4">
                    {buyer?.shares?.length > 0 ? <div>{buyer.shares.map((share)=>
                      <div key={share.id}><b>Name:</b> {share.name}, <b>Shareable Amount:</b> {share.percentage} tk <br/>---------</div>
                    )}</div> : "No Profit Share"}
                  </td>
                  <td className="px-6 py-4">{buyer.officeIncome}</td>
                  <td className="px-6 py-4">{buyer.remarks}</td>
                  <td className="px-6 py-4">{buyer.entryBy}</td>
                  <td className="px-6 py-4">{buyer.commission}</td>
                  <td className="px-6 py-4">{buyer.commissionName}</td>
                  <td className="px-6 py-4">{buyer.netOfficeIncome}</td>
                  <td className="px-6 py-4">{buyer.chasingNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-5">
                      <Link
                        to={`/user/editBuyer/${buyer.id}`}
                        className="bg-green-400 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded "
                        onClick={() => handleDelete(buyer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerReports;
