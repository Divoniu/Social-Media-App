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
import { useContext, useRef, useState } from "react";
import DataContext from "../../../context/DataContext";
import { Message } from "@mui/icons-material";
export function UserChat({ chatData, idx }) {
  const { listOfChats, setListOfChats } = useContext(DataContext);
  const closeUserChat = (e) => {
    // const chatProfilePicturePath =
    //   e.currentTarget.offsetParent.firstChild.firstChild.firstChild.children[0]
    //     .currentSrc;
    // const chatProfileNamePath =
    //   e.currentTarget.offsetParent.firstChild.firstChild.firstChild.children[1]
    //     .children[0].textContent;

    setListOfChats((prevState) => {
      const newState = [...prevState];

      const closeChatWindow = newState.filter(
        (el) =>
          el.picture !== chatData.picture ||
          el.name.trim() !== chatData.name.trim()
        // el.picture !== chatProfilePicturePath ||
        // el.name.trim() !== chatProfileNamePath.trim()
      );
      return closeChatWindow;
    });
  };
  const textMessage = useRef();
  const [chatMessages, setChatMessages] = useState([]);
  //save them to session storage
  const checkForEmptyComments = /^\s*$/g;
  const sendMessageInChat = (event) => {
    if (
      event.keyCode === 13 &&
      !checkForEmptyComments.test(textMessage.current.value.trim())
    ) {
      setChatMessages((prevState) => {
        const myMessage = {
          id: prevState.length,
          username: "Ovidiu Nicolaescu",
          date: "de pus data ",
          comment: textMessage.current.value,
        };
        textMessage.current.value = "";
        return [...prevState, myMessage];
      });
    }
  };

  return (
    <section
      className={styles.userChat}
      style={{ marginRight: `${400 * idx}px` }}
    >
      <article className={styles.chatControlContainer}>
        <ul className={styles.chatControl}>
          <li>
            <img src={chatData.picture} alt="UserPic" />
            {/* daca mergea duplicatefree[idx] era minunat */}
            <div className={styles.userChatInfo}>
              {/* <p> {listOfChats[idx].name}</p> */}
              <p> {chatData.name}</p>
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
        {chatMessages.map((message, idx) => (
          <p className={styles.comment} key={idx}>
            {message.comment}
          </p>
          //idx ul de aici e problema
        ))}
      </article>
      <article className={styles.inputMessage}>
        <textarea
          placeholder="Write a message..."
          id=""
          cols="30"
          rows="10"
          onKeyUp={sendMessageInChat}
          ref={textMessage}
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
          <button onClick={sendMessageInChat}>Send</button>
        </li>
        <li>
          <MoreHorizIcon />
        </li>
      </ul>
    </section>
  );
}

//as putea oare sa fac o componenta button careia? in scss sigur pot face
