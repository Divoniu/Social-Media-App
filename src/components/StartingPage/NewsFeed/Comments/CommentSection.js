import styles from "./CommentSection.module.scss";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import DataContext from "../../../../context/DataContext";

const CommentSection = () => {
  const [commentsNb, setCommentsNb] = useState(5); //pot sa l fac random
  const [randomUserNb, setRandomUserNb] = useState(0);
  const [listOfComments, setListOfComments] = useState([]);
  // am un counter de comentarii si un array in care salvez comentariile fiecarei postari
  const postTheComment = useRef();
  const { quote, users, getUserName } = useContext(DataContext);

  //const addRandomComments =

  const addComment = (event) => {
    if (event.keyCode === 13) {
      setListOfComments((prevState) => {
        const myComment = {
          id: prevState.length,
          username: "Ovidiu Nicolaescu",
          date: "right now",
          comment: postTheComment.current.value,
        };
        postTheComment.current.value = "";
        return [myComment, ...prevState];
      });
    }
  };

  return (
    <section>
      <div className={styles.commentsInputContainer}>
        <img
          src={require("../assets/profile.jpeg")}
          alt="Profile Picture"
          className={styles.profilePictureImg}
        ></img>
        <input
          type="text"
          placeholder="Write something..."
          ref={postTheComment}
          onKeyUp={addComment}
        />
      </div>
      {listOfComments.map((comment, idx) => {
        return (
          <div className={styles.comments} key={idx}>
            <div className={styles.userInfo}>
              <Link to="/">
                <img
                  src={require("../assets/profile.jpeg")}
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
    </section>
  );
};

export default CommentSection;
