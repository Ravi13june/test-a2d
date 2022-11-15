import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Dashboard from './view/Dashboard';
import ForecastReport from './view/ForecastReport';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" index element={<Dashboard />} />
        <Route path="/forecast-report" index element={<ForecastReport />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
