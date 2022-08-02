import { contactService } from "../../services/contactService";

export const loadContacts = (filterBy) => {
  return async (dispatch) => {
    const contacts = await contactService.getContacts();
    dispatch({ type: "SET_CONTACTS", contacts });
  };
};

export function loadContact(contactId) {
  return async (dispatch) => {
    const contact = await contactService.getContactById(contactId);
    dispatch({ type: "SET_CONTACT", contact });
  };
}
export function cleanContact() {
  return (dispatch) => {
    dispatch({ type: "CLEAN_CONTACT" });
  };
}

export function loadNewContact() {
  return (dispatch) => {
    const contact = contactService.getEmptyContact();
    dispatch({ type: "SET_CONTACT", contact });
  };
}

export function editContact(field, value) {
  return (dispatch) => {
    dispatch({ type: "EDIT_CONTACT", field, value });
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    const isAdd = !contact._id;

    const updatedContact = await contactService.saveContact(contact);

    if (isAdd) dispatch({ type: "ADD_CONTACT", updatedContact });
    else dispatch({ type: "UPDATE_CONTACT", updatedContact });
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    await contactService.deleteContact(contactId);
    dispatch({ type: "REMOVE_CONTACT", contactId });
  };
}
