import { useEffect, useContext } from "react";
import styles from "./UserListItems.module.scss";
import DataContext from "../../../context/DataContext";
export function UserListItems({ user }) {
  const { listOfChats, setListOfChats, getUserName } = useContext(DataContext);

  //daca am doi useri cu aceeasi imagine de profil mi-i inchide pe amandoi
  const openUserChat = () => {
    // name: e.currentTarget.children[1].textContent,
    // picture: e.currentTarget.children[0].children[0].currentSrc,

    const userChatData = {
      name: getUserName(user),
      picture: user.picture.thumbnail,
      id: listOfChats.length,
    };
    //nu pot filtra dupa id pentru ca e variabil
    //console.log(userToChat);
    setListOfChats((prevState) => {
      // const newState = [...prevState, userChatData];
      // const checkForDuplicate = new Set(newState);
      // const duplicateFree = [...checkForDuplicate];
      const newState = [...prevState];

      const duplicateFree = listOfChats.some((user) => {
        return user.name === userChatData.name;
      });
      console.log(duplicateFree);

      if (duplicateFree) {
        return newState;
      } else {
        const finalState = [...prevState, userChatData];
        if (finalState.length >= 3) {
          finalState.shift();
          return finalState;
        }
        return finalState;
      }
      // const avoidDuplicate = newState.filter(
      //   (el) => el.name !== userChatData.name
      // );
      //  thi is duplicate free return [...newState, userChatData];
      // if (duplicateFree.length >= 3) {
      //   duplicateFree.shift();

      //   return duplicateFree;
      // } else {
      //   return duplicateFree;
      // }

      return duplicateFree;
    });
  };

  //const closeUserChat = (e) => {};

  return (
    <li className={styles.userItem} onClick={openUserChat}>
      <div className={styles.userPictureContainer}>
        <img
          src={user.picture.thumbnail}
          alt="profile"
          className={styles.profilePicture}
        />
        <span className={styles.userStatus}>
          <span className={styles.onMobile}></span>
        </span>
      </div>

      <p className={styles.userName}>{getUserName(user)}</p>
    </li>
  );
}

//pt chat tb sa fac un event =dar nu stiu pe cine, on click sa mi se deschida o fereastra de cat cu current target imager si name
