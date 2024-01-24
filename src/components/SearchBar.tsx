import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TagPopover from "./TagPopover";
import { useSearch } from "./SearchContext";

export default function CustomizedInputBase() {
  const { search, setLoggedSearch } = useSearch();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "90px",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30%",
          margin: "auto",
        }}
      >
        <SearchIcon sx={{ p: 0.5 }} />

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="search threads"
          inputProps={{ "aria-label": "search threads" }}
          value={search || ""}
          onChange={(e) => setLoggedSearch(e.target.value)}
        />

        <Box sx={{ maxHeight: "30px", maxWidth: "1px" }}>
          <TagPopover />
        </Box>
      </Paper>
    </Box>
  );
}
