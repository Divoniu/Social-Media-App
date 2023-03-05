import styles from "./ListOfComments.module.scss";
import { Link } from "react-router-dom";

export function ListOfComments({ listOfComments, setListOfComments }) {
  // daca folosesc ref in loc de eventTarget imi ia acelasi index mereu
  const removeComment = (e) => {
    const spanac = e.currentTarget.getAttribute("index");

    setListOfComments((prevState) => {
      const newState = prevState.filter((comment) => comment.id != spanac);

      return [...newState];
    });
  };

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
              <button
                index={comment.id}
                //indexul butonului va fi egal cu id-ul atribuit comentariului inserat
                onClick={removeComment}
                className={styles.removeComment}
              >
                x
              </button>
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
