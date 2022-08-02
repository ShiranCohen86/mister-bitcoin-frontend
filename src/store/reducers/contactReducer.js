const INITIAL_STATE = {
  contacts: [],
  currContact: null,
};

export function contactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.contacts,
      };
    case "SET_CONTACT":
      return {
        ...state,
        currContact: action.contact,
      };
    case "EDIT_CONTACT":
      return {
        ...state,
        currContact: {
          ...state.currContact,
          [action.field]: action.value,
        },
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.updatedContact],
      };
    case "REMOVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.contactId
        ),
      };
    case "UPDATE_CONTACT":
      const { updatedContact } = action;
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        ),
      };
    case "CLEAN_CONTACT":
      return {
        ...state,
        currContact: null,
      };
    case "CLEAR_CONTACTS":
      return {
        contacts: [],
        currContact: null,
      };
    default:
      return state;
  }
}
