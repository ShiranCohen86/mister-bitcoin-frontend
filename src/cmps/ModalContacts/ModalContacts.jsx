import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NiceButton from "../NiceButton/NiceButton";
import bitcoinGif from "../../assets/icons/bitcoin.gif";
import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import addContactLogo from "../../assets/icons/plus.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#B8C0C6",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  maxHeight: "80vh",
};

export const ModalContacts = ({ contacts }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const IconBitcoin = () => <img src={bitcoinGif} alt="" />;

  const onGoContact = (contactId) => {
    handleClose();
    navigate(`/contact/${contactId}`);
  };

  const onAddContact = () => {
    handleClose();

    navigate("/contact/edit");
  };

  const IconAddContact = () => <img src={addContactLogo} alt="" />;

  const contactDiv = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    alignItems: "center",
    border: "1px solid black",
    padding: "10px",
    bgcolor: "#CEF6FF",
    cursor: "pointer",
    borderRadius: "10px",
  };

  return (
    <>
      <NiceButton
        onClick={handleOpen}
        Icon={IconBitcoin}
        className="bitcoin-gif"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {contacts.length ? (
            <Box>
              <Typography variant="h2">Select Contact</Typography>
              {contacts.map((contact) => (
                <Box
                  key={contact._id}
                  sx={contactDiv}
                  onClick={() => onGoContact(contact._id)}
                >
                  <Avatar alt="" src={contact.contactImg} />
                  <Typography>{contact.contactName}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="no-contacts">
              <Typography variant="h2">Add Contact...</Typography>
              <NiceButton
                Icon={IconAddContact}
                onClick={onAddContact}
                className="add-contact-btn"
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};
