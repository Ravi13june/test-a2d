import { useEffect, useState } from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import WithAuth from "../hoc/withAuth";
import A2DLayout from "../components/layout";
import { getLiveWeather } from "../services/weather";
import windy from "../assets/windy.svg";

const Dashboard = () => {
  const [liveWeather, setLiveWeather] = useState({
    cityId: "",
    condition: "",
    humidity: 0,
    maxTemperature: 0,
    minTemperature: 0,
    temperature: 0,
    time: "",
    windSpeed: 0,
  });
  const fetchLiveWeather = async () => {
    const liveDataLocal = localStorage.getItem("live-weather");
    const liveData = liveDataLocal ? JSON.parse(liveDataLocal) : "";
    console.log("liveDataLocal", liveData);
    setLiveWeather(liveData);
  };
  const handleSelectedCityWeather = async (id) => {
    const liveWeatherData = await getLiveWeather(id);
    console.log("liveWeatherData", liveWeatherData);
    setLiveWeather(liveWeatherData.data);
  };
  useEffect(() => {
    fetchLiveWeather();
  }, []);
  return (
    <A2DLayout handleChangeCity={(e) => handleSelectedCityWeather(e)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "14%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "20px",
            border: "2px",
            width: "353px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            // filter: 'blur(2.5px)',
            color: "#FFFFFF",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: "18px",
            }}
          >
            Today,{" " + new Date().toLocaleTimeString()}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Overpass",
              fontWeight: '400',
              fontSize: "72px",
              lineHeight: "91px",
              textAlign: "center",
              textShadow: '-4px 8px 50px rgba(0, 0, 0, 0.1)'
            }}
          >
            {liveWeather?.temperature}&#176;
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29.05px",
            }}
          >
            {liveWeather?.condition}
          </Typography>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                Time
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.time}
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                Temperature
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.temperature}&#8451;
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                MaxTemperature
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.maxTemperature}&#8451;
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                MinTemperature
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.minTemperature}&#8451;
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                Condition
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.condition}
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                WindSpeed
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.windSpeed}km/h
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <img src={windy} alt="ic" />
              </ListItemIcon>
              <ListItemText
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                Humidity
              </ListItemText>
              <Typography
                sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px" }}
              >
                {liveWeather?.humidity}%
              </Typography>
            </MenuItem>
          </MenuList>
        </Box>
      </Box>
    </A2DLayout>
  );
};

export default WithAuth(Dashboard);
