import { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../../../context/DataContext";
import { PostItem } from "./PostItem";
import styles from "./Posts.module.scss";
export function Posts({ currentUserProfile }) {
  const { userId } = useParams();
  const { users } = useContext(DataContext);

  return (
    <div className={styles.timelineContainer}>
      <PostItem currentUserProfile={currentUserProfile} />
      <PostItem currentUserProfile={currentUserProfile} />
      <PostItem currentUserProfile={currentUserProfile} />
      <PostItem currentUserProfile={currentUserProfile} />
    </div>
  );
}
