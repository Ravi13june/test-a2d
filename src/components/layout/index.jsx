import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Header from "../header";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GridViewIcon from "@mui/icons-material/GridView";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import A2D from '../../assets/a2glogo.png'

const drawerWidth = 250;
const closedDrawerWidth = 65;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: closedDrawerWidth,
    width: `calc(100% - ${closedDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const sidebarRoutes = [
  { text: "Dashboard", link: "/dashboard", icon: <GridViewIcon /> },
  {
    text: "Forecast report",
    link: "/forecast-report",
    icon: <SummarizeIcon />,
  },
];
const A2DLayout = ({ children,handleChangeCity }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [open, setOpen] = useState(true);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ minHeight: "50px",display:"flex", justifyContent:"space-between" }}>
            <IconButton
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Header handleChangeCity={handleChangeCity}/>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{pr:"1rem"}}>
            <img src={A2D} alt="logo" />
          </DrawerHeader >
          <List>
            <ListItem>Main</ListItem>
            {sidebarRoutes.map(({ icon, text, link }) => (
              <ListItem key={link} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  selected={location.pathname === link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    padding: "16px",
                    "&.Mui-selected": {
                      borderLeft: "6px solid #47BFDF",
                      fontWeight: 700,
                      fontSize: "14px",
                      color:'#47BFDF'
                    },
                  }}
                  onClick={() => navigate(link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      // color: `${pathname === link ? ' #47BFDF' : ''}`
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, background: 'linear-gradient(192.05deg, #47BFDF 0%, #4A91FF 100%)', minHeight: "100vh" }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default A2DLayout;
