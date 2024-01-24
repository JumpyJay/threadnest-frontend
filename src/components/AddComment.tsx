import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useUser } from "./UserContext";

interface ThreadId {
  threadId: number;
}

const CommentAdd: React.FC<ThreadId> = ({ threadId }) => {
  const [body, setBody] = useState("");
  const under = threadId;
  const { username } = useUser();

  const handleCommentSubmit = (event: { preventDefault: () => void }) => {
    if (!username) {
      alert("please login to comment");
    } else {
      event.preventDefault();
      const data = {
        body: body,
        under: under,
        author: username,
      };
      fetch("http://127.0.0.1:3000/api/v1/comments/?", {
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
        .then(() => {
          setBody("");
        });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        width: "90%",
        display: "flex",
      }}
      onSubmit={handleCommentSubmit}
    >
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="comment-input">Add a comment...</InputLabel>
        <Input
          id="comment-input"
          autoComplete="off"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </FormControl>
      <IconButton aria-label="Add" color="primary" type="submit">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CommentAdd;
