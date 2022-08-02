import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactFilter } from "../../cmps/ContactFilter/ContactFilter";
import { ContactList } from "../../cmps/ContactList/ContactList";
import NiceButton from "../../cmps/NiceButton/NiceButton";
import addContactLogo from "../../assets/icons/plus.png";

export const ContactPage = ({ history }) => {
  const contacts = useSelector((state) => state.contactReducer.contacts);
  const [filterBy, setFilterBy] = useState(null);
  const [contactsToShow, setContactsToShow] = useState(null);

  const dispatch = useDispatch();

  const changeFilter = (filterBy) => {
    setFilterBy(filterBy);
  };

  const onAddContact = () => {
    history.push("/contact/edit");
  };

  useEffect(() => {
    if (contacts) {
      if (filterBy) {
        const filteredContacts = contacts.filter(
          (contact) =>
            contact.contactEmail
              .toLowerCase()
              .includes(filterBy.toLowerCase()) ||
            contact.contactName
              .toLowerCase()
              .includes(filterBy.toLowerCase()) ||
            contact.contactPhone.toLowerCase().includes(filterBy.toLowerCase())
        );
        setContactsToShow(filteredContacts);
      } else {
        setContactsToShow(contacts);
      }
    }
  }, [dispatch, filterBy, contacts]);

  const IconAddContact = () => <img src={addContactLogo} alt="" />;

  return (
    <div className="contact-page">
      <h1>Contacts</h1>
      <div className="contact-header">
        <ContactFilter onChangeFilter={changeFilter} />
        <NiceButton
          Icon={IconAddContact}
          onClick={onAddContact}
          className="add-contact-btn"
        />
      </div>
      {contactsToShow?.length ? (
        <ContactList contacts={contactsToShow} />
      ) : (
        <h1>No contacts...</h1>
      )}
    </div>
  );
};
