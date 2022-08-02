import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uploadImg } from "../../services/imgUploadService";
import addUserBtn from "../../assets/icons/add-contact.png";
import imgBtnLogo from "../../assets/icons/upload.png";
import loadingGif from "../../assets/icons/loading.gif";
import NiceButton from "../../cmps/NiceButton/NiceButton";
import { editUser, saveUser } from "../../store/actions/userActions";

export const UserEditPage = (props) => {
  const user = useSelector((state) => state.userReducer.user);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (ev) => {
    const field = ev.target.name;
    let value;
    if (ev.target.type === "file") {
      setIsImgLoaded(true);
      value = (await uploadImg(ev)).url;
      setIsImgLoaded(false);
    } else {
      value = ev.target.type === "number" ? +ev.target.value : ev.target.value;
    }
    dispatch(editUser(field, value));
  };

  const onSaveUser = (ev) => {
    ev.preventDefault();

    dispatch(saveUser(user)).then(() => {
      props.history.push("/user");
    });
  };

  const IconAddUser = () => <img src={addUserBtn} alt="" />;

  if (!user) return <h1>User not found</h1>;
  return (
    <div className="user-edit">
      <form onSubmit={onSaveUser}>
        <div className="user-name">
          <label htmlFor="fullname">Fullname</label>
          <input
            required
            type="text"
            id="fullname"
            value={user.fullname}
            onChange={handleChange}
            name="fullname"
          />
        </div>

        <div className="user-email">
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="user-phone">
          <label htmlFor="phone">Phone Number</label>
          <input
            required
            type="text"
            id="phone"
            value={user.phone}
            onChange={handleChange}
            name="phone"
          />
        </div>

        <div className="user-img">
          <label htmlFor="img">
            <img src={imgBtnLogo} alt="" />
          </label>
          {isImgLoaded ? (
            <img src={loadingGif} alt="" />
          ) : (
            <label htmlFor="img">
              <img src={user.img} alt="" />
            </label>
          )}

          <input
            hidden
            type="file"
            id="img"
            onChange={handleChange}
            name="img"
          />
        </div>

        <div className="actions-btn">
          <NiceButton
            Icon={IconAddUser}
            // onClick={onSaveUser}
            className="add-user-btn"
          />
        </div>
      </form>
    </div>
  );
};
