import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "./UserContext";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import UpdateCommentFields from "./UpdateCommentModal";

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
          height: "60%",
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
          <UpdateCommentFields id={id} onClose={onClose} />
        </div>
      </Box>
    </Modal>
  );
};

interface UpdateCommentButtonProps {
  id: number;
}

const UpdateCommentButton: React.FC<UpdateCommentButtonProps> = ({ id }) => {
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
          float: "right",
          width: "30px",
          height: "30px",
          borderRadius: "5px",
          backgroundColor: "transparent",
          color: "#000",
          border: "none",
          cursor: "pointer",
          marginRight: "2px",
        }}
      >
        <SyncAltIcon />
      </button>
      <BasicModal open={modalOpen} onClose={handleClose} id={id} />
    </div>
  );
};

export default UpdateCommentButton;
