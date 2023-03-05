import styles from "./TypeCommentOrPost.module.scss";
import { useRef } from "react";
export function TypeCommentOrPost({ setListOfComments }) {
  const postTheComment = useRef();

  const setDateOfPost = () => {
    const dateRightNow = new Date(Date.now()).toLocaleString();

    return dateRightNow;
  };

  const checkForEmptyComments = /^\s*$/g;
  const addComment = (event) => {
    if (
      event.keyCode === 13 &&
      !checkForEmptyComments.test(postTheComment.current.value.trim())
    ) {
      setListOfComments((prevState) => {
        const myComment = {
          id: prevState.length,
          username: "Ovidiu Nicolaescu",
          date: setDateOfPost(),
          comment: postTheComment.current.value,
        };
        postTheComment.current.value = "";
        return [...prevState, myComment];
      });
    }
  };

  return (
    <div className={styles.commentsInputContainer}>
      <img
        src={require("../StartingPage/NewsFeed/assets/profile.jpeg")}
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
  );
}
