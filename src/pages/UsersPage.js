import { ListOFUSers } from "../components/UsersPages/ListOfUsers";
import { LeftSide } from "../components/StartingPage/LeftSide/LeftSide";
import styles from "./UsersPage.module.scss";
export function UsersPage() {
  return (
    <div className={styles.listOfUsersContainer}>
      <LeftSide />
      <ListOFUSers />
    </div>
  );
}
