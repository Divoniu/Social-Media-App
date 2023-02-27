import styles from "./UsersControl.module.scss";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function UsersControl({ isOpen, setIsOpen }) {
  return (
    <section className={styles.controlSection}>
      <div
        className={styles.messagingImageContainer}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={require("../NewsFeed/assets/profile.jpeg")}
          alt="profileUser"
          width="40px"
          height="40px"
        />
        <p> Messaging</p>
      </div>
      <div className={styles.controls}>
        <button className={styles.button}>
          <MoreHorizIcon color="black" />
        </button>
        <button className={styles.button}>
          <BorderColorIcon color="black" fontSize="small" />
        </button>
        <button
          className={`${styles.button} ${!isOpen ? styles.rotateButton : null}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <KeyboardArrowDownIcon color="black" fontSize="medium" />
        </button>
      </div>
    </section>
  );
}
