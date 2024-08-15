import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ReportPage.css"; // Assuming you create a CSS file for styling
import BuyerReports from "../../Components/ViewReports/BuyerReports";
import LedgerReports from "../../Components/ViewReports/LedgerReports";
import MonthPage from "../../Components/ViewReports/MonthPage";
import Cashbook from "../Cashbook/Cashbook";

const ReportPage = () => {
  return (
    <div className="">
      <Tabs>
        <TabList className="custom-tab-list">
          <Tab className="custom-tab">Buyer List View</Tab>
          <Tab className="custom-tab">Ledger View</Tab>
          <Tab className="custom-tab">Cash Book</Tab>
        </TabList>

        <TabPanel>
          <div className="mt-10">
            <MonthPage />
            <h1 className="font-bold underline text-2xl mb-5 text-center">
              Show All Reports
            </h1>
            <BuyerReports />
          </div>
        </TabPanel>
        <TabPanel>
          <LedgerReports />
        </TabPanel>
        <TabPanel>
          <Cashbook/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportPage;
