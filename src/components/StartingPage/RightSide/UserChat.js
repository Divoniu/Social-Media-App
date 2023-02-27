import styles from "./UserChat.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PanoramaIcon from "@mui/icons-material/Panorama";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { display } from "@mui/system";
import { useContext } from "react";
import DataContext from "../../../context/DataContext";
export function UserChat({ idx }) {
  const { listOfChats, setListOfChats } = useContext(DataContext);
  const closeUserChat = (e) => {
    // console.dir(
    //   e.currentTarget.offsetParent.firstChild.firstChild.firstChild.children[0]
    //     .currentSrc
    // );
    const chatProfilePicturePath =
      e.currentTarget.offsetParent.firstChild.firstChild.firstChild.children[0]
        .currentSrc;

    setListOfChats((prevState) => {
      const newState = [...prevState];

      const closeChatWindow = newState.filter(
        (el) => el.picture !== chatProfilePicturePath
      );
      return closeChatWindow;
    });
  };

  return (
    <section
      className={styles.userChat}
      style={{ marginRight: `${400 * idx}px` }}
    >
      <article className={styles.chatControlContainer}>
        <ul className={styles.chatControl}>
          <li>
            <img src={listOfChats[idx].picture} alt="UserPic" />
            {/* daca mergea duplicatefree[idx] era minunat */}
            <div className={styles.userChatInfo}>
              <p> {listOfChats[idx].name}</p>
              {/* aici la nume as mai putea adauga o conditie ca daca lungimea stringului depaseste x caractere sa ii faca split si sa imi puna ... la final */}
              <p>Status</p>
              {/* tb sa fac conditie daca am un fel anume de status sau daca n-am deloc sa imi centreze numele */}
            </div>
          </li>
          <li>
            <button>
              <MoreHorizIcon />
            </button>
          </li>
          <li>
            <button className={styles.unfoldButton}>
              <UnfoldMoreIcon />
            </button>
          </li>
          <li>
            <button onClick={closeUserChat}>
              <CloseRoundedIcon />
            </button>
          </li>
        </ul>
      </article>
      <article className={styles.chatBox}>
        aici o sa fie fereastra unde vezi mesajele
      </article>
      <article className={styles.inputMessage}>
        <textarea
          placeholder="Write a message..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>
          <KeyboardArrowUpIcon color="black" fontSize="medium" />
        </button>
      </article>
      <hr />

      <ul className={styles.chatOptions}>
        <li>
          <PanoramaIcon fontSize="small" />
        </li>
        <li>
          <AttachFileIcon fontSize="small" />
        </li>
        <li>
          <GifIcon fontSize="large" />
        </li>
        <li>
          <EmojiEmotionsIcon fontSize="small" />
        </li>
        <li>
          <button>Send</button>
        </li>
        <li>
          <MoreHorizIcon />
        </li>
      </ul>
    </section>
  );
}

//as putea oare sa fac o componenta button careia? in scss sigur pot face
