import styles from "./SingleUserPageHeaderProfileData.module.scss";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

export function SingleUserPageHeaderProfileData({ currentUserProfile }) {
  const { getUserName } = useContext(DataContext);

  return (
    <>
      <div className={styles.userProfileCoverImage}>
        {/* coperta */}
        <img src="https://picsum.photos/1000/300" alt="cover" />
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
          <button>Message</button>
          <button>Another option</button>
        </article>
      </section>
    </>
  );
}
