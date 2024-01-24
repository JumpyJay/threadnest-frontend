import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommentSection from "./CommentSection";
import Divider from "@mui/material/Divider";
import { useUser } from "./UserContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateThreadButton from "./UpdateThreadButton";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import SpaIcon from "@mui/icons-material/Spa";
import FlightIcon from "@mui/icons-material/Flight";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CircleIcon from "@mui/icons-material/Circle";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { Chip } from "@mui/material";
import CommentAdd from "./AddComment";
import { URL_CONSTANT } from "./apiUrl";

interface Writing {
  id: number;
  title: string;
  body: string;
  author: string;
  under: number;
  created_at: Date;
}

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  writing: Writing;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<BasicModalProps> = ({ open, onClose, writing }) => {
  const { username } = useUser();
  const apiurl = `${URL_CONSTANT}/api/v1/writings/${writing.id}`;

  const userDelete = (event: { preventDefault: () => void }) => {
    fetch(apiurl, {
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
      .then((result: any) => {
        window.location.href = "/";
      });
  };

  ////////////////////////////////////////////////////
  const renderTag = () => {
    switch (writing.under) {
      case 1:
        return (
          <Chip
            icon={<SportsEsportsIcon style={{ color: "white" }} />}
            label="gaming"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#A7C3E4" }}
          />
        );
      case 2:
        return (
          <Chip
            icon={<LocalFloristIcon style={{ color: "white" }} />}
            label="fashion"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#FDB0B0" }}
          />
        );
      case 3:
        return (
          <Chip
            icon={<SpaIcon style={{ color: "white" }} />}
            label="lifestyle"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#91EE91" }}
          />
        );
      case 4:
        return (
          <Chip
            icon={<FlightIcon style={{ color: "white" }} />}
            label="travel"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#F7CB7E" }}
          />
        );
      case 5:
        return (
          <Chip
            icon={<FitnessCenterIcon style={{ color: "white" }} />}
            label="fitness"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#8DC3A4" }}
          />
        );
      case 6:
        return (
          <Chip
            icon={<PhoneIphoneIcon style={{ color: "white" }} />}
            label="tech"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#CA95DC" }}
          />
        );
      case 7:
        return (
          <Chip
            icon={<RestaurantIcon style={{ color: "white" }} />}
            label="food"
            variant="outlined"
            sx={{ color: "#ffffff", backgroundColor: "#C9C9C9" }}
          />
        );
      case 8:
        return <Chip icon={<BlurOnIcon />} label="others" variant="outlined" />;
      default:
        return (
          <Chip icon={<CircleIcon />} label="default" variant="outlined" />
        );
    }
  };

  ////////////////////////////////////////////////////

  const renderUpdDelButton = () => {
    if (username == writing.author) {
      return (
        <div>
          <UpdateThreadButton id={writing.id} />
          <Button
            variant="contained"
            style={{
              float: "left",
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
              backgroundColor: "transparent",
              color: "#000",
              boxShadow: "none",
            }}
            color="primary"
            className="float-left"
            onClick={userDelete}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {renderUpdDelButton()}
        <Button
          variant="contained"
          style={{
            float: "right",
            maxWidth: "30px",
            maxHeight: "30px",
            minWidth: "30px",
            minHeight: "30px",
            backgroundColor: "transparent",
            color: "#000",
          }}
          color="primary"
          className="float-right"
          onClick={onClose}
        >
          X
        </Button>
        <Box sx={{ ml: "45%" }}>{renderTag()}</Box>
        <Typography
          id="modal-modal-title"
          variant="h4"
          align="center"
          component="h2"
          fontFamily={"-apple-system"}
        >
          {writing.title}
        </Typography>
        <Typography
          id="modal-modal-description"
          fontSize={12}
          align="center"
          sx={{ m: 1 }}
          color={"#707070"}
        >
          {writing.author}
        </Typography>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 5 }}>
          {writing.body}
        </Typography>
        <Divider />
        <Typography sx={{ my: 2 }}>Comments</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CommentAdd threadId={writing.id} />
        </Box>
        <CommentSection threadId={writing.id} />
      </Box>
    </Modal>
  );
};

export default BasicModal;
