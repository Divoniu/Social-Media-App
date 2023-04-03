import styles from "./SingleUserPageHeaderProfileData.module.scss";
import { useContext, useRef } from "react";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";

export function SingleUserPageHeaderProfileData({ currentUserProfile }) {
  const { getUserName, users, setListOfChats } = useContext(DataContext);
  const sendMessageToUser = useRef();
  const { userId } = useParams();
  const openUserChat = () => {
    const user = users[userId - 1];
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
  const coverImageSrc = `https://picsum.photos/id/${userId}/1000/300`;
  return (
    <>
      <div className={styles.userProfileCoverImage}>
        {/* coperta */}
        <img src={coverImageSrc} alt="cover" />
      </div>
      <section className={styles.userProfile}>
        <div className={styles.userImageAndName}>
          <img
            src={currentUserProfile.picture.large}
            alt="user"
            className={styles.userProfileImage}
          />

          <p className={styles.userName}>{getUserName(currentUserProfile)}</p>
        </div>
        <article className={styles.userOptions}>
          <button ref={sendMessageToUser} onClick={openUserChat}>
            Message
          </button>
          <button>Another option</button>
        </article>
      </section>
    </>
  );
}
