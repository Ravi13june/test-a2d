import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogContent,
  InputBase,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getAllCities } from "../../services/city";
import Notification from "../notify";

const Header = ({ handleChangeCity }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const [allCities, setAllCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "info",
    message: "",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("live-weather");
    navigate("/");
  };
  const handleCitySelection = (id) => {
    setSelectedCity(id);
    handleClose();
    handleChangeCity(id);
    const newSelectedCity = allCities.find((city) => city._id === id);
    newSelectedCity && setSelectedCity(newSelectedCity.name);
  };
  const fetchAllCityList = useCallback(async () => {
    try {
      const cities = await getAllCities(1, 15);
      const getCityId = JSON.parse(localStorage.getItem("live-weather")).cityId;
      const findCity =
        cities && cities.list.find((city) => city._id === getCityId);
      setAllCities(cities.list);
      findCity && setSelectedCity(findCity.name);
    } catch (error) {
      if (error.response) {
        setNotify({
          isOpen: true,
          type: "error",
          message: error.response.data.msg,
        });
      }
      setNotify({
        isOpen: true,
        type: "error",
        message: "Something went wrong",
      });
    }
  }, []);

  useEffect(() => {
    fetchAllCityList();
  }, [fetchAllCityList]);
  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
        <Box>
          <Button
            startIcon={<LocationOnOutlinedIcon fontSize="large" />}
            endIcon={<KeyboardArrowDownIcon fontSize="large" />}
            variant="text"
            onClick={handleClick}
            sx={{
              fontWeight: 700,
              fontSize: "24px",
              textTransform: "none",
              color: "#000",
            }}
          >
            {selectedCity || "Semarang"}
          </Button>
          <IconButton onClick={() => setLogoutModal(true)}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{ sx: { borderRadius: "15px", maxHeight: "462px" } }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            margin: "20px",
            borderRadius: "10px",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <ArrowBackOutlinedIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <MicOutlinedIcon />
          </IconButton>
        </Paper>
        <MenuList>
          {allCities.map((item, index) => (
            <MenuItem key={`city-${index}`}>
              <ListItemIcon>
                <LocationOnOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={() => handleCitySelection(item._id)}>
                {item.name}
              </ListItemText>
              <Typography variant="body2" color="text.secondary">
                {0}&#176;/{0}&#176;
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
      <Dialog
        open={logoutModal}
        keepMounted
        onClose={() => setLogoutModal(false)}
      >
        <DialogContent>
          <Box sx={{ width: "478px", height: "405px", padding: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#FFD6D6",
                  padding: "30px",
                  "& svg": {
                    fontSize: 135,
                  },
                }}
              >
                <PowerSettingsNewIcon
                  fontSize="large"
                  style={{ color: "#FF6D6D" }}
                />
              </Box>
            </Box>
            <Typography
              sx={{ textAlign: "center", fontWeight: 700, fontSize: "32px" }}
            >
              Log out
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontWeight: 400, fontSize: "16px" }}
            >
              Are you sure want to logout from app
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <Button
                onClick={handleLogout}
                sx={{
                  background: "#FF6D6D",
                  borderRadius: "15px",
                  padding: "15px 75px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                Logout
              </Button>
              <Button
                sx={{
                  background: "#F1EFEF",
                  borderRadius: "15px",
                  padding: "15px 75px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#000",
                }}
                onClick={() => setLogoutModal(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
