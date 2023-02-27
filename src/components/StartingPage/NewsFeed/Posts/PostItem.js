import styles from "./PostItem.module.scss";
import { useState, useContext, useRef } from "react";
import DataContext from "../../../../context/DataContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InfoTwoToneIcon from "@mui/icons-material/Info";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentIcon from "@mui/icons-material/Comment";
import CommentSection from "../Comments/CommentSection";

export function PostItem({ currentUserProfile }) {
  const { getUserName, getRandomDate, images, quote, users } =
    useContext(DataContext);

  //aici pus state-urile aastea ca sa nu mi mai rerandeze constant imagini
  const [randomQuote, setRandomQuote] = useState(
    quote[Math.floor(Math.random() * quote.length - 1)].content
  );
  const [randomImage, setRandomImage] = useState(
    images[Math.floor(Math.random() * images.length - 1)].download_url
  );
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLikes] = useState(Math.floor(Math.random() * 100));
  const [share, setShares] = useState(Math.floor(Math.random() * 100));
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);

  const displayCommentSection = () => {
    setCommentSectionOpen((prevState) => {
      return !prevState;
    });
  };
  // am un counter de comentarii si un array in care salvez comentariile fiecarei postari
  const postTheComment = useRef();

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prevState) => prevState + 1);
    } else {
      setLikes((prevState) => prevState - 1);
    }
    setIsLiked((prevState) => !prevState);
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.user}>
          <img
            src={currentUserProfile.picture.thumbnail}
            alt="user"
            className={styles.userImage}
          />
          <p>{getUserName(currentUserProfile)}</p>
        </div>
      </div>
      <div className={styles.mainPostContainer}>
        <p>{randomQuote}</p>
        <img src={randomImage} alt="post" className={styles.postImage} />
      </div>
      <div className={styles.commentAndReact}>
        <div className={styles.countStatuses}>
          <div className={styles.statusContainer}>
            <ThumbUpIcon fontSize="10px" />
            <p>
              {like} {like === 1 ? "Like" : "Likes"}
            </p>
          </div>
          <div className={styles.statusContainer}>
            <CommentIcon fontSize="10px" />
            <p>Comments</p>
          </div>
          <div className={styles.statusContainer}>
            <ReplyIcon fontSize="small" />
            <p>
              {share} {share === 1 ? "Share" : "Shares"}
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.buttonsSection}>
          <button
            className={`${styles.reaction} ${isLiked && styles.blue}`}
            onClick={handleLike}
          >
            <ThumbUpIcon fontSize="small" />
            <span>Like</span>
          </button>
          <button onClick={displayCommentSection}>
            <CommentIcon fontSize="small" />
            <span>Comment</span>
          </button>
        </div>
        <hr />
        <br />
      </div>
      <div className={`${commentSectionOpen ? null : styles.displayNone}`}>
        <CommentSection />
      </div>
    </div>
  );
}
