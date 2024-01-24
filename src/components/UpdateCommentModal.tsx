import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

interface UpdateCommentFieldsProps {
  id: number;
  onClose: () => void;
}

const UpdateCommentFields: React.FC<UpdateCommentFieldsProps> = ({
  id,
  onClose,
}) => {
  const [body, setBody] = useState("");
  const apiurl = `http://127.0.0.1:3000/api/v1/comments/${id}`;

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = {
      body: body,
    };
    fetch(apiurl, {
      method: "PUT",
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
        onClose();
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <Box sx={{ mb: 3 }}>
          <TextField
            id="body"
            label="Body"
            onChange={(e) => setBody(e.target.value)}
            multiline
            maxRows={4}
            sx={{ maxHeight: "100%" }}
          />
        </Box>
        <Button type="submit">Update</Button>
      </div>
    </Box>
  );
};

export default UpdateCommentFields;
