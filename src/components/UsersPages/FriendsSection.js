import { useContext } from "react";
import { useParams } from "react-router";
import DataContext from "../../context/DataContext";
import styles from "./FriendsSection.module.scss";

export function FriendsSection() {
  const { users, getUserName } = useContext(DataContext);
  const { userId } = useParams();
  return (
    <section className={styles.friends}>
      {/* ar trebui sa ma includ pe mine pe prima pozitie  */}
      <p className={styles.sectionTitle}>
        Friends <span>See all friends</span>
      </p>
      <div>
        {users.map(
          (user, idx) =>
            user.id !== userId &&
            idx <= 9 && (
              <div className={styles.imageContainer} key={idx}>
                <img src={user.picture.large} alt="friends" />
                <p>{getUserName(user)}</p>
              </div>
            )
        )}
      </div>
    </section>
  );
}
