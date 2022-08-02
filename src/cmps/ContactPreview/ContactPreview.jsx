import { Link } from "react-router-dom";
import altContactImg from "../../assets/icons/contact.png";

export const ContactPreview = ({ contact }) => {
  return (
    <Link to={`/contact/${contact._id}`}>
      <div className="contact-preview">
        {contact.contactImg ? (
          <img src={contact.contactImg} alt="" />
        ) : (
          <img src={altContactImg} alt="" />
        )}
        <p>{contact.contactName}</p>
        {/* <p>{contact.contactEmail}</p>
        <p>{contact.contactPhone}</p> */}
      </div>
    </Link>
  );
};
