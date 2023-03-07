import styles from "./MyProfileHeader.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
export function MyProfileHeader({ currentUserProfile }) {
  const { getUserName } = useContext(DataContext);
  return (
    <div className={styles.userProfileContainer}>
      <section className={styles.userProfileHeader}>
        <div className={styles.userProfileCoverImage}>
          {/* coperta */}
          <img src="https://picsum.photos/1000/300" alt="cover" />
        </div>

        <div className={styles.userImageAndName}>
          <img
            src={require("./../StartingPage/NewsFeed/assets/profile.jpeg")}
            alt="user"
            className={styles.userProfileImage}
          />

          <p className={styles.userName}>{getUserName(currentUserProfile)}</p>
        </div>
      </section>
      <div className={styles.multipleOptionsContainer}>
        <hr />
        <ul className={styles.multipleOptions}>
          <li className={styles.multipleOptionsItem}>
            <Link>Posts</Link>
          </li>
          <li className={styles.multipleOptionsItem}>
            <Link>About</Link>
          </li>
          <li className={styles.multipleOptionsItem}>
            <Link>Friends</Link>
          </li>
          <li className={styles.multipleOptionsItem}>
            <Link>Photos</Link>
          </li>
          <li className={styles.multipleOptionsItem}>
            <Link>More</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
