import { ContactPreview } from "../ContactPreview/ContactPreview";

export const ContactList = ({ contacts }) => {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact._id}>
          <ContactPreview contact={contact} />
        </li>
      ))}
    </ul>
  );
};
