import styles from "./NewsFeed.module.scss";
import { Link } from "react-router-dom";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InfoTwoToneIcon from "@mui/icons-material/Info";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useRef } from "react";
import CommentSection from "./Comments/CommentSection";

import { useContext } from "react";
import DataContext from "../../../context/DataContext";
export function NewsFeed(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLikes] = useState(Math.floor(Math.random() * 100));
  const [shares, setShares] = useState(Math.floor(Math.random() * 100));
  const [isShared, setIsShared] = useState(false);
  //pt lista de random comments
  const [comments, setComments] = useState();

  const commentDescription = useRef();
  const { users, getUserName } = useContext(DataContext);

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prevState) => prevState + 1);
    } else {
      setLikes((prevState) => prevState - 1);
    }
    setIsLiked((prevState) => !prevState);
  };

  const handleShare = () => {
    if (!isShared) {
      setShares((prevState) => prevState + 1);
    } else {
      setShares((prevState) => prevState - 1);
    }
    setIsShared((prevState) => !prevState);
  };

  const addComment = (event) => {
    if (event.keyCode === 13) {
      const commentValue = commentDescription.current.value;
      // vezi daca merge cu current target in loc de useRef
      // dar mai bine folosesti useRef
      setComments((prevState) => {
        const newComment = {
          id: prevState.length,
          username: props.postData.id,

          comment: commentValue,
        };

        // prev state e un array, daca il vreau la final pun nC dupa prevState
        return [newComment, ...prevState];
      });
    }
  };
  const randomUserPost = users[Math.floor(Math.random() * users.length)];
  return (
    <>
      <div className={styles.mainPost}>
        <div className={styles.postInFeed}></div>

        <div className={styles.userInfo}>
          <div className={styles.userInfoContainer}>
            <Link to={`/friends/${randomUserPost.id}`}>
              <img
                src={randomUserPost.picture.thumbnail}
                alt="Profile Picture"
                className={styles.profilePictureImg}
              ></img>
            </Link>
            <Link to={`/friends/${randomUserPost.id}`}>
              <p>{getUserName(randomUserPost)}</p>
            </Link>
          </div>

          <div className={styles.contextMenu}>
            <MoreHorizIcon></MoreHorizIcon>
          </div>
        </div>

        <div className={styles.content}>
          <p>{props.postData.title}</p>

          <div className={styles.imageWrapper}>
            <img
              src={require(`./assets/post${props.postData.id % 2}.jpg`)}
              className={styles.mainPostImage}
            ></img>
            <div className={styles.infoIcon}>
              <InfoTwoToneIcon></InfoTwoToneIcon>
            </div>
          </div>

          <p>{props.postData.body}</p>
        </div>

        <div className={styles.reacts}>
          <div className={styles.likesNumber}>
            <ThumbUpIcon></ThumbUpIcon>
            <span className={styles.reactsCount}>{like}</span>
          </div>
          <div className={styles.commentsNumber}>
            <ReplyIcon></ReplyIcon>
            <span className={styles.reactsCount}>{shares}</span>
          </div>
        </div>

        <hr></hr>

        <div className={styles.reactsActions}>
          <div
            className={`${styles.reaction} ${isLiked && styles.blue}`}
            onClick={handleLike}
          >
            <ThumbUpIcon></ThumbUpIcon>
            <span>Like</span>
          </div>

          <div className={styles.reaction}>
            <CommentIcon></CommentIcon>
            <span>Comment</span>
          </div>

          <div
            className={`${styles.reaction} ${isShared && styles.blue}`}
            onClick={handleShare}
          >
            <ReplyIcon></ReplyIcon>
            <span>Share</span>
          </div>
        </div>
        <div className={styles.commentContainer}>
          <CommentSection></CommentSection>
        </div>
      </div>
    </>
  );
}
