import { useEffect, useState } from "react";
import "./EditBuyer.css";
import axios from "axios";
import { BASE_URL } from "../../../public/config";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { GetBuyerListWithId } from "../../apiRequest/GetBuyerListWithId";

const EditBuyer = () => {
  const { id } = useParams();
  const [buyerData, setBuyerData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const data = await GetBuyerListWithId(id);
      setBuyerData(data.data);
    };
    getData();
  }, [id]);

  const userName = JSON.parse(sessionStorage.getItem("user"));
  const entryBy = userName?.data?.name;

  const [buyerName, setBuyerName] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [carName, setCarName] = useState("");
  const [showRoom, setShowRoom] = useState("");
  const [sale, setSale] = useState("");
  const [condition, setCondition] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [color, setColor] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState(0);
  const [investor, setInvestor] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [importer, setImporter] = useState("");
  const [remarks, setRemarks] = useState("");
  const [bankName, setBankName] = useState("");
  const [loan, setLoan] = useState("");
  const [file, setFile] = useState(null);

  const [profitShareCount, setProfitShareCount] = useState(0);
  const [shares, setShares] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [officeIncome, setOfficeIncome] = useState(0);
  const [commission, setCommission] = useState(0);
  const [commissionName, setCommissionName] = useState("");

  useEffect(() => {
    setBuyerName(buyerData.buyerName);
    setBuyerAddress(buyerData.address);
    setPhoneNumber(buyerData.phoneNumber);
    setCarName(buyerData.carName);
    setShowRoom(buyerData.showRoom);
    setSale(buyerData.bySale);
    setCondition(buyerData.condition);
    setModel(buyerData.model);
    setRegistration(buyerData.registration);
    setColor(buyerData.color);
    setBuyPrice(buyerData.buyPrice);
    setSalePrice(buyerData.salePrice);
    setCost(buyerData.cost);
    setProfit(buyerData.profit);
    setInvestor(buyerData.investor);
    setBuyDate(buyerData.buyDate);
    setBookingDate(buyerData.bookingDate);
    setDeliveryDate(buyerData.deliveryDate);
    setRegistrationNumber(buyerData.registrationNumber);
    setImporter(buyerData.importer);
    setRemarks(buyerData.remarks);
    setBankName(buyerData.bankName);
    setLoan(buyerData.loan);
    setOfficeIncome(buyerData.officeIncome);
    setCommission(buyerData.commission);
    setCommissionName(buyerData.commissionName);
    // Assuming `sharesbuyerData is an array of objects with keys name and percentage
    setShares(buyerData.shares || []);
  }, [
    buyerData.address,
    buyerData.bankName,
    buyerData.bookingDate,
    buyerData.buyDate,
    buyerData.buyPrice,
    buyerData.buyerAddress,
    buyerData.buyerName,
    buyerData.carName,
    buyerData.color,
    buyerData.commission,
    buyerData.commissionName,
    buyerData.condition,
    buyerData.cost,
    buyerData.deliveryDate,
    buyerData.importer,
    buyerData.investor,
    buyerData.loan,
    buyerData.model,
    buyerData.officeIncome,
    buyerData.phoneNumber,
    buyerData.profit,
    buyerData.registration,
    buyerData.registrationNumber,
    buyerData.remarks,
    buyerData.sale,
    buyerData.salePrice,
    buyerData.shares,
    buyerData.showRoom,
  ]);

  useEffect(() => {
    calculateTotalPercentage();
  }, [shares]);

  useEffect(() => {
    calculateOfficeIncome();
  }, [totalPercentage, profit]);

  const calculateTotalPercentage = () => {
    const total = shares.reduce(
      (sum, share) => sum + parseFloat(share.percentage || 0),
      0
    );
    setTotalPercentage(total);
  };

  const calculateOfficeIncome = () => {
    const income = Number(profit) - (Number(profit) * totalPercentage) / 100;
    setOfficeIncome(income);
  };

  const handleProfitShareChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setProfitShareCount(count);

    const newShares = Array.from({ length: count }, (_, i) => ({
      name: shares[i]?.name || "",
      percentage: shares[i]?.percentage || "",
    }));

    setShares(newShares);
  };

  const handleShareChange = (index, field, value) => {
    const newShares = [...shares];
    newShares[index][field] = value;
    setShares(newShares);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const profitSum = Number(salePrice) - (Number(cost) + Number(buyPrice));

  useEffect(() => {
    setProfit(profitSum);
  }, [profitSum]);

  const netOfficeIncome = Number(officeIncome) + Number(commission);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('file', file);
    const data = {
      buyerName: buyerName,
      buyerAddress: buyerAddress,
      phoneNumber: phoneNumber,
      carName: carName,
      showRoom: showRoom,
      sale: sale,
      condition: condition,
      model: model,
      registration: registration,
      color: color,
      buyPrice: buyPrice,
      salePrice: salePrice,
      cost: cost,
      profit: profitSum,
      investor: investor,
      buyDate: buyDate,
      bookingDate: bookingDate,
      deliveryDate: deliveryDate,
      registrationNumber: registrationNumber,
      importer: importer,
      officeIncome: officeIncome,
      remarks: remarks,
      bankName: bankName,
      loan: loan,
      file: file,
      shares: shares,
      entryBy: entryBy,
      commission: commission,
      commissionName: commissionName,
      netOfficeIncome: netOfficeIncome,
    };
    let url = BASE_URL + "buyer-insert.php";
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        Swal.fire({
          title: "Success!",
          text: "Buyer Added Successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
    // e.target.reset();
  };

  return (
    <div>
      <form className=" mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="buyerName"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Buyer Name*
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="buyerAddress"
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            required
          />
          <label
            htmlFor="floating_address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Buyer Address*
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="buyerPhone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number*
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="file_input"
            >
              Upload Buyer PDF
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              id="file_input"
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="application/pdf"
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="carName"
              id="floating_car"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="floating_car"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Car Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <p>Show Room Type</p>
            <div className="flex gap-10 items-center mt-3">
              <div className="flex items-center">
                <input
                  id="new"
                  type="radio"
                  value=""
                  name="showRoom"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setShowRoom("new")}
                />
                <label
                  htmlFor="new"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="showRoom"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setShowRoom("old")}
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Old
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="saleby"
              id="sale"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={sale}
              onChange={(e) => setSale(e.target.value)}
            />
            <label
              htmlFor="sale"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              BY Sale*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <p>Car Condition</p>
            <div className="flex gap-10 items-center mt-3">
              <div className="flex items-center">
                <input
                  id="recondition"
                  type="radio"
                  value=""
                  name="carCondition"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setCondition("recondition")}
                />
                <label
                  htmlFor="recondition"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Recondition
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="used"
                  type="radio"
                  value=""
                  name="carCondition"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setCondition("used")}
                />
                <label
                  htmlFor="used"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Used
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="model"
              id="floating_model"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <label
              htmlFor="floating_model"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Model*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="registration"
              id="floating_registration"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
            <label
              htmlFor="floating_registration"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Registration*
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="color"
              id="floating_color"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <label
              htmlFor="floating_color"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Color*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="buyPrice"
              id="floating_price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
            <label
              htmlFor="floating_price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Buy Price*
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="salePrice"
              id="floating_salePrice"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />
            <label
              htmlFor="floating_salePrice"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sale Price*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="cost"
              id="floating_cost"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <label
              htmlFor="floating_cost"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cost
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="profit"
              id="floating_profit"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "

              value={profitSum}
              disabled
            />
            <label
              htmlFor="floating_profit"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Profit*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="cost"
              id="floating_investor"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={investor}
              onChange={(e) => setInvestor(e.target.value)}
            />
            <label
              htmlFor="floating_investor"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Investor
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="buyDate"
              id="floating_buyDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={buyDate}
              onChange={(e) => setBuyDate(e.target.value)}
            />
            <label
              htmlFor="floating_buyDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Buy Date*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="bookingDate"
              id="floating_bookingDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <label
              htmlFor="floating_bookingDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Booking Date*
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="deliveryDate"
              id="floating_deliveryDate"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
            <label
              htmlFor="floating_deliveryDate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Delivery Date*
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="registrationNumber"
              id="floating_registrationNumber"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <label
              htmlFor="floating_registrationNumber"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Registration Number*
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="importer"
              id="floating_importer"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={importer}
              onChange={(e) => setImporter(e.target.value)}
            />
            <label
              htmlFor="floating_importer"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Importer/Seller Name*
            </label>
          </div>

          {/* OFFICE INCOME */}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="officeIncome"
              id="floating_officeIncome"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={officeIncome}
              disabled
            />
            <label
              htmlFor="floating_officeIncome"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Office Income*
            </label>
          </div>
        </div>

        {/* PROFIT SHARE */}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="profitShare"
            id="floating_profitShare"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleProfitShareChange}
          />
          <label
            htmlFor="floating_profitShare"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Number Of People For Profit Sharing
          </label>
        </div>

        {Array.from({ length: profitShareCount }, (_, index) => (
          <div key={index} className="mb-5">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name={`shareholderName${index}`}
                  id={`floating_shareholderName${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={shares[index]?.name || ""}
                  onChange={(e) =>
                    handleShareChange(index, "name", e.target.value)
                  }
                />
                <label
                  htmlFor={`floating_shareholderName${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Shareholder Name
                </label>
              </div>

              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="number"
                  name={`sharePercentage${index}`}
                  id={`floating_sharePercentage${index}`}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={shares[index]?.percentage || ""}
                  onChange={(e) =>
                    handleShareChange(index, "percentage", e.target.value)
                  }
                />
                <label
                  htmlFor={`floating_sharePercentage${index}`}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Share Percentage
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* commission */}

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="commissionName"
              id="floating_commissionName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={commissionName}
              onChange={(e) => setCommissionName(e.target.value)}
            />
            <label
              htmlFor="floating_commissionName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Commission Person Name*
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="commission"
              id="floating_commission"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              placeholder=" "
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />
            <label
              htmlFor="floating_commission"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Commission*
            </label>
          </div>
        </div>

        {/* net office income */}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="netOfficeIncome"
            id="floating_remarks"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={netOfficeIncome}
            disabled
          />
          <label
            htmlFor="floating_remarks"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Net Office Income
          </label>
        </div>

        {/* reamarks */}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="remarks"
            id="floating_remarks"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <label
            htmlFor="floating_remarks"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Remarks
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <p>Loan / Cash</p>
            <div className="flex gap-10 items-center mt-3">
              <div className="flex items-center">
                <input
                  id="cash"
                  type="radio"
                  value=""
                  name="default-radio11"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setLoan("cash")}
                />
                <label
                  htmlFor="cash"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cash
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="loan"
                  type="radio"
                  value=""
                  name="default-radio11"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onClick={() => setLoan("loan")}
                />
                <label
                  htmlFor="loan"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Loan
                </label>
              </div>
            </div>
          </div>
          {loan === "loan" ? (
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="bankName"
                id="floating_bankName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <label
                htmlFor="floating_bankName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bank Name, Branch & PH NO
              </label>
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Buyer List
        </button>
      </form>
    </div>
  );
};

export default EditBuyer;
