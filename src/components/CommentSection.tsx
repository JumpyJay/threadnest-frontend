import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Person2Icon from "@mui/icons-material/Person2";
import UpdateCommentButton from "./UpdateCommentButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useUser } from "./UserContext";

interface Comment {
  id: number;
  body: string;
  under: number;
  author: string;
}

interface ThreadId {
  threadId: number;
}

const BasicCTable: React.FC<ThreadId> = ({ threadId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { username } = useUser();

  const commentDelete = (commentId: number): void => {
    fetch(`http://127.0.0.1:3000/api/v1/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        console.log(`Comment with ID ${commentId} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        throw error;
      });
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/comments/${threadId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: Comment[] = await response.json();
      setComments(result);
      console.log("Comments updated!");
    } catch (error: any) {
      console.error("Fetch error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    // Fetch comments initially
    fetchComments();

    // Fetch comments every 5 seconds (adjust interval as needed)
    const intervalId = setInterval(fetchComments, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [threadId]);

  const renderCommentSection = () => {
    if (comments.length > 0) {
      return (
        <TableContainer component={Paper}>
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
              overflow: "auto",
              maxHeight: "250px",
            }}
          >
            {Array.isArray(comments) &&
              comments.map((comment) => (
                <ListItem
                  key={comment.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f2f2f2" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Person2Icon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.body}
                    secondary={comment.author}
                  />
                  {username === comment.author && (
                    <>
                      <button
                        style={{
                          borderRadius: "5px",
                          width: "45px",
                          backgroundColor: "transparent",
                          color: "#000",
                          marginRight: 5,
                          border: "none",
                        }}
                      >
                        <UpdateCommentButton id={comment.id} />
                      </button>
                      <button
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "transparent",
                          color: "#000",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => commentDelete(comment.id)}
                      >
                        <DeleteForeverIcon sx={{ color: "#696969" }} />
                      </button>
                    </>
                  )}
                </ListItem>
              ))}
          </List>
        </TableContainer>
      );
    } else {
      return null;
    }
  };

  return renderCommentSection();
};

export default BasicCTable;
