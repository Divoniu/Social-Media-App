import styles from "./UsersList.module.scss";
import { UserListItems } from "./UserListItems";
import DataContext from "../../../context/DataContext";
import { useContext } from "react";
export function UsersList({ isOpen }) {
  const { users, isLoading } = useContext(DataContext);
  return (
    <section
      className={`${styles.usersListContainer} ${
        isOpen ? null : styles.displayNone
      }`}
    >
      <hr />
      <input
        type="text"
        placeholder="Search messages"
        className={styles.searchMessages}
      />
      {/* add label to input type */}

      {isLoading && <p className={styles.loadingMessage}>Loading Users...</p>}
      {!isLoading && (
        <ul className={styles.usersList}>
          {users.map((user, idx) => (
            <UserListItems user={user} key={idx} />
            //key-ul trebuie definit aici nu la li din userlistitems
          ))}
        </ul>
      )}
    </section>
  );
}
