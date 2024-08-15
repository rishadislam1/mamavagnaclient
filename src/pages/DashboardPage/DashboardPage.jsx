import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './DashboardPage.css'; // Import CSS for styling
import { BASE_URL } from '../../../public/config';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DashboardPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [previousMonthSales, setPreviousMonthSales] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch sales data from the backend
    axios.get(`${BASE_URL}get-buyer-data.php`)
      .then(response => {
        const data = response.data;
        const monthlySales = {};
        const currentMonth = new Date().getMonth() + 1;
        let maxYear = year;

        data.forEach(item => {
          const month = new Date(item.buyDate).getMonth() + 1;
          const yearFromData = new Date(item.buyDate).getFullYear();
          const salePrice = parseFloat(item.salePrice); // Convert salePrice to a number

          // Update max year if needed
          if (yearFromData > maxYear) maxYear = yearFromData;

          // Process only for the current year
          if (yearFromData === year) {
            monthlySales[month] = (monthlySales[month] || 0) + salePrice;

            // Calculate current and previous month sales
            if (month === currentMonth) {
              setCurrentMonthSales(prev => prev + salePrice);
            } else if (month === currentMonth - 1) {
              setPreviousMonthSales(prev => prev + salePrice);
            }
          }
        });

        // Update the year state to the most recent year in the data
        setYear(maxYear);

        // Prepare sales data for the bar chart
        const salesArray = monthNames.map((name, index) => ({
          month: name,
          sales: monthlySales[index + 1] || 0, // Sales for each month
        }));

        setSalesData(salesArray);
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  const pieData = [
    { name: 'Current Month', value: currentMonthSales },
    { name: 'Previous Month', value: previousMonthSales },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="dashboard">
      <h2>Yearly Sales Bar Chart for {year}</h2>
      <BarChart width={600} height={300} data={salesData} className="bar-chart">
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>

      <h2>Monthly Sales Comparison Pie Chart</h2>
      <PieChart width={400} height={400} className="pie-chart">
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default DashboardPage;
