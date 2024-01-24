import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useUser } from "./UserContext";
import Image from "../assets/plant-room.jpg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function LoginSide() {
  const navigate = useNavigate();
  const { setLoggedInUser } = useUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    console.log({
      user: data.get("user"),
    });
    const username = data.get("user") as string;

    if (!username) {
      alert("no username provided!");
      return;
    }

    setLoggedInUser(username);
    navigate("/");
  };

  return (
    <Fragment>
      <Button component={Link} to="/">
        <ArrowBackIosIcon sx={{ mt: 2 }} />
      </Button>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              marginTop: "3%",
            }}
          >
            <Grid container>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: `url(${Image})`,
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h5"
                    fontFamily={"-apple-system"}
                  >
                    Log in
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="user"
                      label="username"
                      name="user"
                      autoComplete="user"
                      autoFocus
                    />
                    <Button type="submit" fullWidth variant="contained">
                      login
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}
