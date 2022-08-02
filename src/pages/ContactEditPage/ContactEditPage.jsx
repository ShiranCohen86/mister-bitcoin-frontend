import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanContact,
  loadNewContact,
  saveContact,
  editContact,
} from "../../store/actions/contactActions";
import { uploadImg } from "../../services/imgUploadService";
import addContactBtn from "../../assets/icons/add-contact.png";
import imgBtnLogo from "../../assets/icons/upload.png";
import loadingGif from "../../assets/icons/loading.gif";
import NiceButton from "../../cmps/NiceButton/NiceButton";
import { loadContact } from "../../store/actions/contactActions";

export const ContactEditPage = (props) => {
  const contact = useSelector((state) => state.contactReducer.currContact);
  // const [contactToSave, setContactToSave] = useState(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    // if (contact) setContactToSave(contact);
    if (!contact) {
      if (id) {
        dispatch(loadContact(id));
      } else {
        dispatch(loadNewContact());
      }
    }
  }, [dispatch, props.match.params, contact]);

  useEffect(() => {
    return () => {
      dispatch(cleanContact());
    };
  }, [dispatch]);

  const handleChange = async (ev) => {
    const field = ev.target.name;
    let value;
    if (ev.target.type === "file") {
      setIsImgLoaded(true);
      value = (await uploadImg(ev)).url;
      setIsImgLoaded(false);
    } else {
      value = ev.target.type === "number" ? +ev.target.value : ev.target.value;
      // setContactToSave({ ...contactToSave });
    }
    dispatch(editContact(field, value));
  };

  // const onRemoveContact = async () => {
  //   await contactService.deleteContact(contact._id);
  //   props.history.push("/contact");
  // };

  const onSaveContact = (ev) => {
    ev.preventDefault();

    dispatch(saveContact(contact)).then(() => {
      props.history.push("/contact");
    });
  };

  const IconAddContact = () => <img src={addContactBtn} alt="" />;

  if (!contact) return <h1>Contact not found</h1>;
  return (
    <div className="contact-edit">
      <form onSubmit={onSaveContact}>
        <div className="contact-name">
          <label htmlFor="contactName">Fullname</label>
          <input
            required
            type="text"
            id="contactName"
            value={contact.contactName}
            onChange={handleChange}
            name="contactName"
          />
        </div>

        <div className="contact-email">
          <label htmlFor="contactEmail">Email Address</label>
          <input
            required
            type="email"
            id="contactEmail"
            value={contact.contactEmail}
            onChange={handleChange}
            name="contactEmail"
          />
        </div>

        <div className="contact-phone">
          <label htmlFor="contactPhone">Phone Number</label>
          <input
            required
            type="text"
            id="contactPhone"
            value={contact.contactPhone}
            onChange={handleChange}
            name="contactPhone"
          />
        </div>

        <div className="contact-img">
          <label htmlFor="contactImg">
            <img src={imgBtnLogo} alt="" />
          </label>
          {isImgLoaded ? (
            <img src={loadingGif} alt="" />
          ) : (
            <label htmlFor="contactImg">
              <img src={contact.contactImg} alt="" />
            </label>
          )}

          <input
            hidden
            type="file"
            id="contactImg"
            onChange={handleChange}
            name="contactImg"
          />
        </div>

        <div className="actions-btn">
          <NiceButton
            Icon={IconAddContact}
            onClick={onSaveContact}
            className="add-contact-btn"
          />
        </div>
      </form>
    </div>
  );
};
