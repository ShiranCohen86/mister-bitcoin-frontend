import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate  } from "react-router";
// import NiceButton from "../NiceButton/NiceButton";
// import contactLogo from "../../assets/icons/users.png";
// import backBtnLogo from "../../assets/icons/back.png";
// import { ModalContacts } from "../ModalContacts";
import { loadContacts } from "../../store/actions/contactActions";

export const AppFooter = () => {
  const isLoggedUser = useSelector((state) => state.userReducer.user);
  // const contacts = useSelector((state) => state.contactReducer.contacts);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedUser?.contactsLength) dispatch(loadContacts());
  }, [isLoggedUser?.contactsLength, dispatch]);

  // const onGoContacts = () => {
  //   navigate("/contact");
  // };

  // const onGoBack = () => {
  //   navigate(-1);
  // };

  // const IconGoContacts = () => <img src={contactLogo} alt="" />;
  // const IconGoBack = () => <img src={backBtnLogo} alt="" />;

  return (
    isLoggedUser && (
      <div className="app-footer">
        {/* <NiceButton
          className="go-back-btn"
          Icon={IconGoBack}
          onClick={onGoBack}
        />
        <ModalContacts contacts={contacts}></ModalContacts>
        <NiceButton
          className="contacts-btn"
          Icon={IconGoContacts}
          onClick={onGoContacts}
        /> */}
      </div>
    )
  );
};
