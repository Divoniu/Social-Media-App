import styles from "./SingleUserPageHeader.module.scss";
import { Link } from "react-router-dom";
import { SingleUserPageHeaderProfileData } from "./SingleUserPageHeaderProfileData";
export function SingleUserPageHeader({ currentUserProfile }) {
  return (
    <div className={styles.userProfileHeader}>
      <SingleUserPageHeaderProfileData
        currentUserProfile={currentUserProfile}
      />
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
