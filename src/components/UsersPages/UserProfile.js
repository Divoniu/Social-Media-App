import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./UserProfile.module.scss";
import { useToggle } from "../../hooks/useToggle";
export function UserProfile({ user }) {
  const { getUserName, setUsers, users, setListOfChats } =
    useContext(DataContext);
  const [moreBtn, setMoreBtn] = useToggle();
  const buttonRef = useRef();

  const removeFriend = (e) => {
    setUsers((prevState) => {
      const newState = [...prevState];
      const updatedList = newState.filter(
        (user) => user.id !== buttonRef.current.id

        //e.currentTarget.parentElement.children[0].children[0].innerHTML;
      );

      return [...updatedList];
    });
  };
  const openUserChat = () => {
    const userChatData = {
      name: getUserName(user),
      picture: user.picture.thumbnail,
    };
    setListOfChats((prevState) => {
      const newState = [...prevState];
      const avoidDuplicate = newState.filter(
        (el) => el.name !== userChatData.name
      );

      const duplicateFree = [...avoidDuplicate, userChatData];

      if (duplicateFree.length >= 3) {
        duplicateFree.shift();

        return duplicateFree;
      } else {
        return duplicateFree;
      }
    });
  };

  const displayOptions = (prevState) => {
    return setMoreBtn(!prevState);
  };

  return (
    <>
      <div className={styles.userContainer}>
        <Link to={`/friends/${user.id}`} className={styles.userData}>
          <img
            src={user.picture.medium}
            alt="profile Picture"
            className={styles.profileImage}
          />
          <p className={styles.name}>{getUserName(user)}</p>
        </Link>
        <div className={styles.userOptions}>
          <button onClick={openUserChat} className={styles.message}>
            Message
          </button>

          <div className={styles.deleteContainer}>
            <button onClick={displayOptions} className={styles.moreOptions}>
              <MoreHorizIcon />
            </button>
            <button
              onClick={removeFriend}
              id={user.id}
              ref={buttonRef}
              className={`${styles.deleteButton} ${
                moreBtn === false ? styles.displayNone : null
              }`}
            >
              Remove Friend
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
