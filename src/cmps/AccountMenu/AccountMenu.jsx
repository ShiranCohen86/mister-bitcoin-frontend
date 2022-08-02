import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import menuIcon from "../../assets/icons/menu.png";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export const AccountMenu = ({ fullname, logout, history, balance, img }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const amountClass = balance ? "amount-plus" : "amount-minus";

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {fullname && (
          <div className="details-header">
            <Typography>
              Hi, <span className="header-fullname">{fullname}</span>
            </Typography>

            <Typography>
              Balance:{" "}
              <span className={amountClass}>
                {balance > 0 ? balance.toFixed(2) : 0}
              </span>{" "}
              ₿
            </Typography>
          </div>
        )}
        <Tooltip title="Profile">
          <IconButton onClick={handleClick} size="small">
            <Avatar src={menuIcon} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "150px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {fullname && (
          <div>
            <MenuItem onClick={() => history.push("/user")}>
              <Avatar src={img} />
              Profile
            </MenuItem>
            <MenuItem onClick={() => history.push("/contact")}>
              <PermContactCalendarIcon />
              Contacts
            </MenuItem>
            <MenuItem onClick={() => history.push("/transactions")}>
              <FormatListNumberedIcon />
              My Activity
            </MenuItem>

            <MenuItem onClick={() => history.push("/statistic")}>
              <QueryStatsIcon />
              Statistics
            </MenuItem>

            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        )}
        {!fullname && (
          <MenuItem onClick={() => history.push("/signup/login")}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
        {!fullname && (
          <MenuItem onClick={() => history.push("/signup")}>
            <Avatar src={img} />
            SignUp
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};
