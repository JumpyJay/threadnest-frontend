import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicModal from "./BasicWritingModal";
import { makeStyles } from "@mui/styles";
import { useSearch } from "./SearchContext";
import { useTag } from "./TagContext";
import { Avatar, Typography } from "@mui/material";
import cat1 from "../assets/cat2.jpeg";
import cat2 from "../assets/cat4.jpeg";
import cat3 from "../assets/cat1.jpeg";
import cat4 from "../assets/cat7.jpeg";
import cat5 from "../assets/cat5.jpeg";
import cat6 from "../assets/cat6.jpeg";
import cat7 from "../assets/cat3.jpeg";
import { URL_CONSTANT } from "./apiUrl";

interface Writing {
  id: number;
  title: string;
  body: string;
  author: string;
  under: number;
  created_at: Date;
}

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "black",
      backgroundColor: "#C6D1DB",
    },
  },
});

const useTextStyles = makeStyles({
  root: {
    "&.MuiTableCell-root": {
      color: "#909090",
    },
  },
});

const BasicTable: React.FC = () => {
  const [writingz, setWritings] = useState<Writing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedWriting, setSelectedWriting] = useState<Writing | null>(null);
  const { search } = useSearch();
  const { Tag } = useTag();

  useEffect(() => {
    fetch(`${URL_CONSTANT}/api/v1/writings?`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("api data loaded!");
          setWritings(result);
        },
        (error) => {
          console.error("Fetch error:", error);
          setError(error.message);
        }
      );
  }, []);

  const handleRowClick = (writing: Writing) => {
    setSelectedWriting(writing);
  };

  const renderAvatar = (author: string) => {
    const start = author.toLowerCase().charAt(0);

    switch (start) {
      case "a":
      case "h":
      case "o":
      case "v":
        return <Avatar style={{ alignSelf: "end" }} src={cat1} />;
      case "b":
      case "i":
      case "p":
      case "w":
        return <Avatar style={{ alignSelf: "end" }} src={cat2} />;
      case "c":
      case "j":
      case "q":
      case "x":
        return <Avatar style={{ alignSelf: "end" }} src={cat3} />;
      case "d":
      case "k":
      case "r":
      case "y":
        return <Avatar style={{ alignSelf: "end" }} src={cat4} />;
      case "e":
      case "l":
      case "s":
        return <Avatar style={{ alignSelf: "end" }} src={cat5} />;
      case "f":
      case "m":
      case "t":
        return <Avatar style={{ alignSelf: "end" }} src={cat6} />;
      default:
        return <Avatar style={{ alignSelf: "end" }} src={cat7} />;
    }
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.root}>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center">threads</TableCell>
            <TableCell align="center">‎ </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {writingz
            .filter((writing) => {
              const isTitleMatch =
                search?.toLowerCase() === "" ||
                writing.title.toLowerCase().includes(search.toLowerCase());

              const isTagMatch = Tag === 0 || writing.under === Tag;

              return isTitleMatch && isTagMatch;
            })
            .filter(
              (writing) =>
                !!writing.created_at &&
                !isNaN(new Date(writing.created_at).getTime())
            ) // Filter out invalid dates
            .sort((a, b) => {
              const dateA = new Date(a.created_at).getTime();
              const dateB = new Date(b.created_at).getTime();
              return dateB - dateA;
            })
            .map((writing) => (
              <TableRow
                key={writing.id}
                onClick={() => handleRowClick(writing)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f2f2f2" },
                }}
              >
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right" style={{ justifyContent: "flex-end" }}>
                  {renderAvatar(writing.author)}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <div>{writing.title}</div>
                      <Typography fontSize={11} color={"grey"}>
                        {writing.author}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <BasicModal
        open={!!selectedWriting}
        onClose={() => setSelectedWriting(null)}
        writing={selectedWriting || ({} as Writing)}
      />
    </TableContainer>
  );
};

export default BasicTable;
