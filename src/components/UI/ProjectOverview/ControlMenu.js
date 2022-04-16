import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function ControlMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button variant="contained" endIcon={<KeyboardArrowDownIcon />} disableElevation onClick={handleClick}>
        Tasks
      </Button>

      <Paper>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Retrieve Predictions</MenuItem>
          <MenuItem onClick={handleClose}>Create Annotations From Predictions</MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: red[700] }} fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ color: red[700] }}>Delete Tasks</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: red[700] }} fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ color: red[700] }}>Delete Annotations</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: red[700] }} fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ color: red[700] }}>Delete Predictions</ListItemText>
          </MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}
