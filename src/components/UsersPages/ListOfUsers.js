import { SingleUserPage } from "./SingleUserPage";
import styles from "./ListOfUsers.module.scss";
import { useContext, useState, useEffect } from "react";
import DataContext from "../../context/DataContext";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

import { UserProfile } from "./UserProfile";
export function ListOFUSers() {
  const { users, getUserName, fetchError, setFetchError, setUsers, isLoading } =
    useContext(DataContext);
  // const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <div className={styles.listOfUsersContainer}>
        <section className={styles.header}>
          {!isLoading && (
            <p className={styles.numberOfFriends}>
              You have {users.length} Friends
            </p>
          )}
          <form
            className={styles.searchAndSort}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className={styles.sortContainer}>
              <label htmlFor="sort">Sort by:</label>
              <select name="sort" className={styles.sortBy}>
                <option value="FirstName">First Name</option>
                <option value="LastName">Last Name</option>
                <option value="LastMessageDate">Most Recent</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search by name"
              className={styles.searchBar}
            />
          </form>
        </section>
        <hr />

        {isLoading && <p className={styles.loadingMessage}>Loading Users...</p>}
        {!isLoading && (
          <div className={styles.allFriends}>
            {users.map((user, idx) => {
              return <UserProfile key={idx} user={user} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
