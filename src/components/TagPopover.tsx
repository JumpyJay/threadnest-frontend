import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTag } from "./TagContext";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

export default function TagPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { Tag, setLoggedTag } = useTag();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTag = Number(event.target.value);
    console.log(selectedTag);
    setLoggedTag(selectedTag);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{ width: "20px", height: "30px", color: "grey" }}
      >
        <FilterAltIcon sx={{ p: 0.4 }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ display: "flex", ml: 1, mt: 1, borderRadius: 30 }}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
            <FormGroup sx={{ flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Radio checked={Tag === 0} onChange={handleChange} value="" />
                }
                label="all"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 1}
                    onChange={handleChange}
                    value="1"
                  />
                }
                label="gaming"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 2}
                    onChange={handleChange}
                    value="2"
                  />
                }
                label="fashion"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 3}
                    onChange={handleChange}
                    value="3"
                  />
                }
                label="lifestyle"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 4}
                    onChange={handleChange}
                    value="4"
                  />
                }
                label="travel"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 5}
                    onChange={handleChange}
                    value="5"
                  />
                }
                label="fitness"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 6}
                    onChange={handleChange}
                    value="6"
                  />
                }
                label="tech"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 7}
                    onChange={handleChange}
                    value="7"
                  />
                }
                label="food"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={Tag === 8}
                    onChange={handleChange}
                    value="8"
                  />
                }
                label="others"
                sx={{ mr: 3 }}
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Popover>
    </div>
  );
}
