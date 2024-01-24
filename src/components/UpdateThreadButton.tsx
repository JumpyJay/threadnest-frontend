import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import UpdateThreadFields from "./UpdateThreadModal";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "./UserContext";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const BasicModal: React.FC<BasicModalProps> = ({ open, onClose, id }) => {
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
          <UpdateThreadFields id={id} />
        </div>
      </Box>
    </Modal>
  );
};

interface UpdateThreadButtonProps {
  id: number;
}

const UpdateThreadButton: React.FC<UpdateThreadButtonProps> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { username } = useUser();

  const handleOpen = () => {
    if (username == null) {
      alert("login to create post");
    } else {
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          float: "left",
          width: "30px",
          height: "30px",
          borderRadius: "5px",
          backgroundColor: "transparent",
          color: "#000",
          border: "none",
          cursor: "pointer",
          marginRight: "15px",
        }}
      >
        <SyncAltIcon />
      </button>
      <BasicModal open={modalOpen} onClose={handleClose} id={id} />
    </div>
  );
};

export default UpdateThreadButton;
