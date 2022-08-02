import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransferFund } from "../../cmps/TransferFund/TransferFund";
import {
  // loadTransfers,
  loadTransfersByContactEmail,
  sendCoins,
} from "../../store/actions/transferActions";
import { loadContact, cleanContact } from "../../store/actions/contactActions";
import altContactImg from "../../assets/icons/contact.png";

import { TransfersTable } from "../../cmps/TransfersTable/TransfersTable";
import NiceButton from "../../cmps/NiceButton/NiceButton";
import editBtnLogo from "../../assets/icons/edit.png";
import loadingGif from "../../assets/icons/loading.gif";
import { setLoggedInUser } from "../../store/actions/userActions";

export const ContactDetailsPage = (props) => {
  const loggedUser = useSelector((state) => state.userReducer.user);
  const transfers = useSelector((state) => state.transferReducer.transfers);
  const contact = useSelector((state) => state.contactReducer.currContact);
  const [userContactTransfers, setUserContactTransfers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(loadContact(id));
    return () => {
      dispatch(cleanContact());
    };
  }, [props.match.params, dispatch]);

  useEffect(() => {
    if (contact) dispatch(loadTransfersByContactEmail(contact.contactEmail));
  }, [contact, dispatch]);

  useEffect(() => {
    if (contact && transfers) {
      const transferByContact = transfers.filter(
        (transfer) =>
          contact.contactEmail === transfer.to ||
          contact.contactEmail === transfer.from
      );
      transferByContact.length && setUserContactTransfers(transferByContact);
    }
  }, [transfers, contact]);

  const onEditContact = () => {
    props.history.push(`/contact/edit/${contact._id}`);
  };

  const onTransferCoins = (transferAmount, ev) => {
    setIsLoading(true);
    ev.preventDefault();
    if (loggedUser.coins < transferAmount) return alert("No enough money");
    dispatch(sendCoins(contact._id, transferAmount))
      .then(() => {
        dispatch(setLoggedInUser());
        setIsLoading(false);
        props.history.push("/contact");
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const IconEdit = () => <img src={editBtnLogo} alt="" />;

  return contact ? (
    <div className="contact-details-page">
      <div className="contact-details">
        <NiceButton
          Icon={IconEdit}
          onClick={onEditContact}
          className="edit-logo"
        />
        <div className="contact-img-details">
          {contact.contactImg ? (
            <img src={contact.contactImg} alt="" className="contact-img" />
          ) : (
            <img src={altContactImg} alt="" className="contact-img" />
          )}
        </div>
        <div className="contact-info">
          <h3>{contact.contactName}</h3>
          <h3>{contact.contactPhone}</h3>
          <h3>{contact.contactEmail}</h3>
        </div>
      </div>
      {isLoading ? (
        <img className="loading-transfer" src={loadingGif} alt="" />
      ) : (
        <TransferFund contact={contact} onTransferCoins={onTransferCoins} />
      )}
      {userContactTransfers && (
        <div className="transfers-by-contact">
          <TransfersTable
            title="Transaction with contact"
            rows={userContactTransfers}
          />
        </div>
      )}
    </div>
  ) : (
    <div>Contact not found...</div>
  );
};
