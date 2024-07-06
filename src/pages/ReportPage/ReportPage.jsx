import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ReportPage.css"; // Assuming you create a CSS file for styling
import BuyerReports from "../../Components/ViewReports/BuyerReports";
import LedgerReports from "../../Components/ViewReports/LedgerReports";

const ReportPage = () => {
  return (
    <div className="">
      <Tabs>
        <TabList className="custom-tab-list">
          <Tab className="custom-tab">Buyer List View</Tab>
          <Tab className="custom-tab">Ledger View</Tab>
        </TabList>

        <TabPanel>
          <div className="mt-10">
                <BuyerReports/>
          </div>
        </TabPanel>
        <TabPanel>
          <LedgerReports/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportPage;
