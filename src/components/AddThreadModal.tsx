import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { useUser } from "./UserContext";
import { URL_CONSTANT } from "./apiUrl";

export default function AddThreadFields() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [under, setunder] = useState(1);

  const { username } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setunder(Number(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = {
      title: title,
      body: body,
      author: username,
      under: under,
    };
    fetch(`${URL_CONSTANT}/api/v1/writings?`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result: any) => {
        window.location.href = "/";
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "100%", display: "flex" },
        width: "100%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <Box>
          <TextField
            id="title"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        {/* ----------------------------------------------------------------------------- */}
        <Box sx={{ display: "flex", ml: 1, mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
            <FormGroup sx={{ flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 1}
                    onChange={handleChange}
                    value="1"
                  />
                }
                label="gaming"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 2}
                    onChange={handleChange}
                    value="2"
                  />
                }
                label="fashion"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 3}
                    onChange={handleChange}
                    value="3"
                  />
                }
                label="lifestyle"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 4}
                    onChange={handleChange}
                    value="4"
                  />
                }
                label="travel"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 5}
                    onChange={handleChange}
                    value="5"
                  />
                }
                label="fitness"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 6}
                    onChange={handleChange}
                    value="6"
                  />
                }
                label="tech"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 7}
                    onChange={handleChange}
                    value="7"
                  />
                }
                label="food"
                sx={{ mr: 5 }}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={under === 8}
                    onChange={handleChange}
                    value="8"
                  />
                }
                label="others"
                sx={{ mr: 5 }}
              />
            </FormGroup>
          </FormControl>
        </Box>
        {/* ----------------------------------------------------------------------------- */}
        <Box sx={{ my: 2 }}>
          <TextField
            id="body"
            label="Body"
            onChange={(e) => setBody(e.target.value)}
            multiline
            maxRows={4}
            sx={{ maxHeight: "100%" }}
          />
        </Box>
        <Button type="submit">Create</Button>
      </div>
    </Box>
  );
}
