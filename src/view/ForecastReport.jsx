import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import A2DLayout from "../components/layout";
import Notification from '../components/notify';
import { getOtherForecast } from "../services/forecast";
import cloudyIcon from '../assets/cloudy.svg';
import snow from '../assets/snow.svg';
import Stormy from '../assets/Stormy.svg';
import sunCloudy from '../assets/sun cloudy.svg';
import sunny from '../assets/sunny.svg';
import thunder from '../assets/thunder.svg';
import thunder2 from '../assets/thunder2.svg';
import cloudy from "../components/icons/cloudy";
import calendar from '../assets/calendar.svg'
import WithAuth from "../hoc/withAuth";
const WeatherIcon = {
  "cloudy": <img src={cloudyIcon} alt="cloudy" />,
  "snow": <img src={snow} alt="snow" />,
  "stormy": <img src={Stormy} alt="Stormy" />,
  "partly-cloudy": <img src={sunCloudy} alt="sunCloudy" />,
  "sunny": <img src={sunny} alt="sunny" />,
  "thunder": <img src={thunder} alt="thunder" />,
  "thunder2": <img src={thunder2} alt="thunder2" />
}
const tempArray = [
  { temp: "20", icon: WeatherIcon["cloudy"], point: "15.00" },
  { temp: "29", icon: WeatherIcon["snow"], point: "15.00" },
  { temp: "25", icon: WeatherIcon["stormy"], point: "15.00" },
  { temp: "23", icon: WeatherIcon["partly-cloudy"], point: "15.00" },
  { temp: "21", icon: WeatherIcon["sunny"], point: "15.00" },
  { temp: "29", icon: WeatherIcon["thunder"], point: "15.00" },
  { temp: "28", icon: WeatherIcon["thunder"], point: "15.00" },
];

const getNthDate = (day, n) => {
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + n);
  return nextDay.toDateString().split(" ").slice(1, 3).join(" ");
}
const day = new Date().toDateString().split(" ").slice(1, 3).join(" ")
const ForecastReport = () => {
  const [notify, setNotify] = useState({ isOpen: false, type: 'info', message: '' })
  const [dayWiseTemp, setDayWiseTemp] = useState([]);
  const handleCreateReport = async (id) => {
    try {
      const forecastReportData = await getOtherForecast(id);
      const forecastArr = Object.values(forecastReportData.DATA)
      setDayWiseTemp(forecastArr.slice(0, forecastArr.length - 1));
    } catch (error) {
      if (error.response) {
        setNotify({ isOpen: true, type: 'error', message:error.response.data.message})
      }
    }

  }
console.log('notify',notify)
  return (
    <A2DLayout handleChangeCity={(e) => handleCreateReport(e)}>
      <>
        <Notification notify={notify} setNotify={setNotify} />
        <Box sx={{ marginTop: "4rem" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "32px", color: "#fff" }}>
            Today{"  "}
            <Typography
              component="span"
              sx={{ fontWeight: 700, fontSize: "24px", color: "#fff" }}
            >
              {day}
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "30px 0", maxWidth: "100vw" }}>
          {tempArray.map(({ temp, icon, point }, index) => (
            <Box
              key={index}
              sx={{
                marginRight: "16px",
                width: "148px",
                borderRadius: "28.74px",
                height: "223px",
                border: "1px solid #54CBFF",
                backgroundColor: index === 1 ? "rgba(255, 255, 255, 0.2)" : "",
                marginBottom:'30px'
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "18px",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#fff",
                }}
              >
                {temp}&#8451;
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {icon}
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#fff",
                }}
              >
                {point}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", marginBottom: "50px" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "32px", color: "#fff", mr: "1rem" }}>
            Next Forecast
          </Typography>
          <img src={calendar} alt="cal Icon" />
        </Box>
        <Grid container spacing={4}>
          {dayWiseTemp?.map(({ temperature, condition }, index) => (
            <Grid key={`day-${index}`} item md={6} lg={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "24x", lineHeight: "29px", color: "#fff", display: "flex", alignItems: "center" }}
                >
                  {getNthDate(new Date(), index + 1)}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {WeatherIcon[sunny]}
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "24px", color: "red", display: "flex", alignItems: "center" }}
                  >
                    {temperature || '10'}&#176;
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </>
    </A2DLayout>
  );
};

export default WithAuth(ForecastReport);
