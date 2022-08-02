import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import contactLogo from "../../assets/icons/contact.png";
import editBtnLogo from "../../assets/icons/edit.png";
import NiceButton from "../../cmps/NiceButton/NiceButton";

export const UserDetailsPage = () => {
  const loggedUser = useSelector((state) => state.userReducer.user);
  const userImgToShow = loggedUser?.img ? loggedUser.img : contactLogo;

  const navigate = useNavigate();

  const IconEdit = () => <img src={editBtnLogo} alt="" />;

  const onEditContact = () => {
    navigate(`/user/edit`);
  };

  return (
    loggedUser && (
      <div className="user-details-page">
        <NiceButton
          Icon={IconEdit}
          onClick={onEditContact}
          className="edit-logo"
        />
        <img src={userImgToShow} alt="" />
        <p>
          Fullname: <label>{loggedUser.fullname}</label>
        </p>
        <p>
          Phone: <label>{loggedUser.phone}</label>
        </p>
        <p>
          Email: <label>{loggedUser.email}</label>
        </p>
      </div>
    )
  );
};
