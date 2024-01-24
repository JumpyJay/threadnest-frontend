import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import WritingsData from "./WritingsData";

interface SimplePaperProps {}

const SimplePaper: React.FC<SimplePaperProps> = () => {
  return (
    <Box
      sx={{
        width: "auto",
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        paddingX: 10,
      }}
    >
      <Container
        sx={{
          padding: 0,
        }}
      >
        <Paper sx={{ width: "100%", height: 128, mb: 1 }} elevation={3}>
          <WritingsData />
        </Paper>
      </Container>
    </Box>
  );
};

export default SimplePaper;
