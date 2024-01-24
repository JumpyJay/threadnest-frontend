import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddThreadFields from "./AddThreadModal";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "./UserContext";

const BasicModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginLeft: "auto" }}>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <div>
          <AddThreadFields />
        </div>
      </Box>
    </Modal>
  );
};

export default function AddThreadButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    if (!username) {
      alert("please login to create post");
    } else {
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const { username } = useUser();

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <BasicModal open={modalOpen} onClose={handleClose} />
    </Box>
  );
}
