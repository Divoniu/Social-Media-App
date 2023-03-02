import styles from "./ListOfComments.module.scss";
import { Link } from "react-router-dom";
export function ListOfComments({ listOfComments }) {
  return (
    <>
      {listOfComments.map((comment, idx) => {
        return (
          <div className={styles.comments} key={idx}>
            <div className={styles.userInfo}>
              <Link to="/">
                <img
                  src={require("../StartingPage/NewsFeed/assets/profile.jpeg")}
                  alt="Profile Picture"
                  className={styles.profilePictureImg}
                ></img>
              </Link>
              <Link to="/">
                <p className={styles.username}>{comment.username}</p>
              </Link>
            </div>
            <div className={styles.commentInfo}>
              <p className={styles.comment}>{comment.comment}</p>
              <p className={styles.timeOfPost}>{comment.date}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
