import React from 'react';
import { useQuery } from 'react-query'; // For data fetching
import { Line } from 'react-chartjs-2'; // For line chart
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // For map
import 'leaflet/dist/leaflet.css'; // For map styling
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'; // For chart configuration

// Registering components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Fetching global COVID-19 data
const fetchGlobalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  return response.json();
};

// Fetching countries COVID-19 data
const fetchCountriesData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  return response.json();
};

// Fetching historical COVID-19 data
const fetchHistoricalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.json();
};

const Dashboard: React.FC = () => {
  // Using useQuery to fetch global COVID-19 data
  const { data: globalData, isLoading: isLoadingGlobalData } = useQuery('globalData', fetchGlobalData);

  // Using useQuery to fetch countries COVID-19 data
  const { data: countriesData, isLoading: isLoadingCountriesData } = useQuery('countriesData', fetchCountriesData);

  // Using useQuery to fetch historical COVID-19 data
  const { data: historicalData, isLoading: isLoadingHistoricalData } = useQuery('historicalData', fetchHistoricalData);

  // Display loading indicator while data is being fetched
  if (isLoadingGlobalData || isLoadingCountriesData || isLoadingHistoricalData) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Preparing chart data for the Line chart
  const chartData = {
    labels: Object.keys(historicalData.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(historicalData.cases),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>

        {/* Display global data */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Global COVID-19 Statistics</h2>
          <p><strong>Total Cases:</strong> {globalData.cases.toLocaleString()}</p>
          <p><strong>Total Deaths:</strong> {globalData.deaths.toLocaleString()}</p>
          <p><strong>Total Recovered:</strong> {globalData.recovered.toLocaleString()}</p>
          <p><strong>Today's Cases:</strong> {globalData.todayCases.toLocaleString()}</p>
          <p><strong>Today's Deaths:</strong> {globalData.todayDeaths.toLocaleString()}</p>
          <p><strong>Today's Recovered:</strong> {globalData.todayRecovered.toLocaleString()}</p>
        </div>

        {/* Line Chart for Historical Data */}
        <div className="mb-8" style={{ width: '100%', height: '500px' }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Map of Countries */}
        <div className="relative">
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesData.map((country: any) => (
              <Marker 
                key={country.countryInfo._id || country.country} // Use unique identifier or fallback to country name
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <div>
                    <h2 className="font-semibold">{country.country}</h2>
                    <p><strong>Active:</strong> {country.active.toLocaleString()}</p>
                    <p><strong>Recovered:</strong> {country.recovered.toLocaleString()}</p>
                    <p><strong>Deaths:</strong> {country.deaths.toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
