// Sidebar.js

import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Assessment, ChevronLeft, ChevronRight, Create, Dashboard, PictureAsPdf, Visibility } from "@material-ui/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // import CSS file

const drawerWidth = 240;
const collapsedDrawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#212121",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  collapsed: {
    width: collapsedDrawerWidth,
  },
  menuList: {
    padding: 0,
  },
  menuTitle: {
    margin: "16px 0",
    padding: "0 16px",
    color: "#FFFFFF",
    fontSize: "1.2rem",
    fontWeight: 500,
    textTransform: "uppercase",
    textAlign: "left",
  },
  menuItem: {
    color: "#FFFFFF",
  },
  menuItemHover: {
    "&:hover": {
      backgroundColor: "#424242",
    },
  },
  menuItemText: {
    fontSize: "1rem",
    fontWeight: 500,
  },
  icon: {
    color: "#FFFFFF",
  },
  collapseButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: "#FFFFFF",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { key: "home", icon: <Dashboard className={classes.icon} />, label: "Dashboard" },
    { key: "create", icon: <Create className={classes.icon} />, label: "Create" },
    { key: "view", icon: <Visibility className={classes.icon} />, label: "View" },
    { key: "report", icon: <Assessment className={classes.icon} />, label: "Report" },
    { key: "verify", icon: <Assessment className={classes.icon} />, label: "Verify" },
    { key: "pdfviewer", icon: <PictureAsPdf className={classes.icon} />, label: "PDF Viewer" },
  ];

  return (
    <div className={classes.sidebar}>
      <Drawer
        variant="permanent"
        className={`${classes.drawer} ${collapsed ? classes.collapsed : ""}`}
        classes={{
          paper: `${classes.drawerPaper} ${collapsed ? classes.collapsed : ""}`,
        }}
        open={!collapsed}
      >
        <div className={classes.toolbar} />
        <Divider className={classes.separator} />
        <Typography variant="h6" className={classes.menuTitle}>
          Menu
        </Typography>
        <List className={classes.menuList}>
          {menuItems.map((item) => (
            <ListItem button key={item.key} onClick={() => navigate(`/${item.key}`)} className={`${classes.menuItem} ${classes.menuItemHover}`}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} className={classes.menuItemText} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.separator} />
        <IconButton onClick={toggleCollapsed} className={`collapseButton ${classes.collapseButton}`}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Drawer>
    </div>
  );
};

export default Sidebar;
