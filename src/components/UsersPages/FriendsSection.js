import { useContext } from "react";
import { useParams } from "react-router";
import DataContext from "../../context/DataContext";
import styles from "./FriendsSection.module.scss";
import { useEffect, useState } from "react";
export function FriendsSection() {
  const { users, getUserName, ME } = useContext(DataContext);
  const { userId } = useParams();

  const [listOfFriends, setListOfFriends] = useState([]);

  useEffect(() => {
    const slicedUsers = users.slice(0, 10);

    setListOfFriends(() => {
      return [ME, ...slicedUsers];
    });
  }, [userId]);
  console.log(listOfFriends);
  // am facut acest use effect ca sa apara profilul meu primul in lista prietenilor
  return (
    <section className={styles.friends}>
      {/* ar trebui sa ma includ pe mine pe prima pozitie  */}
      <p className={styles.sectionTitle}>
        Friends <span>See all friends</span>
      </p>
      <div>
        {listOfFriends
          .filter((user) => user.id !== userId)
          .map(
            (user, idx) =>
              idx < 9 && (
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
